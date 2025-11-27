"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Home, PenSquare, User, Wallet } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-2xl mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="font-bold text-xl">PolyThreads</span>
        </Link>

        <nav className="flex items-center space-x-4 md:space-x-6">
          <Link href="/" className="hover:text-primary transition-colors" title="Home">
            <Home className="w-5 h-5" />
          </Link>
          <Link href="/create" className="hover:text-primary transition-colors" title="Create Post">
            <PenSquare className="w-5 h-5" />
          </Link>
          <Link href="/wallet" className="hover:text-primary transition-colors" title="Wallet">
            <Wallet className="w-5 h-5" />
          </Link>
          <ConnectButton />
        </nav>
      </div>
    </header>
  );
}
