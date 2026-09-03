import { ContactSection } from "@/components/site/contact-section";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata() {
  return pageMetadata({
    title: "Contact | Güd Vector",
    description:
      "Email info@gudvector.com or use the form. Say whether you need a website, help with systems, or both.",
    path: "/contact",
  });
}

export default function ContactPage() {
  return (
    <main id="main">
      <ContactSection />
    </main>
  );
}
