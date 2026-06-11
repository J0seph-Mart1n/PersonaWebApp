"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InteractiveGrid from "../components/InteractiveGrid";
import { updateUserProfile } from "../../services/backendUserService";

export default function OnboardingPage() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !bio.trim()) {
      setError("Please fill out both fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Update MongoDB Profile
      const success = await updateUserProfile("main_user", {
        username: username.trim(),
        bio: bio.trim(),
        hasCompletedOnboarding: true,
      });

      if (!success) {
        throw new Error("Failed to save profile to database.");
      }

      // 2. Redirect to Dashboard
      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col font-body-md text-on-surface antialiased overflow-x-hidden">
      <InteractiveGrid />

      <main className="flex-grow flex items-center justify-center p-margin-mobile md:p-margin-desktop relative z-10">
        <div className="w-full max-w-md bg-surface-container-lowest border-2 border-on-surface relative shadow-[4px_4px_0px_0px_rgba(28,28,15,1)] p-8 md:p-12 animate-fade-in-up">
          <div className="border-b border-on-surface pb-6 mb-8 text-center">
            <h1 className="font-display-lg text-display-lg-mobile md:text-[40px] leading-none tracking-tighter uppercase text-on-surface">
              Welcome
            </h1>
            <p className="font-mono-data text-mono-data text-on-surface-variant mt-3">
              INITIALIZE YOUR PERSONA
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter display name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-bold text-label-bold uppercase tracking-wider text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">history_edu</span>
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full bg-surface border border-on-surface p-3 font-mono-data text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                placeholder="Tell the system about yourself..."
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
              {loading ? "Initializing..." : "Complete Setup"}
              {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
