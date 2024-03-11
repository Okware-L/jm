import Navbar from "./components/Navbar";
import Hero from "./components/Hero"
import Categories from './components/categories'
import About from './components/About'
import Insight from './components/Insight'
import Blog from './components/Blog'
import Footer from './components/Footer'



export default function Home() {
  return (


  <body className="font-times" >
   <Navbar/>
   <Hero/>
   <Categories/>
   <About/>
   
   <Insight/>
   <Blog/>
   <Footer/>
  </body>

  );
}

