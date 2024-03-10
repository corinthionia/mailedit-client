import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_API_PATH || '',
  import.meta.env.VITE_PUBLIC_ANON_KEY || ''
);
