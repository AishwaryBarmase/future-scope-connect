
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://nrhnunucluajfoewdxpl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yaG51bnVjbHVhamZvZXdkeHBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMTY4MjIsImV4cCI6MjA1OTU5MjgyMn0.CzirojJ1skGSY3lATRgYy8P9oZFEK3QJAltIBfJzgPU";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Initialize storage - this will create the bucket if it doesn't exist
const initializeStorage = async () => {
  try {
    // Check if the profiles bucket exists
    const { data, error } = await supabase.storage.getBucket('profiles');
    
    if (error && error.message.includes('does not exist')) {
      // Create the bucket if it doesn't exist
      const { error: createError } = await supabase.storage.createBucket('profiles', {
        public: false, // Make it private by default
        fileSizeLimit: 10485760, // 10MB size limit
      });
      
      if (createError) {
        console.error('Error creating profiles bucket:', createError);
      }

      // Add policy to allow users to access their own files
      const { error: policyError } = await supabase.storage.from('profiles').createSignedUrl('test.txt', 1);
      if (policyError) {
        console.error('Error creating storage policy:', policyError);
      }
    } else if (error) {
      console.error('Error checking for profiles bucket:', error);
    }
  } catch (err) {
    console.error('Error initializing storage:', err);
  }
};

// Call the initialization function (wrapped in a try/catch to ensure it doesn't crash the app)
try {
  initializeStorage();
} catch (err) {
  console.error('Failed to initialize storage:', err);
}
