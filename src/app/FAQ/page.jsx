"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

const page = () => {
  return (
    <>
      
      <div className="min-h-screen bg-indigo-100 p-5 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-20 text-center text-3xl font-light text-indigo-900"
        >
          F.A.Q
        </motion.h1>
        <div className="flex justify-center text-indigo-900">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the Jmqafri Network?</AccordionTrigger>
              <AccordionContent>
                The Jmqafri Network is a community of business leaders dedicated
                to fostering collaboration, growth, and innovation. It brings
                together entrepreneurs, executives, and industry experts from
                various sectors to create a powerful ecosystem that drives
                meaningful change in the business world.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Who can join the Jmqafri Network?
              </AccordionTrigger>
              <AccordionContent>
                The Jmqafri Network welcomes individuals from diverse
                backgrounds, including startup founders, seasoned CEOs, and
                professionals at all stages of their careers. We embrace
                business leaders from various industries who share our vision of
                advancing entrepreneurship and sustainable business practices.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How can I join the Jmqafri Network?
              </AccordionTrigger>
              <AccordionContent>
                To join the Jmqafri Network, you can visit our website and
                navigate to the membership section. There, you will find
                information on the application process and membership benefits.
                Simply follow the instructions provided to submit your
                application.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What are the benefits of joining the Jmqafri Network?
              </AccordionTrigger>
              <AccordionContent>
                By joining the Jmqafri Network, you gain access to a vibrant
                community of business leaders, networking opportunities, and
                valuable resources. You can connect with like-minded
                individuals, participate in networking events and conferences,
                access educational resources, and collaborate on innovative
                projects.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                What types of industries are represented in the Jmqafri Network?
              </AccordionTrigger>
              <AccordionContent>
                The Jmqafri Network encompasses a diverse range of industries,
                including technology, finance, healthcare, manufacturing, and
                more. We believe that the richness of our network lies in the
                diverse perspectives and experiences of our members.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                What kind of events does the Jmqafri Network organize?
              </AccordionTrigger>
              <AccordionContent>
                The Jmqafri Network organizes various events throughout the
                year, including networking events, conferences, webinars,
                workshops, and masterclasses. These events provide opportunities
                to connect with fellow members, learn from industry experts, and
                stay updated on the latest trends and insights.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>
                How does the Jmqafri Network support personal growth and
                development?
              </AccordionTrigger>
              <AccordionContent>
                The Jmqafri Network provides a platform for continuous learning
                and personal growth. We offer resources such as webinars,
                workshops, and masterclasses on topics including leadership
                development, strategic planning, emerging technologies, and
                market trends. These resources empower members to enhance their
                skills and knowledge.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>
                Does the Jmqafri Network have a focus on social responsibility?
              </AccordionTrigger>
              <AccordionContent>
                Yes, the Jmqafri Network encourages its members to embrace
                corporate social responsibility, sustainable business practices,
                and ethical leadership. We believe in making a positive impact
                on society and the environment and support initiatives that
                drive economic growth alongside social and environmental
                progress.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>
                Can I collaborate with other members of the Jmqafri Network on
                projects?
              </AccordionTrigger>
              <AccordionContent>
                Absolutely! Collaboration is one of the key principles of the
                Jmqafri Network. As a member, you have the opportunity to
                connect with other professionals, share ideas, seek advice, and
                form partnerships. These collaborations can lead to
                groundbreaking solutions and innovative projects.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger>
                How can I contact the Jmqafri Network for further inquiries?
              </AccordionTrigger>
              <AccordionContent>
                If you have any further inquiries or require additional
                information, you can reach out to us through the contact form on
                our website. Our team will be happy to assist you and provide
                the necessary support.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default page;
