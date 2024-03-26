import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';


const MembersPartnershipPage = () => {
  return (
    <div className='min-h-screen bg-white'>
      <Navbar />
      <div className='p-5 pt-40 text-black'>

        <div className='p-3 bg-gray-100'>
        <h1 className='text-left text-5xl font-extralight mb-8 my-5'>Welcome to the Future!</h1>

        {/* Introduction */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>Introduction</h2>
          <p className='text-normal font-extralight'>
            This forum is a collaborative effort between JM-Q Methuselah, NWCV (New World Community Vision), Scorpion Group (Healthcare), and CPJ Farms (Agriculture). We&#39;re a community of forward-thinkers dedicated to building a more equitable and sustainable future for all.
          </p>
        </div>

        {/* What We Do */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>What We Do</h2>
          <ul className='list-disc list-inside text-lg'>
            <li className='font-light'>Discuss modern solutions</li>
            <p className='font-extralight text-base p-3'>We tackle the world&#39;s most pressing issues head-on, exploring innovative approaches to create a just and thriving society.</p>
            <li className='font-light'>Focus on four pillars.</li>
            <p className='font-extralight text-base p-3'> Our discussions revolve around business, healthcare (with a focus on longevity), community building (and preservation), and education.</p>
            <li className='font-light'>Think tank powered solutions</li>
            <p className='font-extralight text-base p-3'>Led by our esteemed think tank, we develop practical solutions to the challenges faced by our members, partners, and their communities. </p>
            <li className='font-light'>Supportive network</li>
            <p className='font-extralight text-base p-3'>This forum serves as a support system for our partners and think tank, fostering collaboration and knowledge exchange.</p>
            <li className='font-light'>Partner-driven mission</li>
            <p className='font-extralight text-base p-3'>Our founding was inspired by our esteemed partners in healthcare, agriculture, technology, and community-based organizations. </p>
          </ul>
        </div>

        {/* Join the Conversation */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>Join the Conversation</h2>
          <p className='text-normal font-extralight'>
            We invite you to participate in this dynamic forum. Share your ideas, learn from others, and work together to create a brighter future!
          </p>
        </div>
        </div>

        {/* JM-Qafri Methuselah Network Partner Status */}
        <div className='mb-8'>
            <Image
            alt="Our company"
            className="sm:w-3/4 w-full h-auto p-5"
            height="300"
            src="/company.jpg"
            width="400"
          />
          <div className='bg-gray-100 p-3'>
          <h2 className='text-3xl font-light mb-4'>JM-Qafri Methuselah Network Partner Status</h2>
          <p className='font-extralight my-5 text-base'> The JM-Qafri Methuselah Network offers a prestigious Partner Status to acknowledge and empower organizations working towards a more equitable society.  This partnership unlocks a multitude of benefits to propel your organization's impact and reach within our network.</p>
          {/* Partner Benefits */}
          <div className='mb-4'>
            <h3 className='text-xl font-light mb-2'>What Partners Receive</h3>
            <ul className='list-disc list-inside text-lg'>
              <li className='font-extralight'>Unique Engagement Opportunities</li>
            <p className='font-extralight text-base p-3'> Partners gain access to exclusive events, workshops, and discussions led by our esteemed think tank. You&#39;ll have the platform to showcase your expertise and collaborate on solutions with fellow purpose-driven organizations.</p>
              <li className='font-extralight'>Targeted Audience Reach</li>
            <p className='font-extralight text-base p-3'>Amplify your organization&#39;s message to a curated community exceeding [Number] individuals.  Our network includes thought leaders, industry experts, and changemakers across business, healthcare (focusing on longevity), community building, and education.</p>
              <li className='font-extralight'>Collaborative Knowledge Exchange</li>
            <p className='font-extralight text-base p-3'> Network with like-minded partners and tap into a collective pool of knowledge. Partners are encouraged to share best practices, insights, and resources to drive positive change. </p>
              <li className='font-extralight'>Enhanced Visibility</li>
            <p className='font-extralight text-base p-3'>Increase your organization&#39;s visibility through promotion on our online platforms, publications, and event materials. </p>

            </ul>
          </div>
          {/* Partner Tiers */}
          <div className='mb-4'>
            <h3 className='text-xl font-light mb-2'>Partner Tiers</h3>
            <p className='text-normal font-extralight my-3'>
              The JM-Qafri Methuselah Network offers a tiered partnership structure to best suit your organization&#39;s needs and goals. We encourage you to explore the options below:
            </p>
            <ul className='list-disc list-inside text-lg'>
              <li className='font-extralight'>Founding Partner</li>
            <p className='font-extralight text-base p-3'>A select group of organizations who share our founding vision and play a pivotal role in shaping the network&#39;s direction. Founding Partners receive the highest level of visibility and engagement opportunities.</p>

              <li className='font-extralight'>Core Partner</li>
                <p className='font-extralight text-base p-3'>Actively involved partners who contribute significantly to the network&#39;s growth and impact. Core Partners benefit from prominent promotion and participation in key initiatives.</p>
              <li className='font-extralight'>Supporting Partner</li>
                <p className='font-extralight text-base p-3'>Organizations that align with our mission and contribute valuable expertise or resources. Supporting Partners gain access to a network of purpose-driven organizations and visibility through our platforms.</p>

            </ul>
          </div>
        </div>

        {/* Join Us in Building a Brighter Future */}
        <div className='mb-8 my-5'>
          <h2 className='text-3xl font-light mb-4'>Join Us in Building a Brighter Future</h2>
          <p className='text-normal font-extralight'>
            We invite forward-thinking organizations to join the JM-Qafri Methuselah Network and become partners in progress. Together, we can create a more just and sustainable world for all.
          </p>
        </div>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default MembersPartnershipPage;
