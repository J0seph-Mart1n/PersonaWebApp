"use client";

import React from "react";
import Link from "next/link";
import TopNavBar from "../components/TopNavBar";
import InteractiveGrid from "../components/InteractiveGrid";

export default function MBTIPage() {
  return (
    <div className="min-h-screen flex flex-col font-body-md text-on-surface antialiased overflow-x-hidden">
      {/* Interactive Vector Grid Background */}
      <InteractiveGrid />

      {/* TopNavBar */}
      <TopNavBar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop mt-16 relative z-10 ">
        <div className="w-full max-w-4xl bg-surface/90 backdrop-blur-md border border-on-surface relative hard-shadow p-8 md:p-12 animate-fade-in-up">
          
          <div className="border-b border-on-surface pb-6 mb-8">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter uppercase text-on-surface">
              The MBTI Framework
            </h1>
            <p className="font-mono-data text-mono-data text-on-surface-variant mt-2">
              DOCUMENTATION // SYSTEM ARCHITECTURE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* The Model */}
            <div>
              <h2 className="font-label-bold text-label-bold text-on-surface uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-on-surface/20 pb-2">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
                The Model
              </h2>
              <p className="text-on-surface-variant mb-4 leading-relaxed">
                Vector.OS utilizes a framework based on the Myers-Briggs Type Indicator (MBTI) to construct your digital archetype. You will be evaluated across four fundamental dichotomies:
              </p>
              <ul className="space-y-3 font-mono-data text-sm">
                <li className="flex justify-between border-l-2 border-primary pl-3 bg-surface-variant/30 p-2">
                  <span className="text-on-surface">Introversion (I)</span> <span className="text-on-surface-variant text-xs flex items-center gap-2">vs <span className="text-on-surface">Extraversion (E)</span></span>
                </li>
                <li className="flex justify-between border-l-2 border-primary pl-3 bg-surface-variant/30 p-2">
                  <span className="text-on-surface">Sensing (S)</span> <span className="text-on-surface-variant text-xs flex items-center gap-2">vs <span className="text-on-surface">Intuition (N)</span></span>
                </li>
                <li className="flex justify-between border-l-2 border-primary pl-3 bg-surface-variant/30 p-2">
                  <span className="text-on-surface">Thinking (T)</span> <span className="text-on-surface-variant text-xs flex items-center gap-2">vs <span className="text-on-surface">Feeling (F)</span></span>
                </li>
                <li className="flex justify-between border-l-2 border-primary pl-3 bg-surface-variant/30 p-2">
                  <span className="text-on-surface">Judging (J)</span> <span className="text-on-surface-variant text-xs flex items-center gap-2">vs <span className="text-on-surface">Perceiving (P)</span></span>
                </li>
              </ul>
            </div>

            {/* Evaluation Process */}
            <div>
              <h2 className="font-label-bold text-label-bold text-on-surface uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-on-surface/20 pb-2">
                <span className="material-symbols-outlined text-[18px]">analytics</span>
                Evaluation Process
              </h2>
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                The assessment consists of <span className="text-on-surface font-bold">60 statements</span> designed to measure your behavioral vectors.
              </p>
              <div className="bg-surface-container-lowest border border-on-surface p-4 text-sm space-y-4">
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                  <p>Use the 5-point scale to indicate your level of agreement with each statement.</p>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">timer</span>
                  <p>Answer naturally. The process typically requires 10-15 minutes to complete.</p>
                </div>
                <div className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px]">warning</span>
                  <p>Honest responses yield the most accurate archetype generation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
