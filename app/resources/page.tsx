import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CheatSheetButton } from "@/components/LeadMagnet";
import { blogCategories, site, whatsappLink, whatsappMessages } from "@/lib/site";
import { listPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Resources & Insights",
  description:
    "Exam tips, study guides, solved past questions, and STEM career notes from Omorewa Yomi Godwin of Pacesetter Tutorial.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources & Insights | Pacesetter Tutorial",
    description:
      "WAEC, NECO, and UTME study writing from the Pacesetter Tutorial classroom in Ekpan, Warri.",
    url: "/resources",
  },
};

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = blogCategories.find((item) => item === params.category);
  let posts: Awaited<ReturnType<typeof listPosts>> = [];
  let loadError = "";

  try {
    posts = await listPosts(category);
  } catch {
    loadError = "The library could not be reached just now. Refresh the page, or message the classroom on WhatsApp.";
  }

  return (
    <>
      <PageHero
        eyebrow="Resources & insights"
        title="Notes from the classroom, written so they can be used."
        lede="Exam tips, study maps, worked questions, and a straight account of what first-year engineering actually asks."
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1fr_280px]">
        <div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/resources"
              className={`rounded-full px-4 py-2 text-sm ${category ? "border border-line" : "bg-navy text-white"}`}
            >
              All
            </Link>
            {blogCategories.map((item) => (
              <Link
                key={item}
                href={`/resources?category=${encodeURIComponent(item)}`}
                className={`rounded-full px-4 py-2 text-sm ${
                  category === item ? "bg-emerald text-white" : "border border-line"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>

          {loadError ? <p className="mt-8 text-sm text-red-700">{loadError}</p> : null}

          <div className="mt-8 space-y-5">
            {posts.map((post) => (
              <article key={post.slug} className="card-lift rounded-3xl border border-line bg-white p-6">
                <p className="text-xs font-semibold tracking-[0.16em] text-emerald uppercase">{post.category}</p>
                <h2 className="mt-2 font-serif text-3xl text-navy">
                  <Link href={`/resources/${post.slug}`} className="hover:text-emerald">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-6 text-ink/75">{post.excerpt}</p>
                <p className="mt-4 text-xs text-ink/55">
                  {formatDate(post.published_at)} · {post.reading_minutes} min read · {post.author}
                </p>
              </article>
            ))}
            {!loadError && posts.length === 0 ? (
              <p className="text-sm text-ink/70">No notes in this category yet.</p>
            ) : null}
          </div>
        </div>
        <aside className="h-fit space-y-4 lg:sticky lg:top-28">
          <div className="rounded-3xl bg-navy p-5 text-white">
            <p className="font-serif text-2xl">Free formula sheet</p>
            <p className="mt-2 text-sm leading-6 text-white/75">{site.cheatSheetTitle}</p>
            <CheatSheetButton className="btn-gold mt-4 w-full">Unlock the PDF</CheatSheetButton>
          </div>
          <div className="rounded-3xl border border-line bg-white p-5">
            <p className="font-serif text-2xl text-navy">Talk to the tutor</p>
            <p className="mt-2 text-sm leading-6 text-ink/70">
              Bring the question the article did not finish for you.
            </p>
            <a className="btn-navy mt-4 w-full" href={whatsappLink(whatsappMessages.consultation)}>
              Book on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
