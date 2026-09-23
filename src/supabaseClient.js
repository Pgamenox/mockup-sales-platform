import { createClient } from '@supabase/supabase-js';

// GitHub Pages does not inject Vite environment variables during a plain
// static build. These are publishable browser credentials (never a secret or
// service-role key), so the production fallback keeps Auth and the Data API on
// the same project while still allowing deployments to override both values.
const url=import.meta.env.VITE_SUPABASE_URL||'https://dsgyioqbatvwhxugumoa.supabase.co';
const key=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY||'sb_publishable_dAbY9OY5BO80M9V4rEuVtQ_FZJ3l1AH';
export const supabaseEnabled=Boolean(url&&key);
export const supabase=supabaseEnabled?createClient(url,key,{
 auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
}):null;
