import Link from "next/link";
import { SMS_CONSENT_COPY } from "@/lib/sms";

const linkClass = "underline underline-offset-2 hover:text-ink";

/** The text-consent checkbox wording, with the Terms and Privacy links reviewers expect beside it. */
export function SmsConsentText() {
  return (
    <>
      {SMS_CONSENT_COPY} See our{" "}
      <Link href="/terms" target="_blank" rel="noopener" className={linkClass}>
        Terms
      </Link>{" "}
      and{" "}
      <Link href="/privacy" target="_blank" rel="noopener" className={linkClass}>
        Privacy Policy
      </Link>
      .
    </>
  );
}
