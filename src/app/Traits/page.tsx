"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import TopNavBar from "../components/TopNavBar";
import UserGraph from "../components/UserGraph";
import { getLatestAssessmentFromFirebase } from "../../services/firebaseAssessmentService";
import { questions } from "../../data/questions";

const LIKERT_LABELS = ["", "Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
const DICHOTOMIES: [string, string][] = [["E", "I"], ["S", "N"], ["T", "F"], ["J", "P"]];
const TRAITS = ["E", "S", "T", "J", "I", "P", "F", "N"];

const TRAIT_NAMES: Record<string, string> = {
  E: "Extraversion", I: "Introversion",
  S: "Sensing",      N: "Intuition",
  T: "Thinking",     F: "Feeling",
  J: "Judging",      P: "Perceiving",
};

const calculateOctagonPoints = (radius: number) => {
  const points = [];
  for (let i = 0; i < 8; i++) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 4;
    const x = 50 + Math.cos(angle) * radius;
    const y = 50 + Math.sin(angle) * radius;
    points.push(`${x},${y}`);
  }
  return points.join(" ");
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [traitScores, setTraitScores] = useState<Record<string, number> | null>(null);
  const [mbtiVector, setMbtiVector] = useState<string | null>(null);
  const [isAssessmentLoading, setIsAssessmentLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsAssessmentLoading(true);
        const assessment = await getLatestAssessmentFromFirebase(currentUser.uid);
        if (assessment) {
          const answers: Record<number, number> = {};
          assessment.detailedAnswers.forEach((ans: any) => {
            const q = questions.find(q => q.text === ans.question);
            if (q) {
              const score = LIKERT_LABELS.indexOf(ans.answer);
              if (score > 0) answers[q.id] = score;
            }
          });

          const scores: Record<string, number> = {};
          DICHOTOMIES.forEach(([traitA, traitB]) => {
            const scoreA = questions.filter(q => q.trait === traitA).reduce((sum, q) => sum + (answers[q.id] || 3), 0);
            const scoreB = questions.filter(q => q.trait === traitB).reduce((sum, q) => sum + (answers[q.id] || 3), 0);
            const total = scoreA + scoreB;
            scores[traitA] = scoreA / total;
            scores[traitB] = scoreB / total;
          });

          setTraitScores(scores);
          setMbtiVector(assessment.mbtiVector || null);
        }
        setIsAssessmentLoading(false);
      } else {
        setIsAssessmentLoading(false);
      }
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
            
            {/* Left Column: Radar Chart */}
            <div className="xl:col-span-5 flex flex-col">
              
              {/* Radar Chart Card */}
              <section className="bg-surface border border-on-surface p-6 vector-shadow-lg relative overflow-hidden flex-1 flex flex-col">
                <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-on-surface bg-surface-container"></div>
                
                <div className="flex justify-between items-start mb-6 shrink-0">
                  <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface">BEHAVIORAL RADAR</h2>
                  <span className="font-mono-data text-mono-data text-on-surface bg-primary-container px-2 py-1 border border-on-surface">LIVE</span>
                </div>
                
                {isAssessmentLoading ? (
                  <div className="w-full aspect-square relative flex items-center justify-center my-auto animate-pulse">
                    <div className="w-3/4 h-3/4 border-2 border-on-surface/20 rounded-full"></div>
                  </div>
                ) : traitScores ? (
                  /* SVG Radar Chart */
                  <div className="w-full aspect-square relative flex items-center justify-center my-auto">
                    <svg className="w-full h-full max-w-[450px]" viewBox="0 0 100 100">
                      {/* Concentric Octagons */}
                      <polygon className="text-on-surface-variant" fill="none" opacity="0.5" points={calculateOctagonPoints(45)} stroke="currentColor" strokeWidth="0.5"></polygon>
                      <polygon className="text-on-surface-variant" fill="none" opacity="0.5" points={calculateOctagonPoints(30)} stroke="currentColor" strokeWidth="0.5"></polygon>
                      <polygon className="text-on-surface-variant" fill="none" opacity="0.5" points={calculateOctagonPoints(15)} stroke="currentColor" strokeWidth="0.5"></polygon>
                      
                      {/* Axes */}
                      {Array.from({ length: 4 }).map((_, i) => {
                         const a1 = -Math.PI / 2 + (i * Math.PI) / 4;
                         const a2 = a1 + Math.PI;
                         return (
                           <line key={i} className="text-on-surface-variant" stroke="currentColor" strokeWidth="0.5" 
                             x1={50 + Math.cos(a1) * 45} y1={50 + Math.sin(a1) * 45} 
                             x2={50 + Math.cos(a2) * 45} y2={50 + Math.sin(a2) * 45} />
                         );
                      })}
                      
                      {/* Data Polygon */}
                      <polygon className="fill-primary-container/20 stroke-primary-container" points={TRAITS.map((trait, i) => {
                        const score = traitScores[trait]; 
                        const radius = score * 50;
                        const angle = -Math.PI / 2 + (i * Math.PI) / 4;
                        return `${50 + Math.cos(angle) * radius},${50 + Math.sin(angle) * radius}`;
                      }).join(" ")} strokeWidth="1.5"></polygon>
                      
                      {/* Data Points */}
                      {TRAITS.map((trait, i) => {
                        const score = traitScores[trait];
                        const radius = score * 50;
                        const angle = -Math.PI / 2 + (i * Math.PI) / 4;
                        return <circle key={trait} className="text-on-surface" cx={50 + Math.cos(angle) * radius} cy={50 + Math.sin(angle) * radius} fill="currentColor" r="1.5"></circle>;
                      })}
                    </svg>
                    
                    {/* Labels */}
                    <div className="absolute inset-0 pointer-events-none">
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 font-mono-data text-[16px] bg-surface px-1">{TRAIT_NAMES["E"]}</span>
                      <span className="absolute top-[15%] right-0 translate-x-1 font-mono-data text-[16px] bg-surface px-1">{TRAIT_NAMES["S"]}</span>
                      <span className="absolute top-1/2 right-0 translate-x-2 -translate-y-1/2 font-mono-data text-[16px] bg-surface px-1">{TRAIT_NAMES["T"]}</span>
                      <span className="absolute bottom-[15%] right-0 translate-x-1 font-mono-data text-[16px] bg-surface px-1">{TRAIT_NAMES["J"]}</span>
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 font-mono-data text-[16px] bg-surface px-1">{TRAIT_NAMES["I"]}</span>
                      <span className="absolute bottom-[15%] left-0 -translate-x-1 font-mono-data text-[16px] bg-surface px-1">{TRAIT_NAMES["P"]}</span>
                      <span className="absolute top-1/2 left-0 -translate-x-2 -translate-y-1/2 font-mono-data text-[16px] bg-surface px-1">{TRAIT_NAMES["F"]}</span>
                      <span className="absolute top-[15%] left-0 -translate-x-1 font-mono-data text-[16px] bg-surface px-1">{TRAIT_NAMES["N"]}</span>
                    </div>
                  </div>
                ) : (
                  <div className="border border-on-surface/30 border-dashed p-8 flex flex-col items-center justify-center text-center gap-4 my-auto">
                    <span className="material-symbols-outlined text-[40px] text-on-surface-variant">psychology</span>
                    <p className="font-body-md text-on-surface-variant">No assessment data found. Complete the personality assessment to see your cognitive dichotomies.</p>
                    <Link href="/Assessment" className="bg-on-surface text-surface px-6 py-2 font-label-bold text-label-bold uppercase tracking-widest hover:bg-primary-container hover:text-on-surface transition-colors border border-transparent btn-primary">
                      Take Assessment
                    </Link>
                  </div>
                )}
                
                <div className="mt-auto border-t border-on-surface pt-4 shrink-0">
                  <div className="flex justify-between items-center">
                    <span className="font-mono-data text-mono-data text-on-surface-variant">DOMINANT TYPE</span>
                    <span className="font-label-bold text-label-bold text-on-surface">{mbtiVector || "—"}</span>
                  </div>
                </div>
              </section>
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