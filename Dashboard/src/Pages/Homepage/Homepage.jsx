import React, { useMemo, useState, useEffect } from "react";
import "./Homepage.css";
import BodyHeader from "./../../Components/BodyHeader/BodyHeader";
import BodyChart from "./../../Components/BodyChart/BodyChart";
import BodyWidgets from "./../../Components/BodyWidget/BodyWidgets";
import axios from "axios";

function Homepage() {
  const Months = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const res = await axios.get("http://localhost:8888/api/users/stats", {
          headers: {
            token:
              "Bearer " +
              JSON.parse(localStorage.getItem("dashboard")).accessToken,
          },
        });
        const sortedData = res.data.sort(function (a, b) {
          return a._id - b._id;
        });

        sortedData.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: Months[item._id - 1], "New Users": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getUserStats();
  }, [Months]);

  return (
    <div className="homepageContainer">
      <BodyHeader />
      <BodyChart data={userStats} title="User Analytics" dataKey="New Users" />
      <BodyWidgets />
    </div>
  );
}

export default Homepage;
