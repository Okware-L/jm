"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TraderDueDiligenceForm from "./components/TraderDueDiligenceForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const growthData = [
  { year: "2019", value: 100 },
  { year: "2020", value: 120 },
  { year: "2021", value: 150 },
  { year: "2022", value: 200 },
  { year: "2023", value: 280 },
];

const TradeCenterPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 pt-32">
        <h1 className="mb-2 text-5xl font-semibold text-indigo-900">
          JM-Qafri Methuselah
        </h1>
        <p className="mb-8 text-xl text-gray-600">
          Bridging Centuries of Trade with Cutting-Edge Innovation
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
              <CardDescription>
                Reshaping global trade for the future
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                At JM-Qafri Methuselah, we&apos;re not just trading goods;
                we&apos;re trading in possibilities. Our unique blend of
                historical expertise and technological innovation positions us
                at the forefront of the global market, ready to capitalize on
                opportunities others can&apos;t even see.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Market Opportunity</CardTitle>
              <CardDescription>
                Tapping into a $10T+ global market
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-2">
                <li>Exclusive access to rare and high-value commodities</li>
                <li>AI-driven predictive analytics for market trends</li>
                <li>Blockchain-secured provenance for antiquities</li>
                <li>Sustainable, ethically-sourced exotic goods</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Growth Trajectory</CardTitle>
              <CardDescription>
                Consistent year-over-year growth
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Competitive Advantage</CardTitle>
              <CardDescription>What sets us apart</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Badge className="mr-2">Heritage</Badge>Centuries of trade
                  expertise
                </li>
                <li>
                  <Badge className="mr-2">Innovation</Badge>Cutting-edge AI and
                  blockchain integration
                </li>
                <li>
                  <Badge className="mr-2">Network</Badge>Unparalleled global
                  connections
                </li>
                <li>
                  <Badge className="mr-2">Exclusivity</Badge>Access to rare and
                  unique markets
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Opportunity</CardTitle>
              <CardDescription>
                Be part of the future of global trade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                We&apos;re seeking strategic partners to fuel our expansion into
                emerging markets and further develop our proprietary AI-driven
                trade platforms.
              </p>

              <Button className="w-full">Request Investor Package</Button>
            </CardContent>
          </Card>
        </div>
        <section>
          <div className="m-5 p-5 sm:p-10">
            <TraderDueDiligenceForm />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default TradeCenterPage;
