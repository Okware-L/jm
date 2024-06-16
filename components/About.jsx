import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extralight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              About JM-Qafri Methuselah.
            </h1>
          </div>
          <Image
            src="/claire2.jpeg"
            alt="pic"
            width={600}
            height={500}
            className="mx-auto rounded-lg shadow-lg"
          />
          <div className="mx-auto max-w-3xl">
            <p className="p-5 text-base font-extralight text-slate-900">
              As a global wealth manager, we recognize the significance of your
              financial objectives and adopt a forward-thinking approach to
              safeguarding your assets. Whether you&#39;re embarking on a new
              venture, strategizing for retirement, or securing the future
              well-being of your family, our team of experts is dedicated to
              identifying tailored solutions that resonate with you. In
              today&#39;s rapidly evolving financial landscape, our commitment
              to understanding your needs and leveraging innovative solutions,
              including DeFi, ensures that we remain relevant and equipped to
              guide you toward your financial goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
