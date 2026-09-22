import { site, whatsappLink, whatsappMessages } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(whatsappMessages.consultation)}
      className="fixed right-4 bottom-4 z-30 inline-flex items-center gap-2 rounded-full bg-emerald px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-12px_rgba(15,157,88,0.9)] transition hover:-translate-y-0.5 hover:bg-emerald-deep md:right-6 md:bottom-6"
      aria-label="Chat with Pacesetter Tutorial on WhatsApp"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className="shrink-0">
        <path d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l5.9-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.5.7.7-3.4-.2-.3A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8 8 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.4-.8-1.9s-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1.1 2.7 11.5 11.5 0 0 0 4.4 3.9c.6.2 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3Z" />
      </svg>
      <span className="max-sm:sr-only">WhatsApp</span>
    </a>
  );
}
