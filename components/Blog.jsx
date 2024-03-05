
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Blog() {
  return (
    <div className="mx-auto py-12 px-4 sm:px-6 lg:px-10 bg-gray-100 text-black">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-9">
            <Image
              alt="Nico Rosberg"
              className="object-cover hover:scale-105 ease-in-out duration-500"
              height="180"
              src="/placeholder1.jpg"
              style={{
                aspectRatio: "320/180",
                objectFit: "cover",
              }}
              width="320"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-light">JMAFRI Network's New Channels for Global Business Investment</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CalendarIcon className="h-3 w-3" />
              <span >01.03.2024</span>
              <ClockIcon className="h-3 w-3" />
              <span>5 MIN</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-9">
            <Image
              alt="Generative AI's massive rally"
              className="object-cover hover:scale-105 ease-in-out duration-500"
              height="180"
              src="/placeholder1.jpg"
              style={{
                aspectRatio: "320/180",
                objectFit: "cover",
              }}
              width="320"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-light">Join the JMAFRI Network Architecture Contest for Sustainability and Innovation</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CalendarIcon className="h-3 w-3" />
              <span>28.02.2024</span>
              <ClockIcon className="h-3 w-3" />
              <span>3 MIN</span>
            </div>
          </div>
          
        </div>
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-9">
            <Image
              alt="Emerging markets: A sweet spot in fixed income"
              className="object-cover hover:scale-105 ease-in-out duration-500"
              height="180"
              src="/placeholder1.jpg"
              style={{
                aspectRatio: "320/180",
                objectFit: "cover",
              }}
              width="320"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-light">Coffee Project - Ethically Sourcing Fairly Traded Coffee</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CalendarIcon className="h-3 w-3" />
              <span>27.02.2024</span>
              <ClockIcon className="h-3 w-3" />
              <span>4 MIN</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <button className="btn btn-wide my-10  text-white hover:animate-bounce duration-500 ease-in-out">See All</button>
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
