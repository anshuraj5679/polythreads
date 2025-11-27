"use client";

import { useEffect, useState } from "react";
import { supabase, Post, User } from "@/lib/supabase";
import { PostCard } from "@/components/PostCard";
import { Header } from "@/components/Header";
import { useAccount } from "wagmi";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co';
  
  if (!isConfigured) {
    return <WelcomePage />;
  }
  
  return <FeedPage />;
}

function WelcomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-2xl mx-auto p-8">
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-4xl">🚀</span>
            </div>
            <h1 className="text-4xl font-bold">Welcome to PolyThreads!</h1>
            <p className="text-xl text-foreground/60">
              Your Web3 social platform is almost ready
            </p>
          </div>

          <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-500 mb-2">Configuration Required</h3>
                <p className="text-sm text-foreground/60 mb-4">
                  To use PolyThreads, you need to configure your environment variables.
                </p>
                <Link 
                  href="/setup"
                  className="inline-block px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                  Start Setup
                </Link>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 border border-border rounded-xl">
              <h3 className="font-semibold mb-2">📚 Quick Start</h3>
              <p className="text-sm text-foreground/60 mb-3">
                Get running in 5 minutes
              </p>
              <a 
                href="/QUICKSTART.md" 
                className="text-sm text-primary hover:underline"
              >
                Read Guide →
              </a>
            </div>

            <div className="p-6 border border-border rounded-xl">
              <h3 className="font-semibold mb-2">🔧 Full Setup</h3>
              <p className="text-sm text-foreground/60 mb-3">
                Complete configuration guide
              </p>
              <a 
                href="/SETUP.md" 
                className="text-sm text-primary hover:underline"
              >
                Read Guide →
              </a>
            </div>

            <div className="p-6 border border-border rounded-xl">
              <h3 className="font-semibold mb-2">🚨 Immediate Fix</h3>
              <p className="text-sm text-foreground/60 mb-3">
                Fix white page issues
              </p>
              <a 
                href="/IMMEDIATE-FIX.md" 
                className="text-sm text-primary hover:underline"
              >
                Read Guide →
              </a>
            </div>

            <div className="p-6 border border-border rounded-xl">
              <h3 className="font-semibold mb-2">🐛 Troubleshooting</h3>
              <p className="text-sm text-foreground/60 mb-3">
                Common issues & solutions
              </p>
              <a 
                href="/TROUBLESHOOTING.md" 
                className="text-sm text-primary hover:underline"
              >
                Read Guide →
              </a>
            </div>
          </div>

          <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl">
            <h3 className="font-semibold mb-3">What You Need:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <span className="text-primary">✓</span>
                <span>Supabase account (free) - Database</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary">✓</span>
                <span>Pinata account (free) - IPFS storage</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary">✓</span>
                <span>Test MATIC (free) - Blockchain transactions</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-primary">✓</span>
                <span>WalletConnect Project ID (free)</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

function FeedPage() {
  const [posts, setPosts] = useState<(Post & { users?: User })[]>([]);
  const [loading, setLoading] = useState(true);
  const [likesData, setLikesData] = useState<Record<string, { count: number; isLiked: boolean }>>({});
  const { address } = useAccount();

  useEffect(() => {
    fetchPosts();
  }, [address]);

  async function fetchPosts() {
    try {
      setLoading(true);
      
      // Fetch posts with user data
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select(`
          *,
          users (*)
        `)
        .is("parent_post_id", null)
        .order("created_at", { ascending: false })
        .limit(50);

      if (postsError) throw postsError;

      setPosts(postsData || []);

      // Fetch likes data
      if (postsData) {
        const likesMap: Record<string, { count: number; isLiked: boolean }> = {};
        
        for (const post of postsData) {
          const { count } = await supabase
            .from("likes")
            .select("*", { count: "exact", head: true })
            .eq("post_id", post.id);

          let isLiked = false;
          if (address) {
            const { data: likeData } = await supabase
              .from("likes")
              .select("id")
              .eq("post_id", post.id)
              .eq("wallet", address.toLowerCase())
              .single();
            
            isLiked = !!likeData;
          }

          likesMap[post.id] = { count: count || 0, isLiked };
        }

        setLikesData(likesMap);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(postId: string) {
    if (!address) {
      alert("Please connect your wallet to like posts");
      return;
    }

    try {
      const isCurrentlyLiked = likesData[postId]?.isLiked;

      if (isCurrentlyLiked) {
        // Unlike
        await supabase
          .from("likes")
          .delete()
          .eq("post_id", postId)
          .eq("wallet", address.toLowerCase());

        setLikesData(prev => ({
          ...prev,
          [postId]: {
            count: Math.max(0, (prev[postId]?.count || 0) - 1),
            isLiked: false
          }
        }));
      } else {
        // Like
        await supabase
          .from("likes")
          .insert({
            post_id: postId,
            wallet: address.toLowerCase()
          });

        setLikesData(prev => ({
          ...prev,
          [postId]: {
            count: (prev[postId]?.count || 0) + 1,
            isLiked: true
          }
        }));
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-2xl mx-auto">
        <div className="border-x border-border min-h-screen">
          <div className="border-b border-border p-4">
            <h1 className="text-xl font-bold">Home</h1>
          </div>

          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center p-8 text-foreground/60">
              <p>No posts yet. Be the first to create one!</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={handleLike}
                likesCount={likesData[post.id]?.count || 0}
                isLiked={likesData[post.id]?.isLiked || false}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
