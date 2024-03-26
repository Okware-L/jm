import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


const MembersPartnershipPage = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />
      <div className='p-5 pt-40 text-black'>
        <h1 className='text-center text-5xl font-extralight mb-8 my-5'>Welcome to the Future!</h1>

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

        {/* JM-Qafri Methuselah Network Partner Status */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>JM-Qafri Methuselah Network Partner Status</h2>
          {/* Partner Benefits */}
          <div className='mb-4'>
            <h3 className='text-xl font-light mb-2'>What Partners Receive</h3>
            <ul className='list-disc list-inside text-lg'>
              <li className='font-extralight'>Unique Engagement Opportunities</li>
              <li className='font-extralight'>Targeted Audience Reach</li>
              <li className='font-extralight'>Collaborative Knowledge Exchange</li>
              <li className='font-extralight'>Enhanced Visibility</li>
            </ul>
          </div>
          {/* Partner Tiers */}
          <div className='mb-4'>
            <h3 className='text-xl font-light mb-2'>Partner Tiers</h3>
            <p className='text-normal font-extralight'>
              The JM-Qafri Methuselah Network offers a tiered partnership structure to best suit your organization&#39;s needs and goals. We encourage you to explore the options below:
            </p>
            <ul className='list-disc list-inside text-lg'>
              <li className='font-extralight'>Founding Partner</li>
              <li className='font-extralight'>Core Partner</li>
              <li className='font-extralight'>Supporting Partner</li>
            </ul>
          </div>
        </div>

        {/* Join Us in Building a Brighter Future */}
        <div className='mb-8'>
          <h2 className='text-3xl font-light mb-4'>Join Us in Building a Brighter Future</h2>
          <p className='text-normal font-extralight'>
            We invite forward-thinking organizations to join the JM-Qafri Methuselah Network and become partners in progress. Together, we can create a more just and sustainable world for all.
          </p>
        </div>
        
      </div>
      <Footer />
    </div>
  );
}

export default MembersPartnershipPage;
