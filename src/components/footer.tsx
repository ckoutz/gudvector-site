import Link from "next/link";
import { LogoMarkImage } from "@/components/logo";
import { OpenChatButton } from "@/components/chat-bubble";
import { footerNav, siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <LogoMarkImage className="h-10 w-auto" />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
              Websites and automation for local service businesses.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-3 inline-block text-[15px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-orange"
            >
              {siteConfig.email}
            </a>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading}>
              <h3 className="text-[13px] font-semibold text-ink">{group.heading}</h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-[15px] text-muted hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
                {group.heading === "Company" && (
                  <li>
                    <OpenChatButton className="text-[15px] text-muted hover:text-ink" />
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-16 border-t border-line pt-6 text-[13px] text-muted">
          © {new Date().getFullYear()} {siteConfig.legalName}
        </p>
      </div>
    </footer>
  );
}
