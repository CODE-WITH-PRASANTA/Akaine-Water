import React from 'react'
import ServiceBreadcrumb from '../../Component/ServiceBreadcrumb/ServiceBreadcrumb'
import MainServices from '../../Component/MainServices/MainServices'
import EssentialHealth from '../../Component/EssentialHealth/EssentialHealth'
import OtherServices from '../../Component/OtherServices/OtherServices'
import AlkaDropsPricing from '../../Component/AlkaDropsPricing/AlkaDropsPricing'
import Testimonials from '../../Component/Testimonials/Testimonials'

const OurServices = () => {
  return (
    <div>
        <ServiceBreadcrumb />
        <MainServices /> 
        < EssentialHealth/>
       <OtherServices />
        <AlkaDropsPricing />
        <Testimonials />
    </div>
  )
}

export default OurServices