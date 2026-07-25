import React from 'react'
import TotalOrders from '../../Components/TotalOrders/TotalOrders'
import NextDelivery from '../../Components/NextDelivery/NextDelivery'
import WaterConsumption from '../../Components/WaterConsumption/WaterConsumption'

const MainDashboard = () => {
  return (
    <div>

    <TotalOrders/>
    <NextDelivery/>
    <WaterConsumption/>
    </div>
  )
}

export default MainDashboard