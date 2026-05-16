"use client";

import React, { useState } from "react";
import Link from "next/link";
import TopNavBar from "../components/TopNavBar";
import InteractiveGrid from "../components/InteractiveGrid";

import { questions } from "../../data/questions";

export default function AssessmentPage() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  
  // Dynamic state for traversing questions
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Store answers mapping Question ID to Likert Value (1-5)
  const [answers, setAnswers] = useState<Record<number, number>>({});

  // Configuration for the Likert scale
  const likertOptions = [
    { id: 1, sizeClass: "w-12 h-12", label: "STRONGLY\nDISAGREE" },
    { id: 2, sizeClass: "w-10 h-10", label: null },
    { id: 3, sizeClass: "w-8 h-8", label: null },
    { id: 4, sizeClass: "w-10 h-10", label: null },
    { id: 5, sizeClass: "w-12 h-12", label: "STRONGLY\nAGREE" },
  ];

  const currentQuestion = questions[currentIndex];
  
  // Calculate progress percentage
  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;
  
  const handleOptionSelect = (value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Logic for finishing the assessment
      console.log("Assessment completed! Answers:", answers);
      alert("Assessment Completed! Check console for result data payload.");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Determine if the Next button should be disabled (user hasn't answered yet)
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;

  return (
    <div className="min-h-screen flex flex-col font-body-md text-on-surface antialiased overflow-x-hidden">
      
      {/* Interactive Vector Grid Background */}
      <InteractiveGrid />

      {/* TopNavBar */}
      <TopNavBar />

      {/* Main Canvas */}
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop mt-16 relative z-10">
        {!isStarted ? (
          /* --- SIMPLE START MENU --- */
          <div className="w-full max-w-2xl bg-surface/90 backdrop-blur-md border border-on-surface relative hard-shadow p-8 md:p-12 text-center">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg tracking-tighter uppercase text-on-surface mb-4">
              Personality Assessment
            </h1>
            <p className="font-body-md text-on-surface-variant mb-12">
              {questions.length} Statements. Respond honestly to calculate your true digital archetype.
            </p>
            <div className="flex justify-center">
              <button 
                onClick={() => setIsStarted(true)}
                className="bg-on-surface text-surface px-8 py-4 font-label-bold text-label-bold uppercase tracking-widest hover:bg-primary-container hover:text-on-surface transition-colors flex items-center gap-3 w-full sm:w-auto justify-center btn-primary border border-transparent"
              >
                Start Test
                <span className="material-symbols-outlined">rocket_launch</span>
              </button>
            </div>
          </div>
        ) : (
          /* --- QUESTION VIEW --- */
          <div className="w-full max-w-3xl bg-surface-container-lowest border-2 border-on-surface relative shadow-[4px_4px_0px_0px_rgba(28,28,15,1)]">
          
          {/* Progress Bar Header */}
          <div className="h-2 w-full bg-surface-variant border-b border-on-surface">
            <div 
              className="h-full bg-primary-container transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <div className="p-8 md:p-16 flex flex-col items-center text-center">
            
            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-8">
              <span className="font-mono-data text-mono-data text-on-surface-variant bg-surface px-3 py-1 border border-on-surface">
                NODE {String(currentIndex + 1).padStart(2, '0')} / {questions.length}
              </span>
              <span className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider">
                {currentQuestion.vectorName}
              </span>
            </div>

            {/* Question */}
            <h1 className="font-headline-lg text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-12 max-w-2xl leading-tight">
              {currentQuestion.text}
            </h1>

            {/* Interactive Likert Scale */}
            <div className="w-full max-w-xl mb-16">
              <div className="flex justify-between items-center relative">
                
                {/* Connecting Line */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-on-surface z-0"></div>

                {/* Options Mapping */}
                {likertOptions.map((option) => {
                  const isSelected = answers[currentQuestion.id] === option.id;

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className="relative z-10 flex flex-col items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`${option.sizeClass} rounded-full border-2 border-on-surface flex items-center justify-center transition-colors 
                          ${isSelected 
                            ? "bg-primary-container shadow-[2px_2px_0px_0px_rgba(28,28,15,1)]" 
                            : "bg-surface-container-lowest group-hover:bg-primary-container"
                          }`}
                      >
                        {isSelected && (
                          <div className="w-3 h-3 bg-on-surface rounded-full"></div>
                        )}
                      </div>
                      
                      {option.label && (
                        <span className="font-label-bold text-label-bold text-on-surface-variant group-hover:text-on-surface transition-colors whitespace-pre-line text-center">
                          {option.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-between w-full pt-8 border-t border-on-surface">
              <button 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`font-label-bold text-label-bold uppercase tracking-wider py-3 px-6 border border-on-surface flex items-center gap-2 transition-colors
                  ${currentIndex === 0 
                    ? "opacity-50 cursor-not-allowed text-on-surface-variant bg-surface" 
                    : "text-on-surface hover:bg-surface-variant"
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Previous
              </button>
              
              <button 
                onClick={handleNext}
                disabled={!hasAnsweredCurrent}
                className={`font-label-bold text-label-bold uppercase tracking-wider py-3 px-8 border border-on-surface flex items-center gap-2 transition-colors
                  ${!hasAnsweredCurrent 
                    ? "opacity-50 cursor-not-allowed text-on-surface-variant bg-surface" 
                    : "text-on-tertiary bg-on-surface hover:bg-primary-container hover:text-on-surface"
                  }`}
              >
                {currentIndex === questions.length - 1 ? "Complete" : "Next Vector"}
                {currentIndex !== questions.length - 1 && <span className="material-symbols-outlined text-[18px]">arrow_forward</span>}
              </button>
            </div>
          </div>
          </div>
        )}
      </main>
    </div>
  );
}