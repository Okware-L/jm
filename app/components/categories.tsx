
import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from "./ui/card"
import { Button } from "./ui/button"

export default function Categories() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 pb-16 pt-1">
      <h2 className="text-1xl font-light uppercase text-black tracking-wider mb-16">What we offer</h2>
      <div className="grid md:grid-cols-2 gap-10">
        <Card className="w-[350px] ">
          <CardHeader>
            <CardTitle>Wealth planning</CardTitle>
            <CardDescription>
              Our wealth planning services are designed to help you navigate every stage of your life.

            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost">Discover more →</Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Investing</CardTitle>
            <CardDescription>
              We offer a range of investment services and products to meet all of your investment needs.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost">Discover more →</Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Financing</CardTitle>
            <CardDescription>
              We offer customised solutions to meet your individual/startup financing and trading needs.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost">Discover more →</Button>
          </CardFooter>
        </Card>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Additional services</CardTitle>
            <CardDescription>
              Our additional services have been designed to round out our wealth management offering.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="ghost">Discover more →</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
