"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "firebase/auth";
import { questions, Question } from "../../data/questions";

interface ResultsSummaryProps {
  answers: Record<number, number>;
  onRetake: () => void;
  user: User | null;
}

const LIKERT_LABELS = ["", "Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

const TRAIT_NAMES: Record<string, string> = {
  E: "Extraversion",
  I: "Introversion",
  S: "Sensing",
  N: "Intuition",
  T: "Thinking",
  F: "Feeling",
  J: "Judging",
  P: "Perceiving",
};

export default function ResultsSummary({ answers, onRetake, user }: ResultsSummaryProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Group questions by their dichotomy pair
  const dichotomies: [string, string][] = [["E", "I"], ["S", "N"], ["T", "F"], ["J", "P"]];

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in to save results.");
      return;
    }
    
    setIsSaving(true);
    try {
      // Calculate 4-letter MBTI Vector dynamically
      const mbtiVector = dichotomies.map(([traitA, traitB]) => {
        const scoreA = questions
          .filter((q) => q.trait === traitA)
          .reduce((sum, q) => sum + (answers[q.id] || 3), 0);
        const scoreB = questions
          .filter((q) => q.trait === traitB)
          .reduce((sum, q) => sum + (answers[q.id] || 3), 0);
        return scoreA >= scoreB ? traitA : traitB;
      }).join("");

      const detailedAnswers = questions.map(q => ({
        question: q.text,
        traitCategory: q.trait,
        answer: LIKERT_LABELS[answers[q.id] || 3]
      }));

      const response = await fetch("http://localhost:5000/api/process-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.uid,
          mbtiVector,
          rawAnswers: detailedAnswers,
        }),
      });

      if (!response.ok) throw new Error("Failed to save to backend.");

      alert("Results saved and processed successfully!");
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-surface/90 backdrop-blur-md border border-on-surface relative hard-shadow animate-fade-in-up">
      
      {/* Completed progress bar */}
      <div className="h-2 w-full bg-primary-container border-b border-on-surface"></div>
      
      <div className="p-8 md:p-12">
        {/* Header */}
        <div className="border-b border-on-surface pb-6 mb-8">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter uppercase text-on-surface">
            Assessment Complete
          </h1>
          <p className="font-mono-data text-mono-data text-on-surface-variant mt-2">
            PROTOCOL TERMINATED // {questions.length} VECTORS PROCESSED
          </p>
        </div>

        {/* Dichotomy Scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {dichotomies.map(([traitA, traitB]) => {
            const scoreA = questions
              .filter((q) => q.trait === traitA)
              .reduce((sum, q) => sum + (answers[q.id] || 3), 0);
            const scoreB = questions
              .filter((q) => q.trait === traitB)
              .reduce((sum, q) => sum + (answers[q.id] || 3), 0);
            const total = scoreA + scoreB;
            const pctA = Math.round((scoreA / total) * 100);
            const pctB = 100 - pctA;

            return (
              <div key={traitA + traitB} className="border border-on-surface p-4 bg-surface-container-lowest">
                <div className="flex justify-between font-label-bold text-label-bold uppercase tracking-wider mb-3">
                  <span className="text-on-surface">{TRAIT_NAMES[traitA]} ({traitA})</span>
                  <span className="text-on-surface">{TRAIT_NAMES[traitB]} ({traitB})</span>
                </div>
                <div className="flex h-3 w-full border border-on-surface overflow-hidden">
                  <div
                    className="bg-primary-container transition-all duration-500"
                    style={{ width: `${pctA}%` }}
                  ></div>
                  <div
                    className="bg-surface-variant transition-all duration-500"
                    style={{ width: `${pctB}%` }}
                  ></div>
                </div>
                <div className="flex justify-between font-mono-data text-mono-data text-on-surface-variant mt-2">
                  <span>{pctA}%</span>
                  <span>{pctB}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Question Breakdown */}
        <div className="mb-10">
          <h2 className="font-label-bold text-label-bold text-on-surface uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-on-surface/20 pb-2">
            <span className="material-symbols-outlined text-[18px]">list_alt</span>
            Response Log
          </h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {questions.map((q) => {
              const value = answers[q.id];
              return (
                <div key={q.id} className="flex items-start gap-4 border border-on-surface/20 p-3 bg-surface-container-lowest">
                  <span className="font-mono-data text-mono-data text-on-surface-variant bg-surface px-2 py-1 border border-on-surface shrink-0">
                    {q.trait}
                  </span>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm text-on-surface leading-snug">{q.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div
                          key={dot}
                          className={`w-3 h-3 rounded-full border border-on-surface ${
                            dot === value ? "bg-primary-container" : "bg-surface"
                          }`}
                        ></div>
                      ))}
                      <span className="font-mono-data text-mono-data text-on-surface-variant ml-2">
                        {LIKERT_LABELS[value]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-on-surface">
          <button
            onClick={onRetake}
            className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider py-3 px-6 border border-on-surface hover:bg-surface-variant transition-colors flex items-center gap-2 justify-center"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Re-take Test
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-on-surface text-surface px-8 py-3 font-label-bold text-label-bold uppercase tracking-widest hover:bg-primary-container hover:text-on-surface transition-colors flex items-center gap-2 justify-center btn-primary border border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? "Processing..." : "Save Results"}
            {!isSaving && <span className="material-symbols-outlined text-[18px]">save</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
