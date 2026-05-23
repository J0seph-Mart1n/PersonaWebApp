"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import TopNavBar from "../components/TopNavBar";
import UserGraph from "../components/UserGraph";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="font-body-md text-body-md text-on-surface antialiased min-h-screen relative overflow-x-hidden">
      
      {/* TopNavBar */}
      <TopNavBar />
        
        {/* Main Content Area */}
        <main className="flex-1 mt-12 p-margin-mobile md:p-margin-desktop bg-transparent pb-32">
          <header className="mb-12">
            <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-2">TRAITS</h1>
            <p className="font-mono-data text-mono-data text-on-surface-variant flex items-center gap-2">
              <span className="w-2 h-2 bg-primary-container border border-on-surface block animate-pulse"></span>
              SYSTEM ACTIVE / VECTOR SPACE MAPPED
            </p>
          </header>
          
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* Left Column: Radar Chart & Stats */}
            <div className="xl:col-span-5 flex flex-col gap-8">
              
              {/* Radar Chart Card */}
              <section className="bg-surface border border-on-surface p-6 vector-shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-on-surface bg-surface-container"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface">BEHAVIORAL RADAR</h2>
                  <span className="font-mono-data text-mono-data text-on-surface bg-primary-container px-2 py-1 border border-on-surface">LIVE</span>
                </div>
                
                {/* SVG Radar Chart */}
                <div className="w-full aspect-square relative flex items-center justify-center my-4">
                  <svg className="w-full h-full max-w-[300px]" viewBox="0 0 100 100">
                    {/* Concentric Hexagons */}
                    <polygon className="text-on-surface-variant" fill="none" opacity="0.5" points="50,5 90,27 90,73 50,95 10,73 10,27" stroke="currentColor" strokeWidth="0.5"></polygon>
                    <polygon className="text-on-surface-variant" fill="none" opacity="0.5" points="50,20 77,35 77,65 50,80 23,65 23,35" stroke="currentColor" strokeWidth="0.5"></polygon>
                    <polygon className="text-on-surface-variant" fill="none" opacity="0.5" points="50,35 63,43 63,57 50,65 37,57 37,43" stroke="currentColor" strokeWidth="0.5"></polygon>
                    
                    {/* Axes */}
                    <line className="text-on-surface-variant" stroke="currentColor" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="5"></line>
                    <line className="text-on-surface-variant" stroke="currentColor" strokeWidth="0.5" x1="50" x2="90" y1="50" y2="27"></line>
                    <line className="text-on-surface-variant" stroke="currentColor" strokeWidth="0.5" x1="50" x2="90" y1="50" y2="73"></line>
                    <line className="text-on-surface-variant" stroke="currentColor" strokeWidth="0.5" x1="50" x2="50" y1="50" y2="95"></line>
                    <line className="text-on-surface-variant" stroke="currentColor" strokeWidth="0.5" x1="50" x2="10" y1="50" y2="73"></line>
                    <line className="text-on-surface-variant" stroke="currentColor" strokeWidth="0.5" x1="50" x2="10" y1="50" y2="27"></line>
                    
                    {/* Data Polygon */}
                    <polygon className="fill-primary-container/20 stroke-primary-container" points="50,15 80,30 70,60 50,85 20,65 30,35" strokeWidth="2"></polygon>
                    
                    {/* Data Points */}
                    <circle className="text-on-surface" cx="50" cy="15" fill="currentColor" r="2"></circle>
                    <circle className="text-on-surface" cx="80" cy="30" fill="currentColor" r="2"></circle>
                    <circle className="text-on-surface" cx="70" cy="60" fill="currentColor" r="2"></circle>
                    <circle className="text-on-surface" cx="50" cy="85" fill="currentColor" r="2"></circle>
                    <circle className="text-on-surface" cx="20" cy="65" fill="currentColor" r="2"></circle>
                    <circle className="text-on-surface" cx="30" cy="35" fill="currentColor" r="2"></circle>
                  </svg>
                  
                  {/* Labels */}
                  <div className="absolute inset-0 pointer-events-none">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 font-mono-data text-[10px] bg-surface px-1">Logic</span>
                    <span className="absolute top-[20%] right-0 translate-x-4 font-mono-data text-[10px] bg-surface px-1">Creativity</span>
                    <span className="absolute bottom-[20%] right-0 translate-x-4 font-mono-data text-[10px] bg-surface px-1">Empathy</span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 font-mono-data text-[10px] bg-surface px-1">Discipline</span>
                    <span className="absolute bottom-[20%] left-0 -translate-x-4 font-mono-data text-[10px] bg-surface px-1">Risk</span>
                    <span className="absolute top-[20%] left-0 -translate-x-4 font-mono-data text-[10px] bg-surface px-1">Speed</span>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-on-surface pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-mono-data text-mono-data text-on-surface-variant">DOMINANT TRAIT</span>
                    <span className="font-label-bold text-label-bold text-on-surface">ANALYTICAL</span>
                  </div>
                </div>
              </section>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface border border-on-surface p-4 vector-shadow">
                  <span className="font-mono-data text-[10px] text-on-surface-variant block mb-1">COMPUTATION CYCLES</span>
                  <span className="font-display-lg text-headline-lg-mobile text-on-surface">4.2M</span>
                </div>
                <div className="bg-surface border border-on-surface p-4 vector-shadow">
                  <span className="font-mono-data text-[10px] text-on-surface-variant block mb-1">NODE DENSITY</span>
                  <span className="font-display-lg text-headline-lg-mobile text-on-surface">88%</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Vector Graph & Controls */}
            <div className="xl:col-span-7 flex flex-col gap-8">
              
              {/* 3D Vector Space Container */}
              <section className="bg-surface border border-on-surface p-1 relative flex-1 min-h-[500px] flex flex-col vector-shadow-lg">
                <div className="flex justify-between items-center p-4 border-b border-on-surface bg-surface-container-lowest">
                  <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface">VECTOR SPACE [3D]</h2>
                </div>
                <UserGraph user={user} />
              </section>

            </div>
          </div>
        </main>
    </div>
  );
}