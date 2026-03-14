
import Hero from "../components/Hero";
import Categories from "../components/categories";
import About from "../components/About";
import Insight from "../components/Insight";
import Posts from "@/components/Blog";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";

export default async function Home() {
  return (
    <div className="font-times">
      
      <Hero />
      <Categories />
      <About />
      <Posts />
      <Insight /> 
      <Newsletter />
      <Footer />
    </div>
  );
}
