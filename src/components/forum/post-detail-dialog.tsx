"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { PostReply } from "./post-reply";
import { formatDistanceToNow } from "date-fns";
import { Button } from "../ui/button";

interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

interface PostDetailDialogProps {
  post: Post | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Reply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

export function PostDetailDialog({ post, open, onOpenChange }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReplies = async () => {
    if (!post?.id) return;
    setLoading(true);
    try {
      const repliesRef = collection(db, "posts", post.id, "replies");
      const q = query(repliesRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedReplies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Reply[];

      setReplies(fetchedReplies);
    } catch (error) {
      console.error("Error fetching replies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && post?.id) {
      fetchReplies();
    }
  }, [open, post]);

  useEffect(() => {
    if (!open) {
      setShowReplyForm(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-pink-900">
            {post?.title}
          </DialogTitle>
          <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
            <span>Posted by {post?.authorName || "Anonymous"}</span>
            <span>
              {post?.createdAt &&
                formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
            </span>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{post?.content}</p>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-pink-600"
            >
              {showReplyForm ? "Cancel Reply" : "Reply to Post"}
            </Button>
          </div>

          <div className="space-y-4">
            <hr className="border-gray-200" />

            {loading ? (
              <div className="text-center py-4">Loading replies...</div>
            ) : (
              <PostReply
                postId={post?.id}
                replies={replies}
                onReplyAdded={fetchReplies}
                showReplyForm={showReplyForm}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
