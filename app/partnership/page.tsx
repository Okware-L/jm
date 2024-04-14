import Navbar from "../../components/Navbar";
import Image from "next/image";
import Footer from "../../components/Footer";

export default function Partnership() {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Navbar />

      <div className="pt-20">
        <h1 className="font-light  text-xl sm:text-3xl text-center pt-10 my-5">
          Become a partner with JM-Qafri.
        </h1>
        <div className="grid justify-center place-items-center mb-10">
          <Image src="/partnership.jpg" alt="hm" width="800" height="500" />
        </div>

        <p className="text-left text-base font-extralight leading-relaxed max-w-3xl mx-auto py-10 px-5">
          At JM-qafri, we believe in the power of collaboration to drive
          innovation and create value for our users. Through strategic
          partnerships with industry leaders, we aim to enhance the quality of
          our services and provide comprehensive solutions to meet the diverse
          needs of our customers.
        </p>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 bg-gray-100 text-black py-11 pt-11 font-extralight pb-11">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white">
          <div className="lg:w-1/2 p-5">
            <ul className="list-disc list-inside text-lg">
              <li className="font-light">
                Financial Institutions:
                <p className="font-extralight text-base p-5">
                  We collaborate with banks, credit unions, and other financial
                  institutions to offer seamless integration with our platform.
                  This ensures that our users have access to a wide range of
                  financial products and services, including banking, loans, and
                  investments.
                </p>
              </li>
              <li className="font-light">
                Industry experts:
                <p className="font-extralight text-base p-5">
                  We team up with industry experts and thought leaders to
                  provide valuable insights and resources to our users. Whether
                  it's through educational content, webinars, or consulting
                  services, our partnerships empower individuals to make
                  informed financial decisions.
                </p>
              </li>
              <li className="font-light">
                Startups and Fintech Companies:
                <p className="font-extralight text-base p-5">
                  Collaboration with startups and fintech companies allows us to
                  explore new opportunities and incorporate innovative solutions
                  into our platform. By fostering an ecosystem of
                  entrepreneurship and creativity, we aim to drive positive
                  change in the finance industry.
                </p>
              </li>
              <li className="font-light">
                Community Organizations:
                <p className="font-extralight text-base p-5">
                  We are committed to making a positive impact in the
                  communities we serve. Partnering with local organizations and
                  nonprofits enables us to support financial literacy
                  initiatives, promote economic empowerment, and address social
                  challenges.
                </p>
              </li>
            </ul>

            <button className="mt-4 bg-gray-200 text-gray-800 p-3 rounded">
              Partnerships
            </button>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <Image
              alt="defi"
              className="rounded-none hover:scale-105 ease-out duration-500"
              height="400"
              src="/company.jpg"
              style={{
                aspectRatio: "600/400",
                objectFit: "cover",
              }}
              width="600"
            />
          </div>
        </div>

        <p className="text-left text-base font-extralight leading-relaxed max-w-3xl mx-auto py-20">
          At JM-qafri, we view partnerships as a cornerstone of our success. By
          working together with trusted allies, we are dedicated to empowering
          individuals and businesses to achieve their financial goals and
          aspirations. If you are interested in exploring partnership
          opportunities with us, please don't hesitate to reach out. Together,
          we can create meaningful and lasting impact.
        </p>
      </div>
      <Footer />
    </div>
  );
}
