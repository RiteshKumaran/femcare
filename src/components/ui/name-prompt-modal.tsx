"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-provider";
import { useEffect, useState } from "react";

interface NamePromptModalProps {
  onNameSaved: (name: string) => void;
}

export function NamePromptModal({ onNameSaved }: NamePromptModalProps) {
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && user) {
      const savedName = localStorage.getItem(`lovelyName_${user.uid}`);
      console.log("🌸 NamePromptModal: Checking for saved name:", savedName);

      if (!savedName || !savedName.trim()) {
        console.log("🌸 NamePromptModal: No saved name, showing modal");
        setShow(true);
      } else {
        console.log("🌸 NamePromptModal: Found saved name:", savedName);
        onNameSaved(savedName);
      }
    }
  }, [mounted, user, onNameSaved]);

  const handleSave = () => {
    if (user && name.trim()) {
      localStorage.setItem(`lovelyName_${user.uid}`, name.trim());
      setShow(false);
      onNameSaved(name.trim());
      console.log("🌸 Name saved:", name.trim());
    }
  };

  const handleSkip = () => {
    setShow(false);
  };

  if (!mounted || !show || !user) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
      }}
    >
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 relative">
        <div className="text-center">
          <div className="mb-4">
            <span className="text-5xl animate-bounce">🌸</span>
          </div>
          <h2 className="text-3xl font-bold mb-3 text-pink-700">
            What's your lovely name?
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            We'd love to personalize your SheEvolves experience!
          </p>
          <input
            type="text"
            className="border-2 border-pink-300 rounded-lg px-4 py-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 text-lg"
            placeholder="Enter your lovely name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={32}
            onKeyPress={(e) => {
              if (e.key === "Enter" && name.trim()) {
                handleSave();
              }
            }}
            autoFocus
          />
          <div className="flex gap-3 mb-4">
            <Button
              variant="outline"
              className="flex-1 py-3"
              onClick={() => {
                const emailName = user.email?.split("@")[0] || "";
                setName(emailName);
                if (emailName) {
                  setTimeout(() => {
                    localStorage.setItem(`lovelyName_${user.uid}`, emailName);
                    setShow(false);
                    onNameSaved(emailName);
                  }, 100);
                }
              }}
            >
              📧 Use Email Name
            </Button>
            <Button
              className="bg-pink-600 hover:bg-pink-700 flex-1 py-3 text-lg font-semibold"
              disabled={!name.trim()}
              onClick={handleSave}
            >
              💖 Save My Name
            </Button>
          </div>
          <Button
            variant="ghost"
            className="w-full text-gray-500 hover:text-gray-700"
            onClick={handleSkip}
          >
            Skip for now
          </Button>
        </div>
      </div>
    </div>
  );
}
