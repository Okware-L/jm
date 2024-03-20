import Navbar from "../components/Navbar";
import Hero from "../components/Hero"
import Categories from '../components/categories'
import About from '../components/About'
import Insight from '../components/Insight'

import Footer from '../components/Footer'
import Newsletter from '../components/Newsletter'
import { SanityDocument } from "next-sanity";

import Posts from "@/components/Blog";
import { loadQuery } from "@/sanity/lib/store";
import { POSTS_QUERY } from "@/sanity/lib/queries";



export default async function Home() {

  const initial = await loadQuery<SanityDocument[]>(POSTS_QUERY);

  return (


  <body className="font-times" >
   <Navbar/>
   <Hero/>
   <Categories/>
   <About/>
   <Insight/>
   <Posts posts={initial.data} />
    <Newsletter/>
   <Footer/>
  </body>

  );
}

