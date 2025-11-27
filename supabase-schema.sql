-- PolyThreads Supabase Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet TEXT NOT NULL,
    text TEXT NOT NULL,
    ipfs_url TEXT,
    blockchain_post_id BIGINT,
    parent_post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY (wallet) REFERENCES users(wallet) ON DELETE CASCADE
);

-- Likes table
CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    wallet TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, wallet)
);

-- Follows table
CREATE TABLE follows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_wallet TEXT NOT NULL,
    following_wallet TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(follower_wallet, following_wallet),
    FOREIGN KEY (follower_wallet) REFERENCES users(wallet) ON DELETE CASCADE,
    FOREIGN KEY (following_wallet) REFERENCES users(wallet) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_posts_wallet ON posts(wallet);
CREATE INDEX idx_posts_parent ON posts(parent_post_id);
CREATE INDEX idx_posts_blockchain_id ON posts(blockchain_post_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_wallet ON likes(wallet);
CREATE INDEX idx_follows_follower ON follows(follower_wallet);
CREATE INDEX idx_follows_following ON follows(following_wallet);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users are viewable by everyone" ON users
    FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON users
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own profile" ON users
    FOR UPDATE USING (wallet = current_setting('request.jwt.claims', true)::json->>'wallet');

-- Posts policies
CREATE POLICY "Posts are viewable by everyone" ON posts
    FOR SELECT USING (true);

CREATE POLICY "Users can create posts" ON posts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own posts" ON posts
    FOR UPDATE USING (wallet = current_setting('request.jwt.claims', true)::json->>'wallet');

CREATE POLICY "Users can delete their own posts" ON posts
    FOR DELETE USING (wallet = current_setting('request.jwt.claims', true)::json->>'wallet');

-- Likes policies
CREATE POLICY "Likes are viewable by everyone" ON likes
    FOR SELECT USING (true);

CREATE POLICY "Users can create likes" ON likes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can delete their own likes" ON likes
    FOR DELETE USING (wallet = current_setting('request.jwt.claims', true)::json->>'wallet');

-- Follows policies
CREATE POLICY "Follows are viewable by everyone" ON follows
    FOR SELECT USING (true);

CREATE POLICY "Users can create follows" ON follows
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can delete their own follows" ON follows
    FOR DELETE USING (follower_wallet = current_setting('request.jwt.claims', true)::json->>'wallet');

-- Functions for aggregated data

-- Get post with like count and reply count
CREATE OR REPLACE FUNCTION get_post_stats(post_uuid UUID)
RETURNS TABLE (
    like_count BIGINT,
    reply_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM likes WHERE post_id = post_uuid),
        (SELECT COUNT(*) FROM posts WHERE parent_post_id = post_uuid);
END;
$$ LANGUAGE plpgsql;

-- Get user stats
CREATE OR REPLACE FUNCTION get_user_stats(user_wallet TEXT)
RETURNS TABLE (
    post_count BIGINT,
    follower_count BIGINT,
    following_count BIGINT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        (SELECT COUNT(*) FROM posts WHERE wallet = user_wallet),
        (SELECT COUNT(*) FROM follows WHERE following_wallet = user_wallet),
        (SELECT COUNT(*) FROM follows WHERE follower_wallet = user_wallet);
END;
$$ LANGUAGE plpgsql;
