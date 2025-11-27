"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function SetupPage() {
  const [checks, setChecks] = useState({
    supabase: false,
    pinata: false,
    contracts: false,
  });

  useEffect(() => {
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const pinataJwt = process.env.NEXT_PUBLIC_PINATA_JWT;
    const contractAddress = process.env.NEXT_PUBLIC_POLYTHREADS_CONTRACT;

    setChecks({
      supabase: !!(supabaseUrl && supabaseUrl !== 'https://your-project.supabase.co' && supabaseKey && supabaseKey !== 'your_supabase_anon_key_here'),
      pinata: !!(pinataJwt && pinataJwt !== 'your_pinata_jwt_token_here'),
      contracts: !!(contractAddress && contractAddress.length > 0),
    });
  }, []);

  const allConfigured = Object.values(checks).every(Boolean);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-2xl mx-auto p-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Setup Configuration</h1>
            <p className="text-foreground/60">
              Configure your environment variables to get started
            </p>
          </div>

          {allConfigured ? (
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <div>
                  <h3 className="font-semibold text-green-500">All Set!</h3>
                  <p className="text-sm text-foreground/60">Your environment is configured correctly.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-500" />
                <div>
                  <h3 className="font-semibold text-yellow-500">Configuration Required</h3>
                  <p className="text-sm text-foreground/60">Please configure the items below.</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <ConfigItem
              title="Supabase Database"
              description="Configure your Supabase URL and API keys"
              configured={checks.supabase}
              steps={[
                "Go to supabase.com and create a project",
                "Copy your Project URL and anon key from Settings → API",
                "Add them to .env file as NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
                "Run the SQL schema from supabase-schema.sql in SQL Editor",
              ]}
            />

            <ConfigItem
              title="Pinata (IPFS)"
              description="Configure IPFS storage for images"
              configured={checks.pinata}
              steps={[
                "Go to pinata.cloud and create an account",
                "Create an API key with pinning permissions",
                "Copy the JWT token",
                "Add it to .env file as NEXT_PUBLIC_PINATA_JWT",
              ]}
            />

            <ConfigItem
              title="Smart Contracts"
              description="Deploy contracts to Polygon Amoy"
              configured={checks.contracts}
              steps={[
                "Get test MATIC from faucet.polygon.technology",
                "Add your wallet private key to .env as PRIVATE_KEY",
                "Run: npm run compile",
                "Run: npm run deploy",
                "Copy contract addresses to .env",
              ]}
            />
          </div>

          <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl">
            <h3 className="font-semibold mb-3">Quick Start Commands</h3>
            <div className="space-y-2 font-mono text-sm">
              <div className="p-2 bg-background rounded">npm install</div>
              <div className="p-2 bg-background rounded">cd contracts && npm install && cd ..</div>
              <div className="p-2 bg-background rounded">npm run compile</div>
              <div className="p-2 bg-background rounded">npm run deploy</div>
              <div className="p-2 bg-background rounded">npm run dev</div>
            </div>
          </div>

          <div className="text-center text-sm text-foreground/60">
            <p>Need help? Check out <a href="/START-HERE.md" className="text-primary hover:underline">START-HERE.md</a> or <a href="/SETUP.md" className="text-primary hover:underline">SETUP.md</a></p>
          </div>
        </div>
      </main>
    </div>
  );
}

function ConfigItem({ 
  title, 
  description, 
  configured, 
  steps 
}: { 
  title: string; 
  description: string; 
  configured: boolean; 
  steps: string[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-border/20 transition-colors"
      >
        <div className="flex items-center space-x-3">
          {configured ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <div className="text-left">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-sm text-foreground/60">{description}</p>
          </div>
        </div>
        <span className="text-foreground/60">{expanded ? '−' : '+'}</span>
      </button>
      
      {expanded && (
        <div className="p-4 bg-border/10 border-t border-border">
          <ol className="space-y-2 text-sm">
            {steps.map((step, index) => (
              <li key={index} className="flex space-x-2">
                <span className="text-primary font-semibold">{index + 1}.</span>
                <span className="text-foreground/80">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
