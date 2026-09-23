import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { PageHero } from "@/components/PageHero";
import { PhotoFrame } from "@/components/PhotoFrame";
import { photos } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from Omorewa Yomi Godwin's classroom, the Pacesetter Tutorial centre in Ekpan, and online lessons.",
  alternates: { canonical: "/gallery" },
};

export const dynamic = "force-dynamic";

function uploadedPhotographs() {
  const directory = path.join(process.cwd(), "public", "gallery");
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, "en"));
}

export default function GalleryPage() {
  const uploads = uploadedPhotographs();

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="The classroom, in photographs."
        lede="Pictures from lessons at the Ekpan centre and from classes taught online. New photographs appear here when they are added to the site."
      />
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        {uploads.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {uploads.map((file) => (
              <figure key={file} className="overflow-hidden rounded-3xl bg-white">
                <img
                  src={`/gallery/${file}`}
                  alt="Photograph from Pacesetter Tutorial"
                  className="aspect-[4/5] w-full object-cover"
                />
              </figure>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {photos.map((photo) => (
              <PhotoFrame key={photo.kind} {...photo} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
