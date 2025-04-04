import React from "react";

const Newsletter = () => {
  return (
    <div className="bg-gray-800 py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-8 text-center text-3xl font-light text-white">
          Subscribe to Our Newsletter
        </h2>
        <form action="#" method="POST" className="flex justify-center">
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            className="rounded-l-md border border-gray-400 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-r-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus:bg-blue-600 focus:outline-none"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-center font-extralight text-gray-300">
          Stay up-to-date with our latest news and updates.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
