import Link from "next/link";
import { Button } from "./ui/button";
import type { SVGProps } from "react";

export default function Posts() {
  return (
    <section className="bg-slate-50 py-12 text-slate-900 md:py-16 lg:py-20">
      <div className="px-4 md:px-6">
        <div className="no-scrollbar my-10 flex gap-6 overflow-x-auto">
          <BlogCard
            title="Revolutionising Agriculture with Organic Solutions."
            href="/Invest/Agriculture"
          />
          <BlogCard
            title="Mobile clinics: For kenya, helping with diagnostics and early disease detection."
            href="/pharma/mobileclinic"
          />
          <BlogCard
            title="Agreement with International Agency for the Euroasian Trade and Economic Cooperation"
            href="/Invest/etec"
          />
          <BlogCard
            title="Introduction to AI in Medicine."
            href="/Invest/Medai"
          />
          <BlogCard
            title="Real estate: Investment and a home away from home."
            href="#"
          />
        </div>
        <div>
          <Link href="/blog">
            <Button>See All</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ title, href }: { title: string; href: string }) {
  return (
    <div className="min-w-[300px] space-y-2">
      <h3 className="text-3xl font-extralight">{title}</h3>

      <Link
        href={href}
        className="text-primary inline-flex items-center gap-1 hover:underline"
        prefetch={false}
      >
        Read More
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <CalendarIcon className="h-3 w-3" />
        <span>01.03.2024</span>
        <ClockIcon className="h-3 w-3" />
        <span>5 MIN</span>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
