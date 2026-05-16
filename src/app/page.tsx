import Link from "next/link";
import InteractiveGrid from "./components/InteractiveGrid";
import TopNavBar from "./components/TopNavBar";
import "./globals.css";

export default function Home() {
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
      <footer className="z-20 w-full py-gutter px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4 bg-surface dark:bg-background border-t border-on-surface flat no shadows">
        <div className="font-mono-data text-mono-data text-on-surface-variant">
          © {new Date().getFullYear()} VECTOR.OS RETRIEVAL SYSTEMS
        </div>
        <div className="flex gap-6 font-mono-data text-mono-data">
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
            Privacy
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
            Terms
          </Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="#">
            Protocol
          </Link>
        </div>
      </footer>
    </>
  );
}