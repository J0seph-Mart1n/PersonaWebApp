"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import TopNavBar from "../components/TopNavBar";

export default function ChatPage() {
  const [inputText, setInputText] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    {
      role: "assistant", 
      content: "Hi, I'm Persona, your personalized AI assistant. How can I help you today?"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    
    const userMessage = inputText.trim();
    setInputText("");
    
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const historyForApi = newMessages.map(m => ({ role: m.role, content: m.content }));
      
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.uid || "anonymous",
          message: userMessage,
          history: historyForApi.slice(0, -1)
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with Vector.OS");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);

    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "ERROR: Connection to main frame lost. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="text-on-surface font-body-md antialiased min-h-screen flex flex-col lg:flex-row overflow-hidden">

      <TopNavBar/>
      
      {/* Chat History SideNavBar */}
      <nav className="hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-surface dark:bg-background border-r border-on-surface dark:border-outline w-64 no-grid">
        <div className="p-4 border-b border-on-surface">
          <button className="w-full py-3 bg-on-surface text-surface font-label-bold text-label-bold border border-on-surface hover:bg-primary-container hover:text-on-surface transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">add</span>
            New Chat
          </button>
        </div>
        
        <div className="flex-1 py-4 flex flex-col overflow-y-auto px-2 gap-6">
          
          {/* Today */}
          <div className="flex flex-col gap-1">
            <span className="px-4 text-[10px] font-label-bold text-on-surface-variant mb-1 uppercase tracking-wider">Today</span>
            <Link href="#" className="px-4 py-2 flex items-center gap-3 text-on-surface bg-surface-container-highest border border-on-surface font-label-bold text-sm transition-all">
              <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
              <span className="truncate">RAG Deployment Logic</span>
            </Link>
            <Link href="#" className="px-4 py-2 flex items-center gap-3 text-on-surface hover:bg-surface-container-highest font-label-bold text-sm transition-all border border-transparent hover:border-on-surface/20">
              <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
              <span className="truncate">Explain Vector Search</span>
            </Link>
          </div>

          {/* Yesterday */}
          <div className="flex flex-col gap-1">
            <span className="px-4 text-[10px] font-label-bold text-on-surface-variant mb-1 uppercase tracking-wider">Yesterday</span>
            <Link href="#" className="px-4 py-2 flex items-center gap-3 text-on-surface hover:bg-surface-container-highest font-label-bold text-sm transition-all border border-transparent hover:border-on-surface/20">
              <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
              <span className="truncate">React State Management</span>
            </Link>
            <Link href="#" className="px-4 py-2 flex items-center gap-3 text-on-surface hover:bg-surface-container-highest font-label-bold text-sm transition-all border border-transparent hover:border-on-surface/20">
              <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
              <span className="truncate">Firebase Auth Setup</span>
            </Link>
          </div>

          {/* Previous 7 Days */}
          <div className="flex flex-col gap-1">
            <span className="px-4 text-[10px] font-label-bold text-on-surface-variant mb-1 uppercase tracking-wider">Previous 7 Days</span>
            <Link href="#" className="px-4 py-2 flex items-center gap-3 text-on-surface hover:bg-surface-container-highest font-label-bold text-sm transition-all border border-transparent hover:border-on-surface/20">
              <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
              <span className="truncate">Tailwind CSS Grids</span>
            </Link>
            <Link href="#" className="px-4 py-2 flex items-center gap-3 text-on-surface hover:bg-surface-container-highest font-label-bold text-sm transition-all border border-transparent hover:border-on-surface/20">
              <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
              <span className="truncate">Next.js Routing</span>
            </Link>
          </div>
        </div>
        
        <div className="p-4 border-t border-on-surface flex flex-col gap-1">
          <Link href="#" className="px-4 py-2 flex items-center gap-3 text-on-surface hover:bg-surface-container-highest font-mono-data text-xs transition-all border border-transparent hover:border-on-surface/20">
            <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
            Clear History
          </Link>
          <Link href="#" className="px-4 py-2 flex items-center gap-3 text-on-surface hover:bg-surface-container-highest font-mono-data text-xs transition-all border border-transparent hover:border-on-surface/20">
            <span className="material-symbols-outlined text-[16px]">settings</span>
            Settings
          </Link>
        </div>
      </nav>

      {/* Mobile Top Header (Fallback) */}
      <header className="lg:hidden fixed top-0 w-full z-50 flex justify-between items-center px-margin-mobile h-16 bg-surface border-b border-on-surface no-grid">
        <h1 className="font-display-lg text-headline-lg-mobile font-extrabold tracking-tighter text-on-surface">VECTOR.OS</h1>
        <button className="p-2 border border-on-surface">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row lg:ml-64 mt-16 h-[calc(100vh-4rem)]">
        
        

        {/* Chat Stream (Right Side of Main) */}
        <section className="flex-1 flex flex-col bg-surface no-grid relative h-full">
          
          {/* Chat Header */}
          <div className="p-6 border-b border-on-surface bg-surface z-10 flex justify-between items-center">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Session Stream</h2>
              <p className="font-mono-data text-mono-data text-on-surface-variant mt-1">ID: VEC-892-ALPHA</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 border border-on-surface hover:bg-primary-container transition-colors bg-surface">
                <span className="material-symbols-outlined">tune</span>
              </button>
              <button className="p-2 border border-on-surface hover:bg-primary-container transition-colors bg-surface">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-margin-desktop flex flex-col gap-8 z-10 relative">
            
            {messages.map((msg, idx) => (
              msg.role === "assistant" ? (
                <div key={idx} className="flex flex-col gap-2 max-w-2xl self-start">
                  <span className="font-label-bold text-label-bold text-on-surface-variant uppercase ml-4">Vector.OS</span>
                  <div className="bg-surface-container-lowest border border-on-surface border-l-4 border-l-primary-container p-6">
                    <p className="font-body-md text-body-md text-on-surface whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ) : (
                <div key={idx} className="flex flex-col gap-2 max-w-2xl self-end items-end">
                  <span className="font-label-bold text-label-bold text-on-surface-variant uppercase mr-4">{user?.displayName || "User_Admin"}</span>
                  <div className="bg-on-surface text-surface p-6 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <p className="font-body-md text-body-md whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              )
            ))}

            {/* RAG Animation Streak (Loading State) */}
            {isLoading && (
              <div className="w-full flex justify-center py-4 opacity-70">
                <div className="h-[1px] w-full bg-on-surface relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-1/4 bg-primary-container shadow-[0_0_10px_#ffff00] animate-slide"></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 md:px-margin-desktop md:py-6 bg-surface border-t border-on-surface z-10">
            <div className="relative w-full max-w-4xl mx-auto flex items-end border border-on-surface bg-surface-container-lowest focus-within:border-2 focus-within:-m-[1px]">
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 resize-none py-4 pl-4 pr-12 font-body-md text-body-md text-on-surface placeholder-on-surface-variant/50 min-h-[60px] outline-none" 
                placeholder="Input parameter or query..." 
                rows={1}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button 
                onClick={handleSendMessage}
                className="absolute right-2 bottom-2 p-2 bg-on-surface text-surface hover:bg-primary-container hover:text-on-surface transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
            <div className="flex justify-between items-center max-w-4xl mx-auto mt-2 px-1">
              <span className="font-mono-data text-[10px] text-on-surface-variant">SHIFT+ENTER for new line</span>
              <span className="font-mono-data text-[10px] text-on-surface-variant">RAG STATUS: ONLINE</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}