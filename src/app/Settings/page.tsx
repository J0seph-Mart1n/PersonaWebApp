"use client";

import React, { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import TopNavBar from "../components/TopNavBar";
import { getUserProfile, updateUserProfile } from "../../services/firebaseUserService";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsLoading(true);
        const profile = await getUserProfile(currentUser.uid);
        if (profile) {
          setGithubUrl(profile.githubUrl || "");
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSaving(true);
    setSaveStatus("idle");
    
    const success = await updateUserProfile(user.uid, {
      githubUrl,
    });
    
    setIsSaving(false);
    setSaveStatus(success ? "success" : "error");
    
    if (success) {
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleUpload = async () => {
    if (!user || !resumeFile) return;
    
    setIsUploading(true);
    setUploadStatus("idle");
    
    try {
      const formData = new FormData();
      formData.append("userId", user.uid);
      formData.append("platform", "resume");
      formData.append("resumeFile", resumeFile);

      const response = await fetch("http://localhost:5000/api/ingest/social", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      
      setUploadStatus("success");
      setTimeout(() => setUploadStatus("idle"), 3000);
      setResumeFile(null);
    } catch (error) {
      console.error(error);
      setUploadStatus("error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="font-body-md text-body-md text-on-surface antialiased min-h-screen relative overflow-x-hidden">
      <TopNavBar />
      
      <main className="flex-1 mt-12 p-margin-mobile md:p-margin-desktop bg-transparent pb-32">
        <header className="mb-12">
          <h1 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-2 uppercase">Settings</h1>
          <p className="font-mono-data text-mono-data text-on-surface-variant flex items-center gap-2">
            <span className="w-2 h-2 bg-primary-container border border-on-surface block"></span>
            USER CONFIGURATION / PROFILE LINKS
          </p>
        </header>

        <div className="max-w-2xl">
          <section className="bg-surface border border-on-surface p-8 vector-shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-on-surface bg-surface-container"></div>
            
            <div className="flex justify-between items-start mb-8">
              <h2 className="font-headline-lg text-headline-lg-mobile text-on-surface">SOCIAL PRESENCE</h2>
              <span className="font-mono-data text-mono-data text-on-surface bg-primary-container px-2 py-1 border border-on-surface">EDIT</span>
            </div>

            {isLoading ? (
              <div className="space-y-6 animate-pulse">
                {[1, 2].map((i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="h-4 w-24 bg-on-surface/20"></div>
                    <div className="h-12 w-full bg-surface-container border border-on-surface/20"></div>
                  </div>
                ))}
                <div className="h-10 w-32 bg-on-surface/20 mt-8"></div>
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-6">
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="github" className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    id="github"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/username"
                    className="bg-surface-container border border-on-surface p-3 font-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2 pt-4 border-t border-on-surface/20">
                  <label className="font-label-bold text-label-bold text-on-surface uppercase tracking-wider">
                    Upload Resume
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <input
                      type="file"
                      id="resume"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      className="bg-surface-container border border-on-surface p-2 font-body-md text-on-surface text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-label-bold file:bg-primary-container file:text-on-surface hover:file:bg-primary-container/80 transition-all flex-1 cursor-pointer w-full"
                    />
                    <button
                      type="button"
                      onClick={handleUpload}
                      disabled={isUploading || !resumeFile}
                      className="bg-on-surface text-surface px-6 py-2 font-label-bold text-label-bold uppercase tracking-widest hover:bg-primary-container hover:text-on-surface transition-colors border border-transparent disabled:opacity-50 disabled:cursor-not-allowed vector-shadow shrink-0 h-[42px]"
                    >
                      {isUploading ? "UPLOADING..." : "UPLOAD"}
                    </button>
                    {uploadStatus === "success" && (
                      <span className="font-mono-data text-mono-data text-[#4ade80] flex items-center gap-2 shrink-0">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      </span>
                    )}
                    {uploadStatus === "error" && (
                      <span className="font-mono-data text-mono-data text-[#f87171] flex items-center gap-2 shrink-0">
                        <span className="material-symbols-outlined text-[16px]">error</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-on-surface/20 flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-on-surface text-surface px-8 py-3 font-label-bold text-label-bold uppercase tracking-widest hover:bg-primary-container hover:text-on-surface transition-colors border border-transparent disabled:opacity-50 disabled:cursor-not-allowed vector-shadow"
                  >
                    {isSaving ? "SAVING..." : "SAVE PROFILE"}
                  </button>
                  
                  {saveStatus === "success" && (
                    <span className="font-mono-data text-mono-data text-[#4ade80] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      SAVED
                    </span>
                  )}
                  {saveStatus === "error" && (
                    <span className="font-mono-data text-mono-data text-[#f87171] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      ERROR SAVING
                    </span>
                  )}
                </div>

              </form>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
