"use client";
import { useEffect, useRef, useCallback } from "react";

const GRID_SIZE = 32;
const EFFECT_RADIUS = 250;
const MAX_PULL_RATIO = 0.55; // Max 35% of distance — lines compress but never cross
const LINE_COLOR = "rgba(28, 28, 15, 0.07)";
const GLOW_COLOR = "rgba(255, 255, 0, 0.08)";
const LERP_SPEED = 0.08;
const SUB_STEPS = 4;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function displace(
  px: number,
  py: number,
  mx: number,
  my: number
): [number, number] {
  const dx = px - mx;
  const dy = py - my;
  const distSq = dx * dx + dy * dy;
  const radiusSq = EFFECT_RADIUS * EFFECT_RADIUS;

  if (distSq > radiusSq || distSq === 0) return [px, py];

  const dist = Math.sqrt(distSq);
  // Smooth cubic falloff
  const t = 1 - dist / EFFECT_RADIUS;
  const ease = t * t * t;

  // Pull toward cursor, but capped so the point only moves a fraction
  // of its distance — this guarantees lines compress without crossing
  const pullAmount = dist * MAX_PULL_RATIO * ease;

  const invDist = 1 / dist;
  return [
    px - dx * invDist * pullAmount,
    py - dy * invDist * pullAmount,
  ];
}

export default function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetMouse = useRef({ x: -1000, y: -1000 });
  const smoothMouse = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const dprRef = useRef(1);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Resize canvas only when needed
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dprRef.current = dpr;
    }

    // Smoothly interpolate mouse position
    const sm = smoothMouse.current;
    const tm = targetMouse.current;

    if (tm.x < -500) {
      // Mouse is off-screen — smoothly drift away
      sm.x = lerp(sm.x, -1000, LERP_SPEED * 0.5);
      sm.y = lerp(sm.y, -1000, LERP_SPEED * 0.5);
    } else {
      sm.x = lerp(sm.x, tm.x, LERP_SPEED);
      sm.y = lerp(sm.y, tm.y, LERP_SPEED);
    }

    const mx = sm.x;
    const my = sm.y;

    ctx.clearRect(0, 0, w, h);

    // Subtle glow under cursor
    if (mx > -500) {
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, EFFECT_RADIUS);
      gradient.addColorStop(0, GLOW_COLOR);
      gradient.addColorStop(1, "rgba(255, 255, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(
        mx - EFFECT_RADIUS,
        my - EFFECT_RADIUS,
        EFFECT_RADIUS * 2,
        EFFECT_RADIUS * 2
      );
    }

    ctx.strokeStyle = LINE_COLOR;
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const cols = Math.ceil(w / GRID_SIZE) + 2;
    const rows = Math.ceil(h / GRID_SIZE) + 2;
    const subStep = GRID_SIZE / SUB_STEPS;

    // Only compute sub-steps for lines near the cursor to save perf
    const nearCursor = (baseCoord: number, mouseCoord: number) =>
      Math.abs(baseCoord - mouseCoord) < EFFECT_RADIUS + GRID_SIZE * 2;

    // Draw vertical lines with sub-point sampling for smooth curves
    for (let col = -1; col <= cols; col++) {
      const baseX = col * GRID_SIZE;
      const isNearX = nearCursor(baseX, mx);

      ctx.beginPath();

      if (isNearX) {
        // High-detail: sample sub-points along Y for smooth curve
        const totalSubSteps = (rows + 2) * SUB_STEPS;
        for (let s = 0; s <= totalSubSteps; s++) {
          const baseY = -GRID_SIZE + s * subStep;
          const [dx, dy] = displace(baseX, baseY, mx, my);
          if (s === 0) ctx.moveTo(dx, dy);
          else ctx.lineTo(dx, dy);
        }
      } else {
        // Low-detail: just grid intersections
        for (let row = -1; row <= rows; row++) {
          const baseY = row * GRID_SIZE;
          if (row === -1) ctx.moveTo(baseX, baseY);
          else ctx.lineTo(baseX, baseY);
        }
      }

      ctx.stroke();
    }

    // Draw horizontal lines with sub-point sampling
    for (let row = -1; row <= rows; row++) {
      const baseY = row * GRID_SIZE;
      const isNearY = nearCursor(baseY, my);

      ctx.beginPath();

      if (isNearY) {
        const totalSubSteps = (cols + 2) * SUB_STEPS;
        for (let s = 0; s <= totalSubSteps; s++) {
          const baseX = -GRID_SIZE + s * subStep;
          const [dx, dy] = displace(baseX, baseY, mx, my);
          if (s === 0) ctx.moveTo(dx, dy);
          else ctx.lineTo(dx, dy);
        }
      } else {
        for (let col = -1; col <= cols; col++) {
          const baseX = col * GRID_SIZE;
          if (col === -1) ctx.moveTo(baseX, baseY);
          else ctx.lineTo(baseX, baseY);
        }
      }

      ctx.stroke();
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      targetMouse.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    animRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
