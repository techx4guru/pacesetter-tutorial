import type { ReactNode } from "react";

function inline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-navy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export function ArticleBody({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/);

  return (
    <div className="space-y-5 text-[1.05rem] leading-8 text-ink/90">
      {blocks.map((block, index) => {
        const lines = block.split("\n").map((line) => line.trim());
        if (lines[0]?.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="pt-4 font-serif text-3xl leading-tight text-navy"
            >
              {lines[0].replace(/^## /, "")}
            </h2>
          );
        }
        if (lines.every((line) => /^\d+\.\s/.test(line))) {
          return (
            <ol key={index} className="list-decimal space-y-2 pl-5">
              {lines.map((line) => (
                <li key={line}>{inline(line.replace(/^\d+\.\s/, ""))}</li>
              ))}
            </ol>
          );
        }
        if (lines.every((line) => line.startsWith("- "))) {
          return (
            <ul key={index} className="list-disc space-y-2 pl-5">
              {lines.map((line) => (
                <li key={line}>{inline(line.slice(2))}</li>
              ))}
            </ul>
          );
        }
        return <p key={index}>{inline(lines.join(" "))}</p>;
      })}
    </div>
  );
}
