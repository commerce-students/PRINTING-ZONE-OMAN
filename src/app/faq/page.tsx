import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { faqs } from "@/data/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frequently asked questions about ordering print",
  description:
    "How quotations work at Printing Zone Oman, artwork requirements, upload limits, production and collection, and what is still pending confirmation.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    ),
  };

  return (
    <>
      <section className="border-b border-line bg-paper-100">
        <div className="container-page py-10 md:py-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
          <p className="eyebrow mt-5">Help centre</p>
          <h1 className="display-lg mt-4">Questions, answered honestly</h1>
          <p className="lede mt-4">
            Where an answer depends on something the company has not confirmed yet — opening hours,
            lead times, payment methods — it says so instead of guessing.
          </p>
        </div>
      </section>

      <section className="section pt-10">
        <div className="container-page max-w-4xl">
          <FaqAccordion groups={faqs} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...faqJsonLd, url: `${site.url}/faq` }) }}
      />
    </>
  );
}
