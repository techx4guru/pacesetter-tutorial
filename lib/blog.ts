import { getSupabase } from "@/lib/supabase";

export type BlogPost = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  reading_minutes: number;
  published_at: string;
};

const columns =
  "title, slug, excerpt, content, category, author, reading_minutes, published_at";

export async function listPosts(category?: string) {
  const supabase = getSupabase();
  let query = supabase
    .from("blog_posts")
    .select(columns)
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return (data ?? []) as BlogPost[];
}

export async function getPost(slug: string) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("blog_posts")
    .select(columns)
    .eq("published", true)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as BlogPost | null;
}
