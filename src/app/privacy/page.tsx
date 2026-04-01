import Footer from "@/components/Footer";
import Link from "next/link";

const PRIVACY_SECTIONS = [
  {
    title: "Information We Collect",
    body:
      "We collect the information you provide directly to JM-Qafri through forms, account registration, applications, document uploads, and direct correspondence. We may also collect technical information needed to operate the platform securely.",
  },
  {
    title: "How We Use Information",
    body:
      "We use your information to operate the website and platform, review inquiries and registrations, provide services, communicate with you, maintain security, and comply with legal and regulatory obligations.",
  },
  {
    title: "Sharing and Storage",
    body:
      "Information may be shared with trusted service providers, platform partners, or legal authorities where necessary to deliver services, maintain compliance, or protect the integrity of the JM-Qafri platform. Data is stored and processed using secure infrastructure appropriate to the service being delivered.",
  },
  {
    title: "Your Choices",
    body:
      "You may contact JM-Qafri to update account information, request access to information we hold about you, or ask questions about how your information is handled.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-teal-50 text-slate-900">
      <section className="border-b border-slate-200 px-6 md:px-[var(--pad-x)] pt-[calc(clamp(64px,8vh,72px)+clamp(48px,7vw,88px))] pb-[clamp(48px,7vw,88px)]">
        <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.24em] text-slate-500">
          Legal
        </p>
        <h1 className="font-serif text-[clamp(2.8rem,7vw,6rem)] font-light tracking-[-0.04em] leading-[1.02]">
          Privacy <em style={{ color: "var(--accent)" }}>Policy</em>
        </h1>
        <p className="mt-6 max-w-3xl font-sans text-[clamp(14px,1.4vw,17px)] font-light leading-[1.9] text-slate-600">
          This page outlines, at a high level, how JM-Qafri handles personal information
          collected through the website and platform experience.
        </p>
      </section>

      <section className="border-b border-slate-200 px-6 md:px-[var(--pad-x)] py-[var(--section-y)]">
        <div className="grid gap-6">
          {PRIVACY_SECTIONS.map((section) => (
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
          Questions about this policy can be directed through the{" "}
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
