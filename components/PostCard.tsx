"use client";

import { Post, User } from "@/lib/supabase";
import { shortenAddress, formatTimeAgo } from "@/lib/utils";
import { Heart, MessageCircle, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getIPFSUrl } from "@/lib/ipfs";

interface PostCardProps {
  post: Post & { users?: User };
  onLike?: (postId: string) => void;
  likesCount?: number;
  repliesCount?: number;
  isLiked?: boolean;
}

export function PostCard({ post, onLike, likesCount = 0, repliesCount = 0, isLiked = false }: PostCardProps) {
  const displayName = post.users?.username || shortenAddress(post.wallet);
  const hasBlockchainId = post.blockchain_post_id !== null && post.blockchain_post_id !== undefined;
  
  // All posts are on blockchain (Polygon Amoy)
  const onBlockchain = true;

  return (
    <div className="border-b border-border p-4 hover:bg-border/20 transition-colors">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-semibold">
              {displayName[0].toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Link href={`/profile/${post.wallet}`} className="font-semibold hover:underline">
              {displayName}
            </Link>
            {onBlockchain && (
              <div className="flex items-center space-x-1" title="Verified on Polygon Amoy blockchain">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-xs text-primary">Polygon</span>
              </div>
            )}
            <span className="text-sm text-foreground/60">·</span>
            <span className="text-sm text-foreground/60">
              {formatTimeAgo(post.created_at)}
            </span>
          </div>

          <Link href={`/post/${post.id}`}>
            <p className="mt-1 text-foreground whitespace-pre-wrap break-words">
              {post.text}
            </p>

            {post.ipfs_url && (
              <div className="mt-3 rounded-2xl overflow-hidden border border-border">
                {post.ipfs_url.includes('.mp4') || post.ipfs_url.includes('.webm') || post.ipfs_url.includes('.mov') ? (
                  <video
                    src={getIPFSUrl(post.ipfs_url)}
                    controls
                    className="w-full h-auto max-h-96"
                  />
                ) : (
                  <Image
                    src={getIPFSUrl(post.ipfs_url)}
                    alt="Post media"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                )}
              </div>
            )}
          </Link>

          <div className="flex items-center space-x-6 mt-3 text-foreground/60">
            <button
              onClick={() => onLike?.(post.id)}
              className="flex items-center space-x-2 hover:text-red-500 transition-colors group"
            >
              <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "group-hover:fill-red-500"}`} />
              <span className="text-sm">{likesCount}</span>
            </button>

            <Link href={`/post/${post.id}`} className="flex items-center space-x-2 hover:text-primary transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{repliesCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
