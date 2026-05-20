"use client";

import InteractiveGrid from "../components/InteractiveGrid";
import TopNavBar from "../components/TopNavBar";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";

export default function AuthPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        if (username.trim()) {
          await updateProfile(userCredential.user, { displayName: username });
        }
      }
      // Assuming successful auth redirects to home
      router.push("/");
    } catch (err: any) {
      setError("Authentication Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-body-md text-on-surface antialiased overflow-x-hidden">
      <InteractiveGrid />
      <TopNavBar />
      
      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop mt-16 relative z-10">
        <div className="w-full max-w-md bg-surface-container-lowest border-2 border-on-surface relative shadow-[4px_4px_0px_0px_rgba(28,28,15,1)] p-8 md:p-12 animate-fade-in-up">
          
          <div className="border-b border-on-surface pb-6 mb-8 text-center">
            <h1 className="font-display-lg text-display-lg-mobile md:text-[40px] leading-none tracking-tighter uppercase text-on-surface">
              {isLoginMode ? "Login" : "Signup"}
            </h1>
            <p className="font-mono-data text-mono-data text-on-surface-variant mt-3">
              {isLoginMode ? "Enter the credentials to login" : "Create a new account"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            {!isLoginMode && (
              <div className="space-y-2">
                <label className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">person</span>
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-surface border border-on-surface p-3 font-mono-data text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  placeholder="Enter username"
                  required={!isLoginMode}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">mail</span>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-on-surface p-3 font-mono-data text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-on-surface p-3 font-mono-data text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="Enter secure password"
                required
              />
            </div>

            {error && (
              <div className="bg-error/10 border border-error p-3 flex items-start gap-2 text-error">
                <span className="material-symbols-outlined text-[20px]">warning</span>
                <p className="font-mono-data text-xs leading-tight">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-on-surface text-surface py-4 font-label-bold text-label-bold uppercase tracking-widest hover:bg-primary-container hover:text-on-surface transition-colors flex items-center justify-center gap-2 btn-primary border border-transparent disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {loading ? (
                "Processing..."
              ) : (
                <>
                  {isLoginMode ? "Login" : "Signup"}
                  <span className="material-symbols-outlined">
                    {isLoginMode ? "login" : "person_add"}
                  </span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-on-surface/20 text-center">
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError("");
              }}
              className="font-mono-data text-mono-data text-on-surface-variant hover:text-on-surface underline transition-colors"
            >
              {isLoginMode
                ? "New to Persona? Create Account"
                : "Already have an Account? Login."}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}