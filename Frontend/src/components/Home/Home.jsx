import React from 'react'
import Navbar from '../Shared/Navbar'
import HeroSection from './HeroSection';
import Carouselctg from './Carouselctg'
import LatestJobs from './LatestJobs'
import Footer from  '../Shared/Footer'

function Home() {
  return (
    <div>
        <Navbar />
        <HeroSection />
        <Carouselctg />
        <LatestJobs />
        <Footer />
    </div>
  )
}

export default Home