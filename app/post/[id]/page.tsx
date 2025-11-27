"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase, Post, User } from "@/lib/supabase";
import { PostCard } from "@/components/PostCard";
import { Header } from "@/components/Header";
import { useAccount, useReadContract } from "wagmi";
import { POLYTHREADS_ABI, POLYTHREADS_ADDRESS } from "@/lib/contracts";
import { Loader2, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function PostPage() {
  const params = useParams();
  const postId = params.id as string;
  const [post, setPost] = useState<(Post & { users?: User }) | null>(null);
  const [replies, setReplies] = useState<(Post & { users?: User })[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const { address } = useAccount();

  // Fetch blockchain data if post has blockchain_post_id
  const { data: blockchainData } = useReadContract({
    address: POLYTHREADS_ADDRESS,
    abi: POLYTHREADS_ABI,
    functionName: "getPost",
    args: post?.blockchain_post_id ? [BigInt(post.blockchain_post_id)] : undefined,
  });

  useEffect(() => {
    fetchPost();
  }, [postId]);

  async function fetchPost() {
    try {
      setLoading(true);

      // Fetch main post
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .select(`
          *,
          users (*)
        `)
        .eq("id", postId)
        .single();

      if (postError) throw postError;
      setPost(postData);

      // Fetch replies
      const { data: repliesData, error: repliesError } = await supabase
        .from("posts")
        .select(`
          *,
          users (*)
        `)
        .eq("parent_post_id", postId)
        .order("created_at", { ascending: true });

      if (repliesError) throw repliesError;
      setReplies(repliesData || []);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();

    if (!address) {
      alert("Please connect your wallet");
      return;
    }

    if (!replyText.trim()) return;

    try {
      // Ensure user exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("wallet")
        .eq("wallet", address.toLowerCase())
        .single();

      if (!existingUser) {
        await supabase.from("users").insert({
          wallet: address.toLowerCase(),
        });
      }

      // Create reply
      const { error } = await supabase.from("posts").insert({
        wallet: address.toLowerCase(),
        text: replyText,
        parent_post_id: postId,
      });

      if (error) throw error;

      setReplyText("");
      fetchPost(); // Refresh to show new reply
    } catch (error) {
      console.error("Error creating reply:", error);
      alert("Failed to create reply");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="text-center p-8">
          <p className="text-foreground/60">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container max-w-2xl mx-auto">
        <div className="border-x border-border min-h-screen">
          <div className="border-b border-border p-4 flex items-center space-x-4">
            <Link href="/" className="hover:bg-border/50 p-2 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold">Thread</h1>
          </div>

          {/* Main Post */}
          <div className="border-b border-border p-4">
            <PostCard post={post} />
            
            {blockchainData && (
              <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <div className="flex items-center space-x-2 text-sm">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">Verified on Blockchain</span>
                </div>
                <div className="mt-2 text-xs text-foreground/60 space-y-1">
                  <p>Post ID: {post.blockchain_post_id}</p>
                  <p>Blockchain Likes: {blockchainData[4]?.toString()}</p>
                </div>
              </div>
            )}
          </div>

          {/* Reply Form */}
          {address && (
            <form onSubmit={handleReply} className="border-b border-border p-4">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Post your reply"
                className="w-full min-h-[80px] bg-transparent outline-none resize-none"
                maxLength={500}
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Reply
                </button>
              </div>
            </form>
          )}

          {/* Replies */}
          <div>
            {replies.length === 0 ? (
              <div className="text-center p-8 text-foreground/60">
                <p>No replies yet</p>
              </div>
            ) : (
              replies.map((reply) => (
                <PostCard key={reply.id} post={reply} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
