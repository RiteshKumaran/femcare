"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// Replace the Editor import with:
import { RichTextEditor } from "@/components/rich-text-editor";
import { useAuth } from "@/lib/auth-provider";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePostDialog({ open, onOpenChange }: CreatePostDialogProps) {
  const { user } = useAuth();
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const postsRef = collection(db, "posts");
      await addDoc(postsRef, {
        title,
        content,
        authorName: isAnonymous ? "Anonymous" : (name || "Anonymous"),
        authorId: user?.uid,
        createdAt: new Date().toISOString(),
      });
      onOpenChange(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter the title of your post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {!isAnonymous && (
            <div className="space-y-2">
              <Label htmlFor="name">Display Name (optional)</Label>
              <Input
                id="name"
                placeholder="Enter your display name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
            />
            <Label htmlFor="anonymous">Post anonymously</Label>
          </div>

          <div className="space-y-2">
            <Label>Your Story</Label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Share your experience..."
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700"
          >
            Post
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
