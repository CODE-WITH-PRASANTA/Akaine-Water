import React from 'react'
import HomeService from '../../Component/HomeService/HomeService'
import HomeReview from '../../Component/HomeReview/HomeReview'
import HeroSection from '../../Component/HeroSection/HeroSection'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <HomeService/>
      <HomeReview/>

    </div>

  )
}

export default Home