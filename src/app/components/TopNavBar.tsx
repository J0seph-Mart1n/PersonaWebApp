"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

export default function TopNavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-margin-desktop h-16 bg-surface/80 backdrop-blur-sm border-b border-on-surface dark:border-outline flat no shadows">
      <div className="flex items-center gap-8">
        <span className="font-display-lg text-headline-lg-mobile font-extrabold tracking-tighter text-on-surface dark:text-on-surface">
          Persona
        </span>
        <div className="hidden md:flex gap-6">
          <Link
            className="font-label-bold text-label-bold text-on-surface-variant font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors py-2 px-3"
            href="/"
          >
            Dashboard
          </Link>
          <Link
            className="font-label-bold text-label-bold text-on-surface-variant font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors py-2 px-3"
            href="#"
          >
            Chat
          </Link>
          <Link
            className="font-label-bold text-label-bold text-on-surface-variant font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors py-2 px-3"
            href="#"
          >
            Traits
          </Link>
          <Link
            className="font-label-bold text-label-bold text-on-surface-variant font-medium hover:bg-primary-container hover:text-on-primary-container transition-colors py-2 px-3"
            href="/Assessment"
          >
            Assessment
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          className="hidden md:block bg-on-surface text-surface px-6 py-2 font-label-bold text-label-bold btn-primary transition-colors border border-transparent"
          href="/MBTI"
        >
          MBTI Test
        </Link>
        <button className="text-primary dark:text-primary-fixed hover:text-primary-container transition-colors p-2">
          <span className="material-symbols-outlined">settings</span>
        </button>
        
        {user ? (
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary dark:text-primary-fixed hover:text-primary-container transition-colors p-2 flex items-center"
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-on-surface shadow-[4px_4px_0px_0px_rgba(28,28,15,1)] flex flex-col z-50">
                <div className="px-4 py-3 border-b border-on-surface/20">
                  <p className="font-label-bold text-label-bold text-on-surface truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="font-mono-data text-[10px] text-on-surface-variant truncate mt-1">
                    {user.email}
                  </p>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="px-4 py-3 text-left font-label-bold text-label-bold text-error hover:bg-surface-variant transition-colors flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/Signup"
            className="font-label-bold text-label-bold text-on-surface border border-on-surface px-4 py-2 hover:bg-surface-variant transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">login</span>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
