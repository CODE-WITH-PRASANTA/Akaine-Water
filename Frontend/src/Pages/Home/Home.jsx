import React from 'react'
import HomeService from '../../Component/HomeService/HomeService'
import HomeReview from '../../Component/HomeReview/HomeReview'
import HomeAboutCompany from '../../Component/HomeAboutCompany/HomeAboutCompany'
import HomeOurProducts from '../../Component/HomeOurProducts/HomeOurProducts'
import HomeWhyAguapure from '../../Component/HomeWhyAguapure/HomeWhyAguapure'
import HomeDeliveredProcess from '../../Component/HomeDeliveredProcess/HomeDeliveredProcess'
import HomeGetInTouch from '../../Component/HomeGetInTouch/HomeGetInTouch'
import HomeTestimonials from '../../Component/HomeTestimonials/HomeTestimonials'
import HomeRecentBlogPost from '../../Component/HomeRecentBlogPost/HomeRecentBlogPost'

const Home = () => {
  return (
    <div>
      <HomeService/>
      <HomeReview/>
      <HomeAboutCompany/>
      <HomeOurProducts/>
      <HomeWhyAguapure/>
      <HomeDeliveredProcess/>
      <HomeGetInTouch/>
      <HomeTestimonials/>
      <HomeRecentBlogPost/>

    </div>

  )
}

export default Home