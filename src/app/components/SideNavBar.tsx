"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { getUserProfile } from "../../services/backendUserService";
import { usePathname, useRouter } from "next/navigation";

export default function SideNavBar({ children }: { children?: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfile = async () => {
      if (pathname !== "/Onboarding") {
        const profile = await getUserProfile("main_user");
        if (profile && profile.hasCompletedOnboarding) {
          setUser({ displayName: profile.username || "main_user", email: "Local Environment", uid: "main_user" });
        } else {
          router.push("/Onboarding");
        }
      }
      setAuthLoading(false);
    };
    fetchProfile();
  }, [pathname, router]);

  // Update CSS variable for sidebar width so other components (like Chat) can adjust
  useEffect(() => {
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '5rem' : '16rem');
  }, [isCollapsed]);

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
    // Local app doesn't need sign out, but we can redirect to Onboarding
    router.push("/Onboarding");
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed left-0 top-0 h-screen z-50 flex flex-col bg-surface/80 backdrop-blur-sm border-r border-on-surface dark:border-outline py-6 transition-all duration-300 ${isCollapsed ? 'w-20 px-2' : 'w-64 px-4'}`}>
        <div className={`mb-8 px-2 flex items-center ${isCollapsed ? 'justify-center' : 'justify-start gap-4'}`}>
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1 hover:bg-surface-variant transition-colors rounded text-on-surface">
            <span className="material-symbols-outlined">menu</span>
          </button>
          {!isCollapsed && (
            <span className="font-display-lg text-headline-sm font-extrabold tracking-tighter text-on-surface dark:text-on-surface">
              Persona
            </span>
          )}
        </div>
        
        <div className="flex flex-col gap-2 flex-grow">
          <Link className={`font-label-bold text-label-bold text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors py-3 flex items-center gap-3 ${isCollapsed ? 'justify-center px-0' : 'px-4'}`} href="/">
            <span className="material-symbols-outlined">dashboard</span>
            {!isCollapsed && "Dashboard"}
          </Link>
          <Link className={`font-label-bold text-label-bold text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors py-3 flex items-center gap-3 ${isCollapsed ? 'justify-center px-0' : 'px-4'}`} href="/Chat">
            <span className="material-symbols-outlined">chat</span>
            {!isCollapsed && "Chat"}
          </Link>
          <Link className={`font-label-bold text-label-bold text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors py-3 flex items-center gap-3 ${isCollapsed ? 'justify-center px-0' : 'px-4'}`} href="/Traits">
            <span className="material-symbols-outlined">psychology</span>
            {!isCollapsed && "Traits"}
          </Link>
          <Link className={`font-label-bold text-label-bold text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors py-3 flex items-center gap-3 ${isCollapsed ? 'justify-center px-0' : 'px-4'}`} href="/Assessment">
            <span className="material-symbols-outlined">assignment</span>
            {!isCollapsed && "Assessment"}
          </Link>
          <Link className={`font-label-bold text-label-bold text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors py-3 flex items-center gap-3 ${isCollapsed ? 'justify-center px-0' : 'px-4'}`} href="/MBTI">
            <span className="material-symbols-outlined">science</span>
            {!isCollapsed && "MBTI Test"}
          </Link>
        </div>

        <div className="mt-auto border-t border-on-surface pt-4 flex flex-col gap-2">
          <Link className={`font-label-bold text-label-bold text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors py-3 flex items-center gap-3 ${isCollapsed ? 'justify-center px-0' : 'px-4'}`} href="/Settings">
            <span className="material-symbols-outlined">settings</span>
            {!isCollapsed && "Settings"}
          </Link>

        {authLoading ? (
          <div className="w-full h-12 bg-on-surface/10 animate-pulse border border-transparent mt-2"></div>
        ) : user ? (
          <div className="relative mt-2" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`w-full font-label-bold text-label-bold text-primary dark:text-primary-fixed hover:bg-primary-container transition-colors py-3 flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'}`}
            >
              <div className="flex items-center gap-3 truncate">
                <span className="material-symbols-outlined">account_circle</span>
                {!isCollapsed && <span className="truncate">{user.displayName || "User"}</span>}
              </div>
              {!isCollapsed && <span className="material-symbols-outlined text-[16px]">{isMenuOpen ? 'expand_less' : 'expand_more'}</span>}
            </button>
            
            {isMenuOpen && (
              <div className="absolute bottom-full left-0 mb-2 w-48 bg-surface-container-lowest border border-on-surface shadow-[4px_4px_0px_0px_rgba(28,28,15,1)] flex flex-col z-50">
                <div className="px-4 py-3 border-b border-on-surface/20">
                  <p className="font-mono-data text-[10px] text-on-surface-variant truncate">
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
            className={`mt-2 font-label-bold text-label-bold text-on-surface border border-on-surface py-3 hover:bg-surface-variant transition-colors flex items-center justify-center gap-2 ${isCollapsed ? 'px-0' : 'px-4'}`}
          >
            <span className="material-symbols-outlined text-[18px]">login</span>
            {!isCollapsed && "Login"}
          </Link>
        )}
      </div>
    </nav>
    {children && (
      <main className={`flex-1 min-h-screen relative overflow-x-hidden transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
        {children}
      </main>
    )}
  </>
  );
}
