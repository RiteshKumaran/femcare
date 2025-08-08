"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { PostDetailDialog } from "./post-detail-dialog";
import { useAuth } from "@/lib/auth-provider";
import { EditPostDialog } from "./edit-post-dialog";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { MessageCircle } from "lucide-react";

export function ForumList() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedPosts = querySnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Post)
      );

      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const refreshPosts = () => {
    setLoading(true);
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
              <div className="h-4 w-1/3 bg-gray-200 rounded mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* User's Posts Section */}
      {user && (
        <div>
          <h2 className="text-2xl font-bold text-pink-900 mb-4">Your Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts
              .filter((post) => post.authorId === user.uid)
              .map((post) => (
                <Card
                  key={post.id}
                  className="hover:shadow-md transition-shadow h-[280px] flex flex-col relative"
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingPost(post);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <CardHeader className="flex-none">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl text-pink-900 line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                        {formatDistanceToNow(new Date(post.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Posted by {post.authorName || "Anonymous"}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 overflow-hidden">
                    <p className="text-gray-700 line-clamp-4 mb-4">{post.content}</p>
                    <div className="flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-pink-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPost(post);
                          setDetailOpen(true);
                        }}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* All Posts Section */}
      <div>
        <h2 className="text-2xl font-bold text-pink-900 mb-4">Community Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-md transition-shadow h-[280px] flex flex-col"
            >
              <CardHeader className="flex-none">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-pink-900 line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-2">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Posted by {post.authorName || "Anonymous"}
                </p>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <p className="text-gray-700 line-clamp-4 mb-4">{post.content}</p>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-pink-600"
                    onClick={() => {
                      setSelectedPost(post);
                      setDetailOpen(true);
                    }}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <PostDetailDialog
        post={selectedPost}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
      
      <EditPostDialog
        post={editingPost}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onUpdate={refreshPosts}
      />
    </div>
  );
}
