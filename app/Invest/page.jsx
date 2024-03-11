import Navbar from "../components/Navbar"
import { CardContent, Card } from "../components/ui/card"

export default function Component() {
  return (
    <div className="min-h-screen bg-white ">
        <Navbar/>
    <section className="pt-40">
      <div className="grid gap-6 lg:gap-8 px-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-light text-center text-black">Investment Opportunities</h1>
          <p className="text-gray-900 text-center">Secure our expert insights ;</p>
        </div>
        <div className="grid gap-4 md:gap-6 lg:px-20 px-5 pb-20">
          <Card>
            <CardContent className="p-4 grid gap-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold leading-none">Agriculture Project</h3>
                <p className="text-sm text-gray-900">Invest in sustainable farming practices.</p>                 

              </div>
              <div className="flex items-center">
                <ArrowRightIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium leading-none">View Project</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 grid gap-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold leading-none">Fintech</h3>
                <p className="text-sm text-gray-900">Blockchain & embracing new technologies.</p>
              </div>
              <div className="flex items-center">
                <ArrowRightIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium leading-none">View Project</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 grid gap-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold leading-none">Pharmtech</h3>
                <p className="text-sm text-gray-900">AI and medicine.</p>
              </div>
              <div className="flex items-center">
                <ArrowRightIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium leading-none">View Project</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 grid gap-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold leading-none">Art</h3>
                <p className="text-sm text-gray-900">Art auctions, competitions and more</p>
              </div>
              <div className="flex items-center">
                <ArrowRightIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium leading-none">View Project</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 grid gap-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold leading-none">Education Initiative</h3>
                <p className="text-sm text-gray-900">
                  Supporting educational infrastructure in underprivileged areas.
                </p>
              </div>
              <div className="flex items-center">
                <ArrowRightIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium leading-none">View Project</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 grid gap-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold leading-none">Renewable Energy Venture</h3>
                <p className="text-sm text-gray-900">Invest in solar and wind energy projects.</p>
              </div>
              <div className="flex items-center">
                <ArrowRightIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-900" />
                <span className="text-sm font-medium leading-none">View Project</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 grid gap-2">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-semibold leading-none">Biotech</h3>
                <p className="text-sm text-gray-900">Biology to develop products, methods and organisms intended to improve human health and society</p>
              </div>
              <div className="flex items-center">
                <ArrowRightIcon className="w-4 h-4 mr-2 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                <span className="text-sm font-medium leading-none">View Project</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
    </section>
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
