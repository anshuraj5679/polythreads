"use client";

import { Header } from "@/components/Header";
import { useAccount, useReadContract, useBalance } from "wagmi";
import { POLYTOKEN_ABI, POLYTOKEN_ADDRESS, POLYTHREADS_ABI, POLYTHREADS_ADDRESS } from "@/lib/contracts";
import { shortenAddress } from "@/lib/utils";
import { Wallet, Coins, FileText, ExternalLink } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function WalletPage() {
  const { address, isConnected } = useAccount();

  // Fetch MATIC balance
  const { data: maticBalance } = useBalance({
    address: address,
  });

  // Fetch PTT token balance
  const { data: tokenBalance } = useReadContract({
    address: POLYTOKEN_ADDRESS,
    abi: POLYTOKEN_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  });

  // Fetch total posts on blockchain
  const { data: postCount } = useReadContract({
    address: POLYTHREADS_ADDRESS,
    abi: POLYTHREADS_ABI,
    functionName: "postCount",
  });

  const formattedTokenBalance = tokenBalance ? (Number(tokenBalance) / 1e18).toFixed(2) : "0.00";
  const formattedMaticBalance = maticBalance ? parseFloat(maticBalance.formatted).toFixed(4) : "0.0000";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container max-w-2xl mx-auto">
        <div className="border-x border-border min-h-screen">
          <div className="border-b border-border p-4">
            <h1 className="text-xl font-bold">Wallet</h1>
          </div>

          {!isConnected ? (
            <div className="flex flex-col items-center justify-center p-12 space-y-6">
              <Wallet className="w-16 h-16 text-foreground/40" />
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold">Connect Your Wallet</h2>
                <p className="text-foreground/60">
                  Connect your wallet to view your balance and interact with PolyThreads
                </p>
              </div>
              <ConnectButton />
            </div>
          ) : (
            <div className="p-4 space-y-6">
              {/* Wallet Address */}
              <div className="p-6 bg-gradient-to-r from-primary/20 to-primary/40 rounded-2xl border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-foreground/60 mb-1">Wallet Address</div>
                    <div className="font-mono text-lg font-semibold">{shortenAddress(address)}</div>
                  </div>
                  <a
                    href={`https://amoy.polygonscan.com/address/${address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-primary/20 rounded-full transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Balances */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* MATIC Balance */}
                <div className="p-6 border border-border rounded-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Coins className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-sm text-foreground/60">MATIC Balance</div>
                      <div className="text-2xl font-bold">{formattedMaticBalance}</div>
                    </div>
                  </div>
                  <div className="text-xs text-foreground/60">
                    Polygon Amoy Testnet
                  </div>
                </div>

                {/* PTT Token Balance */}
                <div className="p-6 border border-border rounded-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Coins className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-foreground/60">PTT Balance</div>
                      <div className="text-2xl font-bold">{formattedTokenBalance}</div>
                    </div>
                  </div>
                  <div className="text-xs text-foreground/60">
                    PolyThreads Token
                  </div>
                </div>
              </div>

              {/* Contract Info */}
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">Smart Contracts</h2>
                
                <div className="p-4 border border-border rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-foreground/60" />
                      <span className="text-sm font-medium">PolyThreads</span>
                    </div>
                    <a
                      href={`https://amoy.polygonscan.com/address/${POLYTHREADS_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center space-x-1"
                    >
                      <span>{shortenAddress(POLYTHREADS_ADDRESS)}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="text-xs text-foreground/60">
                    Total Posts: {postCount?.toString() || "0"}
                  </div>
                </div>

                <div className="p-4 border border-border rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-foreground/60" />
                      <span className="text-sm font-medium">PolyToken (PTT)</span>
                    </div>
                    <a
                      href={`https://amoy.polygonscan.com/address/${POLYTOKEN_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center space-x-1"
                    >
                      <span>{shortenAddress(POLYTOKEN_ADDRESS)}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Rewards Info */}
              <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
                <h3 className="font-semibold mb-3">Earn PTT Tokens</h3>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Create a post: <strong>5 PTT</strong></span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span>Receive a like: <strong>1 PTT</strong></span>
                  </li>
                </ul>
              </div>

              {/* Get Test MATIC */}
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <div className="text-sm font-medium mb-2">Need Test MATIC?</div>
                <p className="text-xs text-foreground/60 mb-3">
                  Get free test MATIC from the Polygon Amoy faucet to pay for gas fees
                </p>
                <a
                  href="https://faucet.polygon.technology/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-sm text-primary hover:underline"
                >
                  <span>Visit Polygon Faucet</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
