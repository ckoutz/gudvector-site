import { BookCallButton } from "@/components/cta-button";
import { Container } from "@/components/section";
import { siteConfig } from "@/lib/site-config";

export function CtaBand({
  title = "See what this looks like for your business.",
  body = "One short call. No pitch deck.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-line bg-peach-2">
      <Container className="py-20 text-center sm:py-28">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-[-0.025em] text-ink sm:text-5xl sm:leading-[1.08]">
          {title}
        </h2>
        <p className="mt-4 text-[18px] text-muted">{body}</p>
        <div className="mt-10 flex flex-col items-center gap-4">
          <BookCallButton size="lg" />
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-[15px] text-muted underline decoration-line underline-offset-4 hover:text-ink"
          >
            or email {siteConfig.email}
          </a>
        </div>
      </Container>
    </section>
  );
}
