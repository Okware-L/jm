
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/H5KzG3EohJT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import Image from "next/image"

export default function Page() {
  return (
    <body className="bg-gray-100 min-h-screen">

    
    <section className="py-15 px-8  text-black">
      <h2 className="text-xl font-semibold text-center mb-6">About JM-Qafri</h2>
      <p className="text-center text-lg leading-relaxed max-w-3xl mx-auto py-8">
        For over 130 years, we have been focusing on one thing: helping people achieve their financial goals. As a
        global wealth manager, we understand your needs, and take the long view when it comes to your assets. Whether
        you’re starting a company, planning for your retirement, or want to ensure your loved ones will be taken care of
        in the future; our experts will help find the solution that is right for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col">
          <Image
            alt="Our company"
            className="mb-4"
            height="240"
            src="/placeholder.jpg"
            style={{
              aspectRatio: "360/240",
              objectFit: "cover",
            }}
            width="360"
          />
          <h3 className="text-lg font-semibold mb-2">Our company</h3>
          <Link className="text-sm text-blue-600 hover:underline" href="#">
            DISCOVER MORE →
          </Link>
        </div>
        <div className="flex flex-col">
          <Image
            alt="What we do"
            className="mb-4"
            height="240"
            src="/placeholder.jpg"
            style={{
              aspectRatio: "360/240",
              objectFit: "cover",
            }}
            width="360"
          />
          <h3 className="text-lg font-semibold mb-2">What we do</h3>
          <Link className="text-sm text-blue-600 hover:underline" href="#">
            DISCOVER MORE →
          </Link>
        </div>
        <div className="flex flex-col">
          <Image
            alt="Our locations"
            className="mb-4"
            height="240"
            src="/placeholder.jpg"
            style={{
              aspectRatio: "360/240",
              objectFit: "cover",
            }}
            width="360"
          />
          <h3 className="text-lg font-semibold mb-2">Our locations</h3>
          <Link className="text-sm text-blue-600 hover:underline" href="#">
            DISCOVER MORE →
          </Link>
        </div>
      </div>
    </section>
    </body>
  )
}

