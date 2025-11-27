"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase, User, Post } from "@/lib/supabase";
import { PostCard } from "@/components/PostCard";
import { Header } from "@/components/Header";
import { useAccount, useReadContract } from "wagmi";
import { POLYTOKEN_ABI, POLYTOKEN_ADDRESS } from "@/lib/contracts";
import { shortenAddress } from "@/lib/utils";
import { Loader2, Shield, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function ProfilePage() {
  const params = useParams();
  const wallet = (params.wallet as string).toLowerCase();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<(Post & { users?: User })[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });
  const { address } = useAccount();

  // Fetch token balance
  const { data: tokenBalance } = useReadContract({
    address: POLYTOKEN_ADDRESS,
    abi: POLYTOKEN_ABI,
    functionName: "balanceOf",
    args: [wallet as `0x${string}`],
  });

  useEffect(() => {
    fetchProfile();
  }, [wallet, address]);

  async function fetchProfile() {
    try {
      setLoading(true);

      // Fetch user
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("wallet", wallet)
        .single();

      if (userError && userError.code !== "PGRST116") throw userError;
      setUser(userData);

      // Fetch user's posts
      const { data: postsData, error: postsError } = await supabase
        .from("posts")
        .select(`
          *,
          users (*)
        `)
        .eq("wallet", wallet)
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;
      setPosts(postsData || []);

      // Fetch stats
      const { count: postCount } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("wallet", wallet);

      const { count: followerCount } = await supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("following_wallet", wallet);

      const { count: followingCount } = await supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("follower_wallet", wallet);

      setStats({
        posts: postCount || 0,
        followers: followerCount || 0,
        following: followingCount || 0,
      });

      // Check if current user follows this profile
      if (address && address.toLowerCase() !== wallet) {
        const { data: followData } = await supabase
          .from("follows")
          .select("id")
          .eq("follower_wallet", address.toLowerCase())
          .eq("following_wallet", wallet)
          .single();

        setIsFollowing(!!followData);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleFollow() {
    if (!address) {
      alert("Please connect your wallet");
      return;
    }

    if (address.toLowerCase() === wallet) {
      alert("You cannot follow yourself");
      return;
    }

    try {
      if (isFollowing) {
        // Unfollow
        await supabase
          .from("follows")
          .delete()
          .eq("follower_wallet", address.toLowerCase())
          .eq("following_wallet", wallet);

        setIsFollowing(false);
        setStats(prev => ({ ...prev, followers: Math.max(0, prev.followers - 1) }));
      } else {
        // Follow
        await supabase
          .from("follows")
          .insert({
            follower_wallet: address.toLowerCase(),
            following_wallet: wallet,
          });

        setIsFollowing(true);
        setStats(prev => ({ ...prev, followers: prev.followers + 1 }));
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
      alert("Failed to update follow status");
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

  const displayName = user?.username || shortenAddress(wallet);
  const formattedBalance = tokenBalance ? (Number(tokenBalance) / 1e18).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container max-w-2xl mx-auto">
        <div className="border-x border-border min-h-screen">
          {/* Profile Header */}
          <div className="border-b border-border">
            <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/40"></div>
            
            <div className="px-4 pb-4">
              <div className="flex justify-between items-start -mt-12 mb-4">
                <div className="w-24 h-24 rounded-full bg-background border-4 border-background flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary">
                    {displayName[0].toUpperCase()}
                  </span>
                </div>

                {address && address.toLowerCase() !== wallet && (
                  <button
                    onClick={handleFollow}
                    className={`mt-14 px-6 py-2 rounded-full font-semibold transition-colors ${
                      isFollowing
                        ? "bg-transparent border border-border hover:bg-red-500/10 hover:border-red-500 hover:text-red-500"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <h1 className="text-2xl font-bold flex items-center space-x-2">
                    <span>{displayName}</span>
                    {posts.some(p => p.blockchain_post_id) && (
                      <Shield className="w-5 h-5 text-primary" title="Verified on blockchain" />
                    )}
                  </h1>
                  <p className="text-foreground/60">{shortenAddress(wallet)}</p>
                </div>

                {user?.bio && (
                  <p className="text-foreground">{user.bio}</p>
                )}

                <div className="flex items-center space-x-4 text-sm text-foreground/60">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Joined {user?.created_at ? formatDistanceToNow(new Date(user.created_at), { addSuffix: true }) : "recently"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div>
                    <span className="font-bold">{stats.posts}</span>
                    <span className="text-foreground/60 ml-1">Posts</span>
                  </div>
                  <div>
                    <span className="font-bold">{stats.followers}</span>
                    <span className="text-foreground/60 ml-1">Followers</span>
                  </div>
                  <div>
                    <span className="font-bold">{stats.following}</span>
                    <span className="text-foreground/60 ml-1">Following</span>
                  </div>
                </div>

                <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="text-sm text-foreground/60">PTT Token Balance</div>
                  <div className="text-2xl font-bold text-primary">{formattedBalance} PTT</div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts */}
          <div>
            {posts.length === 0 ? (
              <div className="text-center p-8 text-foreground/60">
                <p>No posts yet</p>
              </div>
            ) : (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
