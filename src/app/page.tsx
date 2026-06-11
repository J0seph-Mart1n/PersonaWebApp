"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import InteractiveGrid from "./components/InteractiveGrid";
import "./globals.css";

import Footer from "./components/Footer";

export default function Home() {
  // Auth checking is now handled locally in components like TopNavBar

  return (
    <>
      {/* Interactive Vector Grid Background */}
      <InteractiveGrid />

      <main className="flex-grow z-10 pt-8 pb-16 flex flex-col min-h-screen relative px-margin-mobile md:px-margin-desktop gap-8 max-w-6xl mx-auto w-full">
        {/* Structural quadrants lines overlay (Visual only) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-on-surface opacity-10 hidden lg:block"></div>
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-on-surface opacity-10 hidden lg:block"></div>
        </div>
        
        {/* Welcome Card */}
        <div className="text-center w-full relative z-20 bg-surface/90 backdrop-blur-md p-8 md:p-12 border border-on-surface hard-shadow animate-fade-in-up mt-8">
          <h1 className="font-display-lg text-display-lg md:text-display-lg text-on-surface mb-8 tracking-tighter uppercase border-b border-on-surface pb-6">
            Your Personality,<br />Quantified.
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-2xl mx-auto border-l-4 border-primary-container pl-4 text-left">
            Vector.OS employs an advanced Retrieval-Augmented Generation framework
            to map, analyze, and construct highly accurate digital archetypes based
            on your input stream.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/MBTI" 
              className="bg-transparent text-on-surface px-8 py-4 font-label-bold text-label-bold uppercase tracking-widest border border-on-surface hover:bg-surface-variant transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">terminal</span>
              View Protocol
            </Link>
          </div>
        </div>

        {/* Dashboard Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-20 mt-4 animate-fade-in-up" style={{ animationDelay: "150ms" }}>
          {/* Traits Section */}
          <Link href="/Traits" className="bg-surface/90 backdrop-blur-md p-6 border border-on-surface hard-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(28,28,15,1)] transition-all group flex flex-col">
            <div className="flex items-center gap-3 border-b border-on-surface/20 pb-4 mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
              <h2 className="font-display-lg text-headline-sm uppercase tracking-tight text-on-surface">Traits Graph</h2>
            </div>
            <p className="font-body-md text-on-surface-variant flex-grow mb-6">
              View your psychological vector map. Explore how your extracted traits and domains interconnect in the knowledge graph.
            </p>
            <div className="font-label-bold uppercase text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
              Analyze <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </Link>

          {/* Assessment Section */}
          <Link href="/Assessment" className="bg-surface/90 backdrop-blur-md p-6 border border-on-surface hard-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(28,28,15,1)] transition-all group flex flex-col">
            <div className="flex items-center gap-3 border-b border-on-surface/20 pb-4 mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">assignment</span>
              <h2 className="font-display-lg text-headline-sm uppercase tracking-tight text-on-surface">Assessment</h2>
            </div>
            <p className="font-body-md text-on-surface-variant flex-grow mb-6">
              Complete dynamic psychological profiling. Your answers are processed by LLMs to extract behavioral embeddings.
            </p>
            <div className="font-label-bold uppercase text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
              Begin Profiling <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </Link>

          {/* Chat Section */}
          <Link href="/Chat" className="bg-surface/90 backdrop-blur-md p-6 border border-on-surface hard-shadow hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(28,28,15,1)] transition-all group flex flex-col">
            <div className="flex items-center gap-3 border-b border-on-surface/20 pb-4 mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">chat</span>
              <h2 className="font-display-lg text-headline-sm uppercase tracking-tight text-on-surface">AI Assistant</h2>
            </div>
            <p className="font-body-md text-on-surface-variant flex-grow mb-6">
              Interact with Vector.OS. The AI tailors its responses based on your personality vector and extracts new traits over time.
            </p>
            <div className="font-label-bold uppercase text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
              Initialize Chat <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}