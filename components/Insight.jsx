/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NaS65YG7jUK
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Insight() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-gray-100 text-black py-5 pt-11">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
        <div className="lg:w-1/2 p-5">
          <h2 className="text-3xl font-semibold leading-tight">Three wealth mistakes of Succession’s Roy family</h2>
          <p className="mt-4 text-base leading-relaxed">
            If you were a Roy, what would you have done? Last summer, HBO’s Succession finished its four-season run to
            critical acclaim. In the calamitous finale, we watched the ultra-high-net-worth family fall apart at the
            seams – so
          </p>
          <div className="flex items-center space-x-4 mt-6">
            <CalendarIcon className="text-gray-500" />
            <span className="text-sm">04.03.2024</span>
            <ClockIcon className="text-gray-500" />
            <span className="text-sm">6 MIN</span>
          </div>
          <Button className="mt-4 bg-gray-200 text-gray-800">Succession</Button>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <Image
            alt="Succession’s Roy family"
            className="rounded-none"
            height="400"
            src="/placeholder1.jpg"
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width="600"
          />
        </div>
      </div>
    </div>
  )
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
  )
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
  )
}
