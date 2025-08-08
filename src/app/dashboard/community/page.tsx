"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, ArrowLeft } from "lucide-react";
import { ForumList } from "@/components/forum/forum-list";
import { CreatePostDialog } from "@/components/forum/create-post-dialog";
import { useRouter } from "next/navigation";

export default function CommunityPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="container mx-auto p-8 space-y-8">
      <Button
        variant="ghost"
        className="text-pink-600 mb-4"
        onClick={() => router.push("/dashboard")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-pink-900">Community Forum</h1>
          <p className="text-gray-600">Share and connect with other women</p>
        </div>
        <Button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-pink-600 hover:bg-pink-700 gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Share Your Story
        </Button>
      </div>

      <ForumList />
      <CreatePostDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
}