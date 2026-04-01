import Footer from "@/components/Footer";
import Link from "next/link";

const TERMS_SECTIONS = [
  {
    title: "Use of the Site",
    body:
      "By using the JM-Qafri website and related platform pages, you agree to use the service lawfully and only for legitimate business, informational, or application purposes.",
  },
  {
    title: "No Investment Advice",
    body:
      "Unless explicitly stated otherwise in a signed engagement, information presented on the site is general in nature and should not be treated as personal investment, legal, or tax advice.",
  },
  {
    title: "Applications and Accounts",
    body:
      "Platform registration, applications, and access requests may be reviewed, limited, or declined at JM-Qafri’s discretion in order to protect service quality, compliance, and platform security.",
  },
  {
    title: "Content and Intellectual Property",
    body:
      "Unless otherwise indicated, site content, research, branding, and published materials remain the property of JM-Qafri or its licensors and may not be reproduced without permission.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-teal-50 text-slate-900">
      <section className="border-b border-slate-200 px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)]">
        <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.24em] text-slate-500">
          Legal
        </p>
        <h1 className="font-serif text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.02]">
          Terms of <em style={{ color: "var(--accent)" }}>Service</em>
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-slate-600">
          These terms set the baseline rules for accessing and using the JM-Qafri site and
          related platform experiences.
        </p>
      </section>

      <section className="border-b border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)]">
        <div className="grid gap-6">
          {TERMS_SECTIONS.map((section) => (
            <div key={section.title} className="border border-slate-200 bg-white p-8">
              <h2 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] font-light tracking-[-0.02em]">
                {section.title}
              </h2>
              <p className="mt-4 max-w-4xl font-sans text-[14px] font-light leading-[1.9] text-slate-600">
                {section.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 font-sans text-[14px] font-light leading-[1.9] text-slate-600">
          For questions about these terms, please use the{" "}
          <Link href="/contact" className="text-[var(--accent)] hover:underline">
            contact page
          </Link>
          .
        </p>
      </section>

      <Footer />
    </div>
  );
}
