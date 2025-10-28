import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  const message =
    'Missing Supabase credentials. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your env file.';

  if (import.meta.env.DEV) {
    console.error(message);
  }

  throw new Error(message);
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
