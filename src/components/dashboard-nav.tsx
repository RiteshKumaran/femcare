"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-provider";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function DashboardNav() {
  const { user, signOut } = useAuth();
  const [lovelyName, setLovelyName] = useState<string>("");
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize name from localStorage and determine if we should show the prompt
  useEffect(() => {
    if (user && !isInitialized) {
      console.log("🚀 Initializing name for user:", user.uid);
      const savedName = localStorage.getItem(`lovelyName_${user.uid}`);

      if (savedName) {
        console.log("✅ Found saved name:", savedName);
        setLovelyName(savedName);
        setShowNamePrompt(false);
      } else {
        console.log("❌ No saved name found, showing prompt");
        setShowNamePrompt(true);
      }

      setIsInitialized(true);
    }
  }, [user, isInitialized]);

  const saveLovelyName = () => {
    if (user && lovelyName.trim()) {
      const trimmedName = lovelyName.trim();
      localStorage.setItem(`lovelyName_${user.uid}`, trimmedName);
      setLovelyName(trimmedName);
      setShowNamePrompt(false);
      console.log("✅ Name saved:", trimmedName);
    }
  };

  // Name prompt modal
  const nameModal =
    showNamePrompt && user ? (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 relative z-[10000]">
          <div className="text-center">
            <div className="mb-4">
              <span className="text-4xl">🌸</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-pink-700">
              What's your lovely name?
            </h2>
            <p className="text-gray-600 mb-6">
              We'd love to personalize your experience!
            </p>
            <input
              type="text"
              className="border border-pink-300 rounded-lg px-4 py-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
              placeholder="Enter your name..."
              value={lovelyName}
              onChange={(e) => setLovelyName(e.target.value)}
              maxLength={32}
              onKeyPress={(e) => {
                if (e.key === "Enter" && lovelyName.trim()) {
                  saveLovelyName();
                }
              }}
              autoFocus
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  const emailName = user.email?.split("@")[0] || "";
                  if (emailName) {
                    setLovelyName(emailName);
                    localStorage.setItem(`lovelyName_${user.uid}`, emailName);
                    setShowNamePrompt(false);
                    console.log("✅ Using email name:", emailName);
                  }
                }}
              >
                Use Email Name
              </Button>
              <Button
                className="bg-pink-600 hover:bg-pink-700 flex-1 py-3"
                disabled={!lovelyName.trim()}
                onClick={saveLovelyName}
              >
                Save My Name
              </Button>
            </div>
            {/* Skip option */}
            <Button
              variant="ghost"
              className="w-full mt-2 text-gray-500"
              onClick={() => setShowNamePrompt(false)}
            >
              Skip for now
            </Button>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      {nameModal}
      <nav className="border-b bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <div className="w-1/3">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary">SheEvolves</h1>
            </Link>
          </div>

          <div className="w-1/3 flex justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-500">Welcome back girl!!!</p>
              <p className="text-gray-700 font-medium">
                {lovelyName || user?.email} 💖
              </p>
            </div>
          </div>

          <div className="w-1/3 flex justify-end">
            <Button size="sm" onClick={signOut} className=" gap-2">
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
}
