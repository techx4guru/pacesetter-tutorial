import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { CheatSheetButton } from "@/components/LeadMagnet";
import { getPost, listPosts } from "@/lib/blog";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Note not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/resources/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/resources/${post.slug}`,
      publishedTime: post.published_at,
      authors: [post.author],
    },
  };
}

export default async function ResourceArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = (await listPosts(post.category)).filter((item) => item.slug !== post.slug).slice(0, 3);
  const published = new Date(post.published_at).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.published_at,
    author: { "@type": "Person", name: post.author },
    description: post.excerpt,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <article className="bg-paper">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="bg-navy text-white">
        <div className="mx-auto max-w-3xl px-5 pt-32 pb-14 md:px-8 md:pt-40">
          <p className="text-xs font-semibold tracking-[0.18em] text-gold uppercase">{post.category}</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">{post.title}</h1>
          <p className="mt-5 text-white/75">
            {published} · {post.reading_minutes} min read · {post.author}
          </p>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:px-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="max-w-3xl">
          <ArticleBody content={post.content} />
          <Link href="/resources" className="btn-line mt-10">
            All insights
          </Link>
          {related.length > 0 ? (
            <div className="mt-12 border-t border-line pt-8">
              <h2 className="font-serif text-2xl text-navy">More in {post.category}</h2>
              <ul className="mt-4 space-y-3">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link className="text-emerald underline-offset-4 hover:underline" href={`/resources/${item.slug}`}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <aside className="h-fit space-y-4 lg:sticky lg:top-28">
          <div className="rounded-3xl bg-emerald p-5 text-white">
            <p className="font-serif text-2xl">Keep the formulas beside you</p>
            <p className="mt-2 text-sm leading-6 text-white/90">{site.cheatSheetTitle}</p>
            <CheatSheetButton className="btn-gold mt-4 w-full">Download the sheet</CheatSheetButton>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <p className="font-serif text-2xl text-navy">Bring this question to class</p>
            <a className="btn-navy mt-4 w-full" href={whatsappLink(whatsappMessages.consultation)}>
              Book on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}
