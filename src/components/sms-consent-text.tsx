import { SMS_CONSENT_COPY } from "@/lib/sms";
import { siteConfig } from "@/lib/site-config";

const linkClass = "underline underline-offset-2 hover:text-ink";

// Absolute links: client-branded portals redirect /terms and /privacy to sign-in.

/** The text-consent checkbox wording, with the Terms and Privacy links reviewers expect beside it. */
export function SmsConsentText() {
  return (
    <>
      {SMS_CONSENT_COPY} See our{" "}
      <a href={`${siteConfig.url}/terms`} target="_blank" rel="noopener" className={linkClass}>
        Terms
      </a>{" "}
      and{" "}
      <a href={`${siteConfig.url}/privacy`} target="_blank" rel="noopener" className={linkClass}>
        Privacy Policy
      </a>
      .
    </>
  );
}
