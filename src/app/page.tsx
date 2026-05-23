"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import InteractiveGrid from "./components/InteractiveGrid";
import TopNavBar from "./components/TopNavBar";
import "./globals.css";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import Footer from "./components/Footer";

export default function Home() {
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, () => {
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <p className="font-mono-data text-on-surface-variant">Loading...</p>
      </div>
    );
  }

  return (
    <>
      {/* Interactive Vector Grid Background */}
      <InteractiveGrid />

      {/* TopNavBar */}
      <TopNavBar />

      {/* Main Content */}
      <main className="flex-grow z-10 pt-16 flex flex-col items-center justify-center min-h-screen relative px-margin-mobile md:px-margin-desktop">
        {/* Structural quadrants lines overlay (Visual only) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-on-surface opacity-10 hidden lg:block"></div>
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-on-surface opacity-10 hidden lg:block"></div>
        </div>
        
        <div className="text-center max-w-4xl relative z-20 bg-surface/90 backdrop-blur-md p-8 md:p-16 border border-on-surface hard-shadow animate-fade-in-up">
          <h1 className="font-display-lg text-display-lg md:text-display-lg text-on-surface mb-8 tracking-tighter uppercase border-b border-on-surface pb-6">
            Your Personality,<br />Quantified.
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mb-12 max-w-2xl mx-auto border-l-4 border-primary-container pl-4 text-left">
            Vector.OS employs an advanced Retrieval-Augmented Generation framework
            to map, analyze, and construct highly accurate digital archetypes based
            on your input stream.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link 
              href="/Assessment" 
              className="bg-on-surface text-surface px-8 py-4 font-label-bold text-label-bold uppercase tracking-widest border border-on-surface hover:bg-primary-container hover:text-on-surface transition-colors w-full sm:w-auto"
            >
              Start Assessment
            </Link>
            <Link 
              href="/MBTI" 
              className="bg-transparent text-on-surface px-8 py-4 font-label-bold text-label-bold uppercase tracking-widest border border-on-surface hover:bg-surface-variant transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">terminal</span>
              View Protocol
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}