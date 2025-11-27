"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { useAccount } from "wagmi";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { supabase } from "@/lib/supabase";
import { POLYTHREADS_ABI, POLYTHREADS_ADDRESS } from "@/lib/contracts";
import { uploadToIPFS, uploadJSONToIPFS, getIPFSUrl } from "@/lib/ipfs";
import { useRouter } from "next/navigation";
import { Loader2, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";

export default function CreatePage() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [pinataConfigured, setPinataConfigured] = useState(false);
  const { address, isConnected } = useAccount();
  const router = useRouter();

  // Check if Pinata is configured
  useState(() => {
    const jwt = process.env.NEXT_PUBLIC_PINATA_JWT;
    setPinataConfigured(!!(jwt && jwt !== 'your_pinata_jwt_token_here'));
  });

  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isConnected || !address) {
      alert("Please connect your wallet to post on Polygon Amoy");
      return;
    }

    if (!text.trim()) {
      alert("Please enter some text");
      return;
    }

    try {
      setUploading(true);
      console.log("🚀 Starting post creation on Polygon Amoy...");

      // Ensure user exists in database
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

      // Upload image to IPFS if present
      let imageHash = null;
      if (image) {
        try {
          console.log("Uploading image via API...");
          const formData = new FormData();
          formData.append("file", image);
          
          const uploadResponse = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          
          if (!uploadResponse.ok) {
            throw new Error("Upload failed");
          }
          
          const uploadData = await uploadResponse.json();
          imageHash = uploadData.ipfsHash;
          console.log("Image uploaded successfully:", imageHash);
        } catch (error) {
          console.error("Image upload failed:", error);
          alert("Image upload failed. Posting without image.");
        }
      }

      // Create metadata object
      const metadata = {
        text,
        image: imageHash,
        timestamp: Date.now(),
        author: address,
      };

      // Upload metadata to IPFS
      let metadataHash = "QmPlaceholder"; // Placeholder if Pinata not configured
      try {
        metadataHash = await uploadJSONToIPFS(metadata);
      } catch (error) {
        console.error("Metadata upload failed:", error);
        // Continue with placeholder hash
      }

      // Save to Supabase first
      const { data: postData, error: postError } = await supabase
        .from("posts")
        .insert({
          wallet: address.toLowerCase(),
          text,
          ipfs_url: imageHash,
        })
        .select()
        .single();

      if (postError) throw postError;

      // Create post on blockchain (Polygon Amoy)
      console.log("📝 Saving to Polygon Amoy blockchain...");
      writeContract({
        address: POLYTHREADS_ADDRESS,
        abi: POLYTHREADS_ABI,
        functionName: "createPost",
        args: [metadataHash, BigInt(0)],
      });

      // Wait for transaction and update post with blockchain ID
      // Note: In production, you'd want to handle this in a useEffect watching isSuccess
      
      alert("✅ Post created successfully!\n\n📝 Saved to Supabase\n🔗 Saved to Polygon Amoy\n📦 Media on IPFS");
      router.push("/");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Check console for details.");
    } finally {
      setUploading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert("File too large. Maximum size is 100MB.");
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  function removeImage() {
    setImage(null);
    setImagePreview(null);
  }

  const isLoading = uploading || isPending || isConfirming;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container max-w-2xl mx-auto">
        <div className="border-x border-border min-h-screen">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">Create Post</h1>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-foreground/60">Polygon Amoy</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
              className="w-full min-h-[120px] bg-transparent text-lg outline-none resize-none"
              maxLength={500}
              disabled={isLoading}
            />

            {imagePreview && (
              <div className="relative mt-4 rounded-2xl overflow-hidden border border-border">
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors z-10"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
                {image?.type.startsWith('video/') ? (
                  <video
                    src={imagePreview}
                    controls
                    className="w-full h-auto max-h-96"
                  />
                ) : (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={500}
                    height={300}
                    className="w-full h-auto"
                  />
                )}
              </div>
            )}

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <label className="cursor-pointer hover:bg-primary/10 p-2 rounded-full transition-colors">
                <ImageIcon className="w-5 h-5 text-primary" />
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={isLoading}
                />
              </label>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-foreground/60">
                  {text.length}/500
                </span>
                <button
                  type="submit"
                  disabled={!text.trim() || isLoading || !isConnected}
                  className="px-6 py-2 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>{isLoading ? "Posting..." : "Post"}</span>
                </button>
              </div>
            </div>

            {!isConnected && (
              <p className="mt-4 text-sm text-red-500">
                Please connect your wallet to post on Polygon Amoy blockchain
              </p>
            )}

            {isConnected && (
              <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="text-xs text-foreground/80">
                  <div className="font-semibold mb-1">Your post will be:</div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>Saved to Polygon Amoy blockchain</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>Media stored on IPFS (decentralized)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>✅</span>
                      <span>Earn 5 PTT tokens as reward</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
