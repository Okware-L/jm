import React from 'react';
import Image from 'next/image';

import Footer from '../../components/Footer';
import AirdropForm from './components/AirdropForm'
import Navbar from '../../components/Navbar'
const Page = () => {


  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar scrollThreshold={50}/>
      <div className='p-5 pt-40 text-black'>
        <div className='flex justify-center items-center'>
          <Image src="/airdrop.jpg" alt="Airdrop" width="800" height="500"/>
        </div>
        
        <h1 className='text-center text-5xl font-extralight mb-8 my-5'>Airdrop Announcement</h1>
        
        {/* Airdrop Introduction */}
        <div className='mb-8 mt-5'>
          <h2 className='text-3xl font-light mb-4'>Interact with JM QAFRI Network and Earn Rewards!</h2>
          <p className='text-normal font-extralight'>
            Attention all crypto enthusiasts and blockchain aficionados! The JM QAFRI team is thrilled to announce an exclusive airdrop campaign designed to reward our dedicated community members and eager participants. As we continue to refine and enhance our platform, your valuable feedback and engagement play a vital role in shaping its future.
          </p>
        </div>

        {/* Participation Steps */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>How to Participate and Earn Rewards</h2>
          <ul className='list-disc list-inside text-lg'>
            <li className='font-light'>Register on the JM QAFRI Network.</li>
            <p className='font-extralight p-5 text-base'>Sign up on our platform to unlock a plethora of exciting features, including cutting-edge exchanges, innovative trading tools, and advanced analytics. Don&#39;t miss out on this opportunity to join our ever-growing community!</p>
            <li className='font-light'>Interact with the Platform.</li>
            <p className='font-extralight p-5 text-base'>Explore the various functionalities of the JM QAFRI Network and actively engage with our intuitive interfaces. Discover new trading opportunities, share your insights, and make the most out of our advanced tools.</p>
            <li className='font-light'>Provide Feedback.</li>
            <p className='font-extralight p-5 text-base'>Your opinions matter! Help us improve by sharing your thoughts, suggestions, and experiences with our platform. We value your feedback and believe it&#39;s the key to building a world-class crypto ecosystem.</p>
          </ul>
          <p className='text-normal font-extralight mt-2'>
            By actively participating in the JM QAFRI Network, you&#39;ll have the chance to earn incredible rewards such as JM Tokens, unique benefits, and network reputation.
          </p>
        </div>

        {/* Airdrop Rewards */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>Airdrop Rewards</h2>
          <ul className='list-disc list-inside text-lg'>
            <li className='font-light'>JM Tokens:
             <p className='font-extralight text-base p-5'>Gain exclusive access to our native utility token, JM, which will power various transactions and services within the network.</p>
             </li>
            <li className='font-light'>Unique Benefits: 
            <p className='font-extralight text-base p-5'>
            Unlock special perks such as reduced transaction fees, priority customer support, and early access to upcoming features.
            </p></li>
            <li className='font-light'>Network Reputation:
             <p className='font-extralight text-base p-5'>
            Build your reputation within the JM QAFRI Network and gain recognition as a valuable community member.
            </p></li>
          </ul>
          <p className='text-normal font-extralight mt-2'>
            Join us on this journey to revolutionize the crypto landscape! As we work tirelessly to refine and perfect our platform, your active involvement will help shape its future direction.
          </p>
        </div>

        {/* Airdrop Timeline */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>Airdrop Timeline</h2>
          <p className='text-normal font-extralight'>
            The airdrop campaign will commence on [Start Date] and run until [End Date]. Don&#39;t miss out on this limited-time opportunity to be part of something groundbreaking!
          </p>
        </div>

        {/* Stay Connected */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>Stay Connected</h2>
          <p className='text-normal font-extralight'>
            To ensure you receive all updates related to the airdrop and other exciting developments, follow us on our official social media channels and subscribe to our newsletter.
          </p>
        </div>

        {/* Disclaimer */}
        <div className='mb-8'>
          <h2 className='text-xl font-light mb-4'>Disclaimer</h2>
          <p className='text-normal font-extralight'>
            This airdrop campaign is subject to terms and conditions, which will be outlined on our official website. Participation does not guarantee rewards, and the distribution will be based on predetermined criteria established by the JM QAFRI team.
          </p>
          <p className='text-normal font-extralight mb-5'>
            By actively interacting with our app, you contribute to an invaluable learning process that enables us to study and improve our platform. Your engagement provides us with firsthand insights into the user experience,
             allowing us to identify strengths, weaknesses, and areas for enhancement. We carefully analyze your interactions, feedback, and suggestions to refine our features,
              optimize performance, and introduce new functionalities that align with your needs and preferences. Your participation is a vital part of our continuous improvement
               cycle, ensuring that we deliver a cutting-edge app that surpasses expectations and provides an exceptional user experience. Together, we&#39;re shaping the future of our
                platform, and we are immensely grateful for your support and involvement.
          </p>

        {/* Airdrop Participation Form */}
            <AirdropForm />
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default Page;
