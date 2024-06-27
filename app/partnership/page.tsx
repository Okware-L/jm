import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Partnership() {
  return (
    <div className="min-h-screen bg-slate-50 font-extralight text-slate-950">
      <Navbar />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pt-32">
        <h1 className="mb-4 text-4xl font-normal">Jm-Qafri Partner Program</h1>
        <p className="mb-8 text-xl">
          At JM-Qafri, our partner ecosystem is at the center of what we do.
          Together, we're building a world where anyone can safely use any
          technology - powered by their Identity.
        </p>

        {/* Partner Program Section */}
        <section className="mb-8 rounded-lg bg-white p-8 text-indigo-900">
          <h2 className="mb-4 text-3xl font-normal">Our partner program</h2>
          <div className="flex flex-col md:flex-row">
            <div className="pr-4 md:w-1/2">
              <p className="mb-4">
                Whether you provide solutions, deliver services or integrate
                technology, JM-Qafri helps you earn more rewards, retain more
                customers, expand your market footprint and grow your identity
                practice.
              </p>
            </div>
            <div className="md:w-1/2">
              <h3 className="mb-2 font-normal">Partnership opportunities</h3>
              <ul className="list-inside list-disc">
                <li>
                  <a href="#" className="text-indigo-600 hover:underline">
                    Learn about our partnership opportunities
                  </a>
                </li>
                <li>
                  <a href="#" className="text-indigo-600 hover:underline">
                    Meet our partners
                  </a>
                </li>
                <li>
                  <a href="#" className="text-indigo-600 hover:underline">
                    Locate a JM-Qafri partner
                  </a>
                </li>
              </ul>
              <h3 className="mb-2 mt-4 font-normal">Current partners</h3>
              <a href="#" className="text-indigo-600 hover:underline">
                Access the JM-Qafri Community
              </a>
              <h3 className="mb-2 mt-4 font-normal">Apply to be a partner</h3>
              <a href="#" className="text-indigo-600 hover:underline">
                Join JM-Qafri Elevate.
              </a>
            </div>
          </div>
        </section>

        {/* Benefits and Opportunities */}
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 text-indigo-900">
            <h3 className="mb-4 text-xl font-normal">
              Benefits of partnership
            </h3>
            <p>
              Engage with JM-Qafri for the opportunity to develop and nurture
              long-term, profitable customer relationships as you sell and
              deliver our solutions.
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 text-indigo-900">
            <h3 className="mb-4 text-xl font-normal">
              Partnership opportunities
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Solution Provider",
                "Distributor",
                "Global Systems Integrator",
                "Managed Service Provider",
                "Technology Partner",
                "Technology Integrator",
              ].map((item, index) => (
                <div key={index} className="rounded bg-gray-100 p-4">
                  <h4 className="mb-2 font-normal">{item}</h4>
                  <a href="#" className="text-indigo-600 hover:underline">
                    Learn more
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
