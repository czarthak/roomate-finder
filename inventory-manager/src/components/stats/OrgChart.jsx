import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Chart } from "react-google-charts";

export const OrgChart = () => {
  const [info, setInfo] = useState();

  useEffect(() => {
    // Fetch user information when the component mounts
    getOrgStats();
  }, []); // Empty dependency array ensures the effect runs once

  const getOrgStats = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:8080/organization/all/stats"
      );
      const some = [["Location", "Number of Items"], ...response.data.data];
      setInfo(some);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const options = {
    title: "Organizations by Category",
  };

  return (
    <Chart
      chartType="PieChart"
      data={info}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
};
export default OrgChart;
