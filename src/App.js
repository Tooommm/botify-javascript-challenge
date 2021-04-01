import React, { useEffect, useState } from "react";

import axios from "axios";
import setUpData from "./helpers/setUpData";

function App() {
  const [data, setData] = useState([]); //store data from the NASA api

  useEffect(() => {
    const fecthData = async () => {
      await axios
        .get("https://api.nasa.gov/neo/rest/v1/neo/browse?", {
          params: {
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
  return <div>dataChart</div>;
}

export default App;
