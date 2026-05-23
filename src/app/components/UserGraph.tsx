"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { User } from "firebase/auth";
import * as THREE from "three";
import SpriteText from "three-spritetext";

// Dynamically import the graph library so it bypasses Next.js SSR
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center font-mono-data text-on-surface-variant animate-pulse">
      INITIALIZING VECTOR SPACE [3D]...
    </div>
  ),
});

interface GraphNode {
  id: string;
  group: string;
  [key: string]: unknown;
}

interface GraphLink {
  source: string;
  target: string;
  val: number;
  [key: string]: unknown;
}

export default function UserGraph({ user }: { user: User | null }) {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const userId = user?.uid || "";

  useEffect(() => {
    // Resize the canvas automatically to fit its container
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }

    // Fetch Graph Data from your Express/Next.js Backend
    if (!userId) return;

    fetch(`http://localhost:5000/api/graph/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        if (data && data.nodes) setGraphData(data);
      })
      .catch((err) => console.error("Failed to load graph:", err));
  }, [userId]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px]">
      {graphData.nodes.length > 0 ? (
        <ForceGraph3D
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeLabel="id"
          
          // Custom 3D Node Rendering
          nodeThreeObject={(node: any) => {
            const group = new THREE.Group();
            
            // Sphere parameters
            const isUser = node.group === "User";
            const color = isUser ? "#ffff00" : "#1c1c0f";
            const radius = isUser ? 8 : 4;
            
            // 1. Create the Sphere
            const geometry = new THREE.SphereGeometry(radius);
            const material = new THREE.MeshLambertMaterial({ color });
            const sphere = new THREE.Mesh(geometry, material);
            group.add(sphere);

            // 2. Create the Text Sprite
            const label = isUser ? (user?.displayName || "User") : node.id;
            const sprite = new SpriteText(label);
            sprite.color = isUser ? "#ffff00" : "#1c1c0f";
            sprite.textHeight = 4;
            // Position the text perfectly below the sphere in 3D space
            sprite.position.y = -radius - 4;
            group.add(sprite);

            return group;
          }}
          
          linkColor={() => "#1c1c0f"} // Tailwind 'on-surface' color
          linkWidth={(link: GraphLink | object) => ((link as GraphLink).val ? (link as GraphLink).val * 5 : 1)} // Thickness = Trait Strength
          linkDirectionalParticles={2} // Adds moving particles along the links
          linkDirectionalParticleWidth={2}
          backgroundColor="rgba(0,0,0,0)" // Transparent background
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center font-mono-data text-on-surface-variant">
          AWAITING DATA STREAM...
        </div>
      )}
    </div>
  );
}