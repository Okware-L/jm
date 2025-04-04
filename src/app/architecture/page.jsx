import React from 'react'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'

const page = () => {
  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='p-5 pt-40 text-black'>
        <h1 className='text-center text-2xl sm:text-5xl font-extralight'>The JM-Qafri Methuselah Architecture Competition</h1>
        <div className='flex justify-center items-center my-10'>
        <Image src="/archi.jpg" alt="hm" width="800" height="500"/>
        </div>
        <div className='my-5 space-y-5 md:px-10'>
          <h2 className='text-left text-normal sm:text-3xl font-extralight my-10'>Submission Instructions for the Jmqafri Project</h2>

{/* Submission Requirements */}
<div className="mb-4">
  <h3 className="text-lg font-semibold mb-2">Submission Requirements</h3>
  <ol className="list-decimal ml-6 mt-2">
    <li>
      Prepare a Zip file named after the unique registration number provided to you.
    </li>
    <li>
      <h4 className="font-semibold">A0 Board in JPEG Format:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Create an A0 board in JPEG format, containing all the necessary information to explain your proposal.</li>
        <li>Include plans, sections, elevations, visualizations, and diagrams as needed.</li>
        <li>The resolution of the board must be 300dpi.</li>
        <li>Place the unique registration number in the upper left corner of the board, using a 22pt font.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Word Document File:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Create a Word document file containing the project statement.</li>
        <li>The project statement should not exceed 250 words and should explain your design proposal.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Main Image in JPEG Format:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Prepare a main image of the entry in a 16:9 aspect ratio.</li>
        <li>Preferably, provide a bird&#39;s eye view of the entire Dakeer Island.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Upload your Entry:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Access the upload link provided in your registration confirmation email.</li>
        <li>Use the upload link to submit your entry.</li>
      </ul>
    </li>
  </ol>
  {/* Poster Layout and ZIP File Contents instructions can be included here if needed */}
</div>

{/* Requirements */}
<div className="mb-4">
  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
  <ol className="list-decimal ml-6 mt-2">
    <li>
      <h4 className="font-semibold">Originality and Authenticity:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>All submissions must be original work created by the participants.</li>
        <li>Plagiarism or unauthorized use of copyrighted material is strictly prohibited.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Design Intent:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Participants should clearly articulate the design intent behind their proposals.</li>
        <li>Explain how the design addresses the project&#39;s objectives and aligns with the vision for Jmqafri.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Sustainability:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Design proposals should prioritize sustainability and environmentally friendly practices.</li>
        <li>Incorporate sustainable materials, energy-efficient systems, and innovative approaches to reduce the ecological impact.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Cultural Sensitivity:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Respect local culture, heritage, and traditions when developing design proposals.</li>
        <li>Integrate elements that celebrate the region&#39;s cultural identity and promote cultural exchange.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Accessibility and Inclusivity:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Design proposals should aim to be accessible to people of all abilities.</li>
        <li>Incorporate universal design principles to ensure equal access and usability for everyone.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Safety and Security:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Ensure that design proposals prioritize the safety and security of visitors and residents.</li>
        <li>Incorporate appropriate measures to prevent accidents, address emergency situations, and mitigate risks.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Community Engagement:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Encourage participants to engage with the local community during the design process.</li>
        <li>Seek feedback, involve stakeholders, and consider the needs and aspirations of the community.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Resilience:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Design proposals should consider the region&#39;s climate and potential challenges, such as natural disasters.</li>
        <li>Incorporate resilient design strategies to enhance the project&#39;s ability to withstand and recover from adverse events.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Innovation and Technology:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Encourage participants to explore innovative design solutions and incorporate cutting-edge technologies.</li>
        <li>Embrace advancements in construction methods, sustainable materials, and digital tools to enhance the project&#39;s quality and efficiency.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Documentation and Presentation:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Provide clear and comprehensive documentation of the design proposal.</li>
        <li>Present the ideas, concepts, and technical details in a visually appealing and informative manner.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Collaboration:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Encourage collaboration among participants, promoting interdisciplinary approaches to problem-solving.</li>
        <li>Foster partnerships between architects, urban planners, landscape designers, and other relevant disciplines.</li>
      </ul>
    </li>
    <li>
      <h4 className="font-semibold">Adherence to Regulations:</h4>
      <ul className="list-disc ml-6 mt-2">
        <li>Participants must comply with all applicable laws, regulations, and building codes relevant to the Jmqafri project.</li>
      </ul>
    </li>
  </ol>
</div>

          {/* Additional Rules */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Additional Rules</h3>
            <p className="mb-4">These additional rules aim to enhance the overall quality, sustainability, inclusivity, and cultural sensitivity of the Jmqafri project.</p>
            <ol className="list-decimal ml-6 mt-2">
              <li>This is an anonymous competition and the Unique Registration Number is the only means of identification.</li>
              <li>The official language of the award is English.</li>
              <li>The registration fee for this award is non-refundable (the contest is free).</li>
              <li>Contacting the jury is prohibited.</li>
              <li>The award organizer reserves the right to modify the award schedule if deemed necessary.</li>
              <li>Entries will not be reviewed if rules or submission requirements are not followed.</li>
              <li>Participation assumes acceptance of the regulations.</li>
              <li>Transparency and Fairness:
                <ul className="list-disc ml-6 mt-2">
                  <li>The competition will maintain strict anonymity, and the Unique Registration Number will be the only means of identification. Participants should refrain from including any personal or identifying information in their submissions.</li>
                  <li>The jury will evaluate all entries based solely on their merits and adherence to the competition guidelines, without any bias or discrimination.</li>
                </ul>
              </li>
              <li>Language Requirements:
                <ul className="list-disc ml-6 mt-2">
                  <li>All submissions, including project statements and documentation, should be in English, the official language of the award. Participants should ensure that their entries are clear, well-written, and easily understandable.</li>
                </ul>
              </li>
              <li>Non-refundable Registration Fee:
                <ul className="list-disc ml-6 mt-2">
                  <li>Participants are required to pay a registration fee to enter the competition, and this fee is non-refundable. It helps cover administrative costs and supports the organization of the Jmqafri project.</li>
                </ul>
              </li>
              <li>Communication with the Jury:
                <ul className="list-disc ml-6 mt-2">
                  <li>Participants are strictly prohibited from contacting the jury members directly. Any attempts to influence or communicate with the jury may result in disqualification..</li>
                </ul>
              </li>
              <li>Award Schedule Flexibility:
                <ul className="list-disc ml-6 mt-2">
                  <li>The organizers of the Jmqafri project, Tamayouz Excellence Award, reserve the right to modify the award schedule if necessary. This flexibility allows for adjustments to be made in case of unforeseen circumstances or to ensure the smooth running of the competition.</li>
                </ul>
              </li>
              <li>Adherence to Rules and Submission Requirements:
                <ul className="list-disc ml-6 mt-2">
                  <li>It is essential for participants to carefully review and follow all the rules and submission requirements provided. Failure to comply with these guidelines may result in the disqualification of the entry.</li>
                </ul>
              </li>
              <li>Acceptance of Regulations:
                <ul className="list-disc ml-6 mt-2">
                  <li> By participating in the Jmqafri project, all participants implicitly accept and agree to abide by the regulations set forth by the competition. It is the responsibility of participants to familiarize themselves with the rules and ensure compliance.</li>
                </ul>
              </li>
              
            </ol>
            <p className="mt-4">These additional rules help maintain the integrity, fairness, and efficiency of the Jmqafri project, ensuring a level playing field for all participants while promoting clear communication and adherence to competition guidelines.</p>
          </div>

          {/* Analysis Criteria */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Analysis Criteria</h3>
            <p className="mb-4">By evaluating the submissions based on these criteria, the analysis can assess the relevance of the design to its context, the response to local challenges, and the resolution in terms of spatial justification, accessibility, safety, security, durability, and environmental impact.</p>
            <ol className="list-decimal ml-6 mt-2">
              <li>Relevance:
                <ul className="list-disc ml-6 mt-2">
                  <li>The submission should include a clear declaration of the conditions that establish the urban and cultural contextual parameters of the project.</li>
                  <li>Identify local challenges and potential opportunities related to the project.</li>
                  <li>Consider the living culture of the area and how it can be integrated into the design.</li>
                </ul>
              </li>
              <li>Response:
                <ul className="list-disc ml-6 mt-2">
                  <li>The submission should present aspirational, transformative, and original ideas.</li>
                  <li>The design proposal should demonstrate a programmatic response to existing local urban, environmental, and social conditions and challenges.</li>
                  <li>The design process should be clearly communicated, showing a logical and thoughtful approach to addressing the project requirements.</li>
                </ul>
              </li>
              <li>Resolution:
                <ul className="list-disc ml-6 mt-2">
                  <li>The submission should provide a clearly declared spatial and technical justification for the design.</li>
                  <li>Considerations should be given to accessibility, ensuring that the design is inclusive and easily usable by all.</li>
                  <li>Safety and security measures should be integrated into the design to ensure the well-being of users.</li>
                  <li>The design should demonstrate durability and resilience, taking into account the long-term maintenance and lifespan of the project.</li>
                  <li>Environmental impact should be addressed, with an emphasis on sustainable practices and minimizing ecological footprints.</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Awards */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Awards</h3>
            <p className="mb-4">These reward statements acknowledge the exceptional achievements of the top three winners, highlighting their unique contributions, innovation, and dedication to architectural excellence.</p>
            <ol className="list-decimal ml-6 mt-2">
              <li>First Place:
                <p className="ml-6 mt-2">Congratulations on achieving first place in the Jmqafri contest! Your outstanding design proposal showcases exceptional creativity, innovation, and a deep understanding of the urban and cultural context. Your ability to address local challenges while providing transformative solutions sets your entry apart. The first-place award recognizes your exceptional talent, vision, and dedication to excellence in architecture and design. Enjoy the well-deserved recognition and let this achievement propel you to even greater success in your future endeavors.</p>
              </li>
              <li>Second Place:
                <p className="ml-6 mt-2">Congratulations on securing the second-place position in the Jmqafri contest! Your design proposal has impressed the jury with its thoughtful response to urban, environmental, and social conditions. Your innovative ideas and well-executed programmatic approach have set you apart from the competition. The second-place award recognizes your exceptional skills and dedication to creating impactful and sustainable designs. This recognition highlights your talent and marks a significant milestone in your architectural journey. Continue to push boundaries and make a positive impact on the built environment.</p>
              </li>
              <li>Third Place:
                <p className="ml-6 mt-2">Congratulations on earning the third-place position in the Jmqafri contest! Your design proposal demonstrates a high level of skill, creativity, and adaptability to the local context. Your ability to address challenges and provide a well-justified spatial and technical resolution is commendable. The third-place award celebrates your talent, hard work, and commitment to excellence in architecture and design. This achievement signifies your potential and positions you among the top emerging architects in the field. Build upon this success and continue to pursue your passion for creating meaningful and impactful spaces.</p>
              </li>
            </ol>
          </div>

          {/* Registration */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Registration</h3>
            <div className="mb-4">
              <h4 className="text-md font-semibold mb-2">Registration Fees:</h4>
              <ul className="list-disc ml-6">
                <li>Early Registration: $75</li>
                <li>Standard Registration: $85</li>
                <li>Late Registration: $100</li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="text-md font-semibold mb-2">Institutional Registration:</h4>
              <p className="mb-2">For universities and institutions interested in sponsoring their students to participate in the International Graduation Projects Award and Dewan Award for Architecture, there is an Institutional Registration option available. For a fee of $500, your university can sponsor all its students and staff who wish to participate in the competition, providing them with a global platform to showcase their work.</p>
            </div>
            <div className="mb-4">
              <h4 className="text-md font-semibold mb-2">Eligibility:</h4>
              <p className="mb-2">The competition is open to architects, students, engineers, and designers. Participants can enter as individuals or as part of a team, with a maximum of 8 members per team. The competition encourages the participation of multidisciplinary teams, promoting collaboration and diverse perspectives.</p>
            </div>
          </div>


          {/* Extra Prizes */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Extra Prizes</h3>
            <div className="mb-4">
              <h4 className="text-md font-semibold mb-2">Top 50 Winners:</h4>
              <ul className="list-disc ml-6">
                <li>Recognition as one of the top 50 winners in the competition, highlighting your exceptional design skills and innovative ideas.</li>
                <li>Invitation to the prestigious award ceremony, where you will have the opportunity to network with renowned professionals in the field of architecture and design.</li>
                <li>Publication of your design in prominent architecture and design publications, providing exposure and recognition on a global platform.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-2">Selected to be Constructed Design:</h4>
              <ul className="list-disc ml-6">
                <li>For a select number of winners from the top 50, the opportunity to have their design selected for construction.</li>
                <li>The winners whose designs are chosen will be awarded a contract to further develop and implement their winning design, turning it into a built reality.</li>
                <li>Collaboration with a team of experts, including architects, engineers, and contractors, to bring the design to fruition.</li>
                <li>The chance to make a lasting impact on the built environment, creating a tangible contribution to the community.</li>
              </ul>
            </div>
          </div>


          {/* Timeline */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Timeline</h3>
            <ul className="list-disc ml-6">
              <li><strong>1st June:</strong> Jmqafri initiative begins, marking the start of the exciting journey towards celebrating architectural excellence.</li>
              <li><strong>June 2023:</strong> The competition is officially launched, inviting architects, planners, artists, and academics to participate in this prestigious event.</li>
              <li><strong>29th September:</strong> Registration deadline. Make sure to complete your registration before 6pm GMT (London) to secure your place in the competition.</li>
              <li><strong>November 2023:</strong> Submission deadline. Your design proposal must be submitted by 6pm GMT (London) to be considered for evaluation.</li>
              <li><strong>December 2023:</strong> Shortlist Announcement. The shortlisted participants will be revealed, highlighting their exceptional work and progress to the next stage of the competition.</li>
              <li><strong>January 2024:</strong> Winners Announcement. The highly anticipated moment arrives as we announce the winners of the Jmqafri competition, recognizing their outstanding achievements and contributions to the field of architecture.</li>
            </ul>
            <p className="mt-4">Throughout the competition period, stay connected with Jmqafri through our communication channels, where we will provide updates, resources, and support to participants.</p>
            <p className="mt-4">Please note that all deadlines mentioned above are based on the 6pm GMT (London) time zone, ensuring a standardized timeline for all participants. We encourage you to manage your time effectively and adhere to the deadlines to make the most of this remarkable opportunity.</p>
            <p className="mt-4">Let the countdown begin as we embark on this incredible journey of architectural excellence, innovation, and celebration.</p>
          </div>

          {/* Design requirements */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Design</h3>
            <p>The facility we are asking you to design is a multifunctional complex that aims to cater to various needs of the community. It is envisioned as a vibrant and inclusive space that seamlessly integrates education, health, recreation, residential, commercial, and cultural elements. Here is a detailed explanation of each section within the facility:</p>
            <ol className="list-decimal ml-6 mb-4">
              <li><strong>Education:</strong> This section will include educational facilities such as schools, colleges, or universities. The design should promote a conducive learning environment, incorporating classrooms, libraries, laboratories, and other necessary amenities.</li>
              <li><strong>Health:</strong> The health section will comprise both a research lab and a hospital space allocation. The research lab should be equipped with state-of-the-art facilities to facilitate medical research and innovation. The hospital space allocation should include specialized departments, patient wards, diagnostic centers, and all essential healthcare facilities.</li>
              <li><strong>Recreation and Residential Area:</strong> This area will provide recreational spaces and residential units. It should include parks, gardens, sports facilities, and other recreational amenities to promote a healthy and active lifestyle for residents and visitors.</li>
              <li><strong>Shopping Center and Restaurants:</strong> The facility should incorporate a dedicated area for retail shops, boutiques, and a shopping center to cater to the community&#39;s shopping needs. Additionally, a variety of restaurants and dining options should be integrated to offer diverse culinary experiences.</li>
              <li><strong>Art Gallery:</strong> An art gallery within the facility will serve as a platform to promote local and international art, hosting exhibitions, cultural events, and workshops. It should provide a visually appealing and immersive space for art enthusiasts.</li>
              <li><strong>Water Sports Club and Marina:</strong> This section should include facilities for water sports activities, such as sailing, kayaking, and jet skiing. A marina or boat dock will provide mooring spaces for boats and yachts, catering to boating enthusiasts and tourists.</li>
              <li><strong>Fish and Food Market:</strong> The facility should include a designated area for a vibrant fish and food market. This space will serve as a hub for local fishermen, farmers, and food vendors to showcase and sell their produce, promoting local and sustainable food practices.</li>
              <li><strong>Embankment Structure and Park:</strong> An embankment structure along the waterfront will allow for activities by the water. It should include a park for children, walkways, seating areas, and recreational spaces that connect with the natural surroundings, offering a serene and enjoyable experience.</li>
              <li><strong>Hotel:</strong> The facility should incorporate a hotel that provides accommodation options for visitors, tourists, and business travelers. The design should ensure comfort, convenience, and an aesthetically pleasing ambiance.</li>
              <li><strong>Office Facility:</strong> Additionally, there should be a separate facility to house offices. This space will accommodate various businesses, startups, and organizations, providing a conducive work environment.</li>
            </ol>
            <p>The design of this multifaceted facility should prioritize functionality, sustainability, accessibility, and aesthetic appeal. It should seamlessly integrate the different sections, creating a cohesive and harmonious environment that enhances the quality of life for the community and attracts visitors from near and far.</p>
          </div>

          {/* Sponsored */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Sponsored</h3>
            <p>Dear Participants,</p>
            <p>We are delighted to announce that the contest is absolutely free for all individual participants. While a registration fee was initially listed, we are thrilled to inform you that our generous sponsors have graciously decided to fully fund the entire process for each and every individual participant, as a way to encourage and support your creative endeavors.</p>
            <p>This means that you can now submit your designs without any financial obligation. Our sponsors firmly believe in the power of fostering creativity and providing equal opportunities for all aspiring architects, designers, and visionaries. Their commitment to your success and the advancement of the field is truly commendable.</p>
            <p>Please note that this fee waiver applies specifically to individual participants. For institutions, firms, and university projects, the standard registration fee remains in place. However, we want to assure you that the commitment to supporting and recognizing your exceptional work remains unwavering.</p>
            <p>We strongly believe that creativity knows no boundaries, and by removing financial barriers, we aim to empower each and every one of you to participate and share your unique perspectives. We are deeply committed to fostering an inclusive and diverse environment that values and celebrates your talent.</p>
            <p>We extend our heartfelt gratitude to our sponsors for their generous support and unwavering commitment to nurturing the next generation of architectural excellence. Together, we will create a platform that truly embodies the spirit of encouragement, growth, and collaboration.</p>
            <p>Thank you for your understanding, and we look forward to receiving your remarkable submissions.</p>
            <p>Warm regards,</p>
          </div>

          {/* Certificates */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Certificates</h3>
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-1">First Place Certificate:</h4>
              <ul className="list-disc list-inside">
                <li>A prestigious certificate recognizing your first-place achievement in the Jmqafri contest.</li>
                <li>The certificate will acknowledge your outstanding design, innovation, and dedication to excellence in architecture and design.</li>
                <li>It serves as a testament to your skills and creativity, solidifying your position as a top performer in the competition.</li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-1">Second Place Certificate:</h4>
              <ul className="list-disc list-inside">
                <li>An esteemed certificate honoring your second-place position in the Jmqafri contest.</li>
                <li>The certificate will highlight your impressive design skills, problem-solving abilities, and thoughtful approach to addressing urban, environmental, and social challenges.</li>
                <li>It showcases your talent and places you among the standout participants in the competition.</li>
              </ul>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-medium mb-1">Third Place Certificate:</h4>
              <ul className="list-disc list-inside">
                <li>A distinguished certificate commending your third-place achievement in the Jmqafri contest.</li>
                <li>The certificate recognizes your exceptional design proposal, spatial and technical justification, and contribution to creating sustainable and impactful solutions.</li>
                <li>It symbolizes your talent and commitment to architectural excellence, affirming your position as a top contender in the competition.</li>
              </ul>
            </div>
          </div>

        <Link href='/architecture/register'>
        <button className='btn text-white hover:bg-gray-600 w-full'>Register</button>
        </Link>

        <Link href='/architecture/submit'>
        <button className='btn text-white hover:bg-gray-600 w-full my-5'>Submit Design</button>
        </Link>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default page
