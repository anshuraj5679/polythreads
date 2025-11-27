import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase environment variables are not set. Please configure .env file.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Database types
export interface User {
  id: string;
  wallet: string;
  username?: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
}

export interface Post {
  id: string;
  wallet: string;
  text: string;
  ipfs_url?: string;
  blockchain_post_id?: number;
  parent_post_id?: string;
  created_at: string;
  users?: User;
}

export interface Like {
  id: string;
  post_id: string;
  wallet: string;
  created_at: string;
}

export interface Follow {
  id: string;
  follower_wallet: string;
  following_wallet: string;
  created_at: string;
}
