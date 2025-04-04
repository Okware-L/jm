
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"

export default function Insight() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-gray-100 text-black py-11 pt-11 font-extralight pb-11">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
        <div className="lg:w-1/2 p-5">
          <Link href='/Airdrop'>
          <h2 className="sm:text-3xl text-xl font-normal leading-tight"> 🚀 Join the JM Qafri Airdrop and Unlock Exciting Opportunities! 🚀</h2>
          </Link>
          <p className="mt-4 font-light text-base leading-relaxed">
            Are you ready to dive into the world of crypto rewards? Here&#39;s your chance with the JM
             Qafri Airdrop! We&#39;re thrilled to offer you a golden opportunity to participate and earn valuable tokens effortlessly.
          </p>
          <Link href='/Airdrop'>
          <Button className="mt-4 bg-gray-200 text-gray-800 hover:bg-white">Blockchain</Button>
          </Link>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <Link href='/Airdrop'>
          <Image
            alt="defi"
            className="rounded-none hover:scale-105 ease-out duration-500"
            height="400"
            src="/airdrop.jpg"
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width="600"
          />
          </Link>
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
