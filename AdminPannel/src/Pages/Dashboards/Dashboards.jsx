import React from "react";
import DashboardsFirst from "../../Components/DashboardsFirst/DashboardsFirst";
import Dashboardsecond from "../../Components/Dashboardsecond/Dashboardsecond";
import DashboardThird from "../../Components/DashboardThird/DashboardThird";
import Dashboardfourth from "../../Components/Dashboardfourth/Dashboardfourth";
import DashboardsFive from "../../Components/DashboardsFive/DashboardsFive";

const Dashboards = () => {
  return (
    <div>
      <DashboardsFirst/>
      <Dashboardsecond/>
      <DashboardThird/>
      <Dashboardfourth/>
      <DashboardsFive/>
      
    </div>
  );
};

export default Dashboards;