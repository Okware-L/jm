import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CharityPage = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='p-5 pt-40 text-black'>
        <h1 className='text-center text-5xl font-extralight mb-8'>Join Us in Making a Difference</h1>
        
        {/* Introduction */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>Collaborating with Charities: Making a Difference Together</h2>
          <p className='text-normal font-extralight'>
            At the Jmqafri Network, we believe in the power of collective action to drive positive change. As part of our commitment to social responsibility, we actively collaborate with reputable charities and encourage both our members and non-members to contribute towards causes that have a meaningful impact on the lives of others.
          </p>
        </div>

        {/* Collaboration with Charities */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>Collaboration with Charities</h2>
          <p className='text-normal font-extralight'>
            We actively seek partnerships with charities that align with our values and goals. These collaborations enable us to support a wide range of causes, including education, healthcare, poverty alleviation, environmental conservation, and more. By joining forces with charitable organizations, we leverage our network&#39;s resources, expertise, and influence to create a greater impact together.
          </p>
        </div>

        {/* Encouraging Donations */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>Encouraging Donations</h2>
          <p className='text-normal font-extralight'>
            We firmly believe that everyone has the power to make a difference, regardless of their membership status. Both our members and non-members are encouraged to contribute to the causes we support through donations. Every donation, regardless of its size, can make a significant impact on the lives of those in need.
          </p>
        </div>

        {/* How to Donate */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>How to Donate</h2>
          <ol className='list-decimal list-inside text-lg'>
            <li className='font-extralight'><strong>Visit our website:</strong> You can visit our website&#39;s dedicated donation page, which provides information about the charitable organizations we collaborate with and the causes they support. There, you will find details about the donation process and the different methods available.</li>
            <li className='font-extralight'><strong>Choose a cause:</strong> Browse through the causes we support and select the one that resonates with you the most. Whether it&#39;s providing education to underprivileged children, supporting medical research, or protecting the environment, choose a cause that reflects your values and aspirations.</li>
            <li className='font-extralight'><strong>Select a donation method:</strong> We offer various donation methods to ensure convenience and security. You can choose to make a one-time donation or set up recurring donations based on your preference. Our website provides secure payment gateways that protect your financial information.</li>
            <li className='font-extralight'><strong>Spread the word:</strong> Sharing the importance of giving back and encouraging others to donate can amplify the impact of our collective efforts. Use your social media platforms, word of mouth, or other channels to raise awareness about the causes you support and inspire others to contribute.</li>
          </ol>
        </div>

        {/* The Impact of Your Donations */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>The Impact of Your Donations</h2>
          <p className='text-lg text-normal font-extralight'>
            Your donations can have a profound impact on the lives of individuals and communities in need. They can help provide education to children who otherwise would not have access to it, fund medical treatments and research that save lives, support initiatives that protect the environment, and much more. Every contribution you make brings us closer to building a more equitable, sustainable, and compassionate world.
          </p>
        </div>

        {/* Join Us in Making a Difference */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>Join Us in Making a Difference</h2>
          <p className='text-lg text-normal font-extralight'>
            Whether you are a member of the Jmqafri Network or someone who believes in our mission, we invite you to join us in making a difference. Your support, whether through collaboration or donations, can help create a brighter future for those in need. Together, we can foster positive change, uplift lives, and create a lasting impact on society. Let us unite our efforts and work hand in hand with charities to bring about meaningful transformations. Donate today and be a catalyst for change.
          </p>
        </div>

        {/* Transparency Note */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>Transparency Note</h2>
          <p className='text-lg text-normal font-extralight'>
            The Jmqafri Network ensures that all donations are handled with the utmost transparency and that funds are allocated responsibly to the intended causes. We regularly review our partnerships with charities to ensure their credibility and impact.
          </p>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default CharityPage;
