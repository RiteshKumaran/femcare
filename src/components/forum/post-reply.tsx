"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { useAuth } from "@/lib/auth-provider";
import { formatDistanceToNow } from "date-fns";

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

interface PostReplyProps {
  postId: string;
  replies: Reply[];
  onReplyAdded: () => void;
  showReplyForm: boolean;
}

export function PostReply({ postId, replies, onReplyAdded, showReplyForm }: PostReplyProps) {
  const { user } = useAuth();
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReplies, setShowReplies] = useState(true);

  const formatTimestamp = (timestamp: Reply['createdAt']) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !replyContent.trim() || !postId) return;

    setIsSubmitting(true);
    try {
      const replyData = {
        content: replyContent.trim(),
        authorId: user.uid,
        authorName: user.displayName || "Anonymous",
        createdAt: serverTimestamp(),
      };

      const repliesRef = collection(db, "posts", postId, "replies");
      await addDoc(repliesRef, replyData);
      setReplyContent("");
      onReplyAdded();
    } catch (error) {
      console.error("Error adding reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-pink-900">
          Replies ({replies.length})
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowReplies(!showReplies)}
          className="text-pink-600"
        >
          {showReplies ? "Hide Replies" : "Show Replies"}
        </Button>
      </div>

      {showReplies && (
        <div className="space-y-4">
          {replies.length === 0 ? (
            <div className="text-center text-gray-500 py-4">
              No replies yet. Be the first to reply!
            </div>
          ) : (
            replies.map((reply) => (
              <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-gray-600">
                    {reply.authorName || "Anonymous"}
                  </p>
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(reply.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700">{reply.content}</p>
              </div>
            ))
          )}
        </div>
      )}

      {showReplyForm && user && (
        <form onSubmit={handleSubmitReply} className="space-y-4">
          <Textarea
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="min-h-[100px]"
          />
          <Button
            type="submit"
            disabled={isSubmitting || !replyContent.trim()}
            className="bg-pink-600 hover:bg-pink-700"
          >
            {isSubmitting ? "Posting..." : "Post Reply"}
          </Button>
        </form>
      )}
    </div>
  );
}
