
import Link from "next/link"
import Image from "next/image"

export default function About() {
  return (
    <section className="py-16 px-4 bg-gray-50 text-black font-extralight">
      <div className="text-center text-4xl font-light mb-12">ABOUT</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="group relative">
          <Image
            alt="Our company"
            className="w-full h-auto"
            height="300"
            src="/placeholder1.jpg"
            style={{
              aspectRatio: "400/300",
              objectFit: "cover",
            }}
            width="400"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4 group-hover:bg-opacity-40 transition duration-300 ease-in-out">
            <div>
              <h3 className="text-white text-lg font-semibold">Our company</h3>
              <Link className="text-white text-sm mt-2 inline-flex items-center hover:underline" href="#">
                DISCOVER MORE
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="group relative">
          <Image
            alt="What we do"
            className="w-full h-auto"
            height="300"
            src="/placeholder1.jpg"
            style={{
              aspectRatio: "400/300",
              objectFit: "cover",
            }}
            width="400"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4 group-hover:bg-opacity-40 transition duration-300 ease-in-out">
            <div>
              <h3 className="text-white text-lg font-semibold">What we do</h3>
              <Link className="text-white text-sm mt-2 inline-flex items-center hover:underline" href="#">
                DISCOVER MORE
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="group relative">
          <Image
            alt="Our locations"
            className="w-full h-auto"
            height="300"
            src="/placeholder1.jpg"
            style={{
              aspectRatio: "400/300",
              objectFit: "cover",
            }}
            width="400"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-end p-4 group-hover:bg-opacity-40 transition duration-300 ease-in-out">
            <div>
              <h3 className="text-white text-lg font-semibold">Our locations</h3>
              <Link className="text-white text-sm mt-2 inline-flex items-center hover:underline" href="#">
                DISCOVER MORE
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-base font-light leading-relaxed max-w-3xl mx-auto py-10">
        As a leading global wealth manager, we recognize the significance of your financial objectives and adopt
         a forward-thinking approach to safeguarding your assets. Whether you&#39;re embarking on a new venture,
          strategizing for retirement, or securing the future well-being of your family, our team of experts is 
          dedicated to identifying tailored solutions that resonate with you. In today&#39;s rapidly evolving financial landscape,
           our commitment to understanding your needs and leveraging innovative solutions, including DeFi, ensures
            that we remain relevant and equipped to guide you toward your financial goals.
      </p>
    </section>
  )
}

function ArrowRightIcon(props) {
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
  )
}
