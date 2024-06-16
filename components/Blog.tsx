import Link from "next/link";

export default function Posts() {
  return (
    <section className="bg-slate-50 py-12 text-slate-900 md:py-16 lg:py-20">
      <div className="px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h2 className="mb-16 text-3xl font-light tracking-tight sm:text-4xl md:text-5xl">
            Latest from our Blog.
          </h2>
        </div>
        <div className="no-scrollbar mt-10 flex gap-6 overflow-x-auto">
          <div className="min-w-[300px] space-y-2">
            <h3 className="text-2xl font-bold">
              Demystifying DeFi: A Beginner's Guide to Decentralized Finance.
            </h3>
            <p className="text-gray-700">
              Welcome to the world of DeFi, where traditional finance meets
              blockchain technology. In this blog post, we'll explore the basics
              of Decentralized Finance (DeFi) and how it's revolutionizing the
              way we think about money, banking, and investing.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-1 text-primary hover:underline"
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

          <div className="min-w-[300px] space-y-2">
            <h3 className="text-2xl font-bold">
              JM-Qfri Pharmaceuticals: What we do
            </h3>
            <p className="text-gray-700">
              At JM-Qafri Pharma, we specialize in developing innovative and
              high-quality pharmaceutical products to enhance patient care and
              improve health outcomes. Our commitment to research, excellence,
              and customer satisfaction drives us to deliver effective and
              reliable medical solutions.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-1 text-primary hover:underline"
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

          <div className="min-w-[300px] space-y-2">
            <h3 className="text-2xl font-bold">
              Real estate: Investment and a home away from home.
            </h3>
            <p className="text-gray-700">
              We excel in real estate, focusing on both rural and urban
              development to create sustainable and thriving communities. Our
              expertise encompasses innovative planning, design, and
              construction to meet diverse residential, commercial, and
              industrial needs.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-1 text-primary hover:underline"
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

          <div className="min-w-[300px] space-y-2">
            <h3 className="text-2xl font-bold">Our story.</h3>
            <p className="text-gray-700">
              Our story began with a shared vision to make a meaningful impact
              through innovation and excellence. Fueled by dedication and a
              passion for progress, we have grown into a trusted name, committed
              to delivering high-quality solutions and driving positive change
              in our industry.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-1 text-primary hover:underline"
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

          <div className="min-w-[300px] space-y-2">
            <h3 className="text-2xl font-bold">Our story.</h3>
            <p className="text-gray-700">
              Our story began with a shared vision to make a meaningful impact
              through innovation and excellence. Fueled by dedication and a
              passion for progress, we have grown into a trusted name, committed
              to delivering high-quality solutions and driving positive change
              in our industry.
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-1 text-primary hover:underline"
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
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon(props: any) {
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

function CalendarIcon(props: any) {
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

function ClockIcon(props: any) {
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
