import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database schema for reference:
// 
// Table: waitlist_subscribers
// - id: uuid (primary key)
// - name: text
// - email: text (unique)
// - whatsapp: text (nullable)
// - created_at: timestamp
//
// Table: poll_votes  
// - id: uuid (primary key)
// - option_id: text
// - created_at: timestamp
//
// SQL to create tables:
/*
-- Create waitlist_subscribers table
CREATE TABLE waitlist_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  whatsapp TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create poll_votes table
CREATE TABLE poll_votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  option_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public insert" ON waitlist_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select" ON poll_votes FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON poll_votes FOR INSERT WITH CHECK (true);
*/
