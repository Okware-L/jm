import { Button } from "./ui/button";
import Image from "next/image";

export default function Insight() {
  return (
    <div className="bg-gray-100 px-4 py-32 pb-11 pt-11 font-extralight text-black sm:px-6 lg:px-8">
      <div className="grid sm:grid-cols-2 md:grid-cols-3">
        <div className="p-5 md:col-span-2">
          <h2 className="text-3xl font-normal leading-tight">
            AI&#39;s Rapid Growth Spurs New Investment Cycle.
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed">
            The rapid development of Artificial Intelligence has initiated a new
            investment cycle. However, the future growth of AI and the potential
            opportunities it presents for investors remain subjects of extensive
            discussion. JM-Qafri&#39;s global forum is at the forefront of this
            conversation.
          </p>
          <div className="mt-6 flex items-center space-x-4">
            <CalendarIcon className="text-gray-500" />
            <span className="text-sm">04.03.2024</span>
            <ClockIcon className="text-gray-500" />
            <span className="text-sm">6 MIN</span>
          </div>
          <Button className="mt-4 bg-gray-200 text-gray-800">Blockchain</Button>
        </div>
        <div className="bg-hero-first bg-cover bg-center p-32 sm:p-0">.</div>
      </div>
    </div>
  );
}

function CalendarIcon(props) {
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

function ClockIcon(props) {
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
