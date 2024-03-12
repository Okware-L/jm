import React from 'react'

const Newsletter = () => {
  return (
    <div className='bg-gray-100 px-5'>
        <div className="bg-gray-800 py-12">
    <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-light text-white text-center mb-8">Subscribe to Our Newsletter</h2>
        <form action="#" method="POST" className="flex justify-center">
            <input type="email" name="email" placeholder="Your Email Address" className="border border-gray-400 py-2 bg-white px-4 rounded-l-md focus:outline-none focus:border-blue-500"/>
            <button type="submit" className="bg-black text-white py-2 px-4 rounded-r-md hover:bg-gray-800 focus:outline-none focus:bg-blue-600">Subscribe</button>
        </form>
        <p className="text-gray-300 font-extralight text-center mt-2">Stay up-to-date with our latest news and updates.</p>
    </div>
</div>
    </div>
  )
}

export default Newsletter