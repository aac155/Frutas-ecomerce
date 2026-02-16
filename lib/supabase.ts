import { createClient } from '@supabase/supabase-js';

// Configuration for Supabase
// To enable:
// 1. Install supabase-js: npm install @supabase/supabase-js
// 2. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local
// 3. Uncomment the lines below

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// export const supabase = createClient(supabaseUrl, supabaseKey);

export const supabase = null; // Placeholder

/* Example Usage:
   const { data, error } = await supabase
     .from('products')
     .select('*')
*/
