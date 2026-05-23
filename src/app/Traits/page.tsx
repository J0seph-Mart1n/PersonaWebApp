"use client";

import React from "react";
import Link from "next/link";
import TopNavBar from "../components/TopNavBar";

export default function DashboardPage() {
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
                  <div className="flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center border border-on-surface hover:bg-primary-container transition-colors">
                      <span className="material-symbols-outlined text-[16px]">zoom_in</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center border border-on-surface hover:bg-primary-container transition-colors">
                      <span className="material-symbols-outlined text-[16px]">zoom_out</span>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center border border-on-surface hover:bg-primary-container transition-colors">
                      <span className="material-symbols-outlined text-[16px]">360</span>
                    </button>
                  </div>
                </div>
                
                {/* 
                  NOTE: You can replace this entire div below with the <ForceGraph2D /> 
                  component from our previous step to make it render live data!
                */}
                <div 
                  className="flex-1 bg-surface-bright relative overflow-hidden flex items-center justify-center" 
                  style={{ backgroundImage: "radial-gradient(#484831 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                >
                  <div className="absolute w-full h-[1px] bg-on-surface-variant opacity-30 top-1/2 -translate-y-1/2"></div>
                  <div className="absolute h-full w-[1px] bg-on-surface-variant opacity-30 left-1/2 -translate-x-1/2"></div>
                  <div className="absolute w-[150%] h-[1px] bg-on-surface-variant opacity-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45"></div>

                  <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-on-surface opacity-40"></div>
                  <div className="absolute top-[60%] left-[20%] w-3 h-3 bg-on-surface opacity-30"></div>
                  <div className="absolute top-[80%] left-[70%] w-1.5 h-1.5 bg-on-surface opacity-60"></div>
                  <div className="absolute top-[30%] left-[80%] w-2.5 h-2.5 bg-on-surface opacity-50"></div>

                  <div className="absolute top-[40%] left-[45%] w-4 h-4 bg-on-surface border border-surface"></div>
                  <div className="absolute top-[55%] left-[65%] w-3 h-3 bg-on-surface border border-surface"></div>

                  {/* Highlighted Target Node */}
                  <div className="absolute top-[45%] left-[55%] group cursor-crosshair">
                    <div className="absolute top-3 right-full w-24 h-[1px] bg-primary-container border-t border-dashed border-on-surface"></div>
                    <div className="absolute top-full left-3 h-32 w-[1px] bg-primary-container border-l border-dashed border-on-surface"></div>
                    <div className="w-6 h-6 bg-primary-container border-2 border-on-surface flex items-center justify-center relative z-10 vector-shadow">
                      <div className="w-2 h-2 bg-on-surface"></div>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-0 left-full ml-4 bg-surface border border-on-surface p-2 min-w-[120px] vector-shadow z-20 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity">
                      <span className="block font-label-bold text-label-bold text-on-surface border-b border-on-surface pb-1 mb-1">NODE: ACTIVE</span>
                      <span className="block font-mono-data text-[10px] text-on-surface-variant">X: 0.84</span>
                      <span className="block font-mono-data text-[10px] text-on-surface-variant">Y: -0.22</span>
                      <span className="block font-mono-data text-[10px] text-on-surface-variant">Z: 0.91</span>
                    </div>
                  </div>

                  {/* Coordinate Overlay */}
                  <div className="absolute bottom-4 left-4 bg-surface border border-on-surface p-2 vector-shadow">
                    <span className="font-mono-data text-mono-data text-on-surface block">LOCAL CLUSTER</span>
                  </div>
                </div>
              </section>

              {/* Bottom Controls/Log */}
              <section className="bg-surface border border-on-surface p-0 flex flex-col vector-shadow">
                <div className="border-b border-on-surface p-3 bg-surface-container flex justify-between items-center">
                  <span className="font-label-bold text-label-bold text-on-surface">STREAM LOG</span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface">filter_list</span>
                </div>
                <div className="p-4 font-mono-data text-[12px] h-32 overflow-y-auto space-y-2">
                  <div className="flex gap-4">
                    <span className="text-on-surface-variant w-16">10:42:01</span>
                    <span className="text-on-surface border-l-4 border-primary-container pl-2">Recalculating node trajectory based on fresh input...</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-on-surface-variant w-16">10:42:05</span>
                    <span className="text-on-surface border-l-4 border-transparent pl-2">Vector displacement identified in sector 7G.</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-on-surface-variant w-16">10:42:12</span>
                    <span className="text-on-surface border-l-4 border-transparent pl-2">Syncing behavioral patterns.</span>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </main>
    </div>
  );
}