import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useState } from "react";

import FilterButton from "./components/FilterButton";
import NeoChart from "./components/NeoChart";
import axios from "axios";
import setUpData from "./helpers/setUpData";

function App() {
  const [data, setData] = useState([]); //store data from the NASA api

  useEffect(() => {
    // Fetching datafrom the api, just run once
    const fecthData = async () => {
      await axios
        .get("https://api.nasa.gov/neo/rest/v1/neo/browse?", {
          params: {
            // later if we use a private api it we'll be easier to hide api key in .env file
            api_key: "DEMO_KEY",
          },
        })
        .then((response) =>
          // store information in data using helpers setUpData
          setData(setUpData(response.data.near_earth_objects))
        )
        .catch((error) => {
          //handle error by console log error response from the NASA api
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    };
    fecthData();
  }, []);

  console.log(data);
  return (
    <div>
      <FilterButton />
      <NeoChart data={data}></NeoChart>
    </div>
  );
}

export default App;
