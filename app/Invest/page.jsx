import Navbar from "../../components/Navbar"
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {investmentData} from '../../investments'
import Footer from '../../components/Footer'


export default function Component() {
  return (
    <div className="min-h-screen bg-white ">
        <Navbar/>
      <div className=" mx-auto px-6 pb-10 pt-40">
      <div className="text-center mb-12">

        <h1 className="text-5xl font-light mb-4 text-black">INVESTING</h1>
        <p className="text-lg text-gray-700 font-light">
          secure our insights, advice, and solutions to help you invest successfully.
        </p>
      </div>
      <div className="sm:flex justify-center sm:space-x-8  space-y-3 grid">
        <div className="bg-white p-6 shadow-lg w-80">
          <h2 className="text-xl font-normal text-black mb-2">Enhanced Advisory Services</h2>
          <p className="text-gray-600 mb-4 font-light">Access JM-Qafri&#39;s extensive knowledge and capabilities to optimize your investment strategies with our advisory mandates.</p>
          <Link className="text-blue-600 hover:underline" href="#">
            Discover more →
          </Link>
        </div>
        <div className="bg-white p-6 shadow-lg w-80">
          <h2 className="text-xl font-normal text-black mb-2">Expert-Managed Investments</h2>
          <p className="text-gray-600 mb-4 font-light">Let our committed specialists take charge of your investments, ensuring tailored solutions and expert oversight.</p>
          <Link className="text-blue-600 hover:underline" href="#">
            Discover more →
          </Link>
        </div>
        <div className="bg-white p-6 shadow-lg w-80">
          <h2 className="text-xl font-normal mb-2 text-black">Other solutions</h2>
          <p className="text-gray-600 mb-4 font-light">Explore our comprehensive range of additional solutions and products.</p>
          <Link className="text-blue-600 hover:underline" href="#">
            Discover more →
          </Link>
        </div>
      </div>
    </div>
    <p className="p-10 sm:px-40 sm:py-10 font-light text-base text-black bg-inherit">
      At JM-Qafri, we've been cultivating our investment expertise and offerings for generations. Throughout our history, we've recognized that each individual's investment requirements are distinct and personalized. That's why our first priority is gaining a comprehensive understanding of your circumstances, aspirations, and risk tolerance.
With a clear grasp of your needs and objectives, we can then assist you in pinpointing and executing the ideal solution. Whether it involves a discretionary or advisory mandate, investing in a particular asset class, crafting a customized structured product, or providing execution support, you'll leverage our extensive investment experience and global network to your advantage.
    </p>
    <h1 className="text-center font-light text-2xl text-black ">Investment Opportunities</h1>
    
    <div  className="flex flex-nowrap overflow-x-auto mx-10 py-10 space-x-3 space-y-3"> 
    {investmentData.map((investmentData, index) => (
        <Card key={index}>
      <CardHeader>
        <div className="space-y-1">
          <CardTitle>{investmentData.title}</CardTitle>
          <CardDescription>{investmentData.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <h3 className="text-sm font-medium tracking-wide">Current Value</h3>
            <p className="text-sm font-medium tracking-wide">{investmentData.value}</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium tracking-wide">Return Rate</h3>
            <p className="text-sm font-medium tracking-wide">{investmentData.roi} (YTD)</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-medium tracking-wide">Investment Period</h3>
            <p className="text-sm font-medium tracking-wide">{investmentData.period}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <button className='btn btn-wide' size="sm">View Details</button>
      </CardFooter>
    </Card>
    ))}
    </div>
    <Footer/>
    </div>
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
