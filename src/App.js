import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useState } from "react";

import FilterButton from "./components/FilterButton";
import NeoChart from "./components/NeoChart";
import NeoTable from "./components/NeoTable";
import SwitchButton from "./components/SwitchButton";
import axios from "axios";
import setUpData from "./helpers/setUpData";

function App() {
  const [data, setData] = useState([]); //store data from the NASA api
  const [itemList, setItemList] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState("Earth"); //Define Earth like default planet for the filter
  const [filteredData, setFilteredData] = useState([]);
  const [activeChart, setActiveChart] = useState(false); // by default we display a table to expose data

  const handleSelected = (planet = "Earth") => {
    // passing to the filter button this finction change the selected planet and filter data
    setSelectedPlanet(planet);
    const newData = data.filter((item) => item.orbiting_body === planet);
    setFilteredData(newData);
  };

  //function to change active Chart
  const toggleChart = () => {
    setActiveChart(!activeChart);
  };

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

  useEffect(() => {
    // Set the list with all planet avaiable for filtering
    const defineList = () => {
      const array = data.map((item) => item.orbiting_body);
      setItemList([...new Set(array)]);
    };
    defineList();
  }, [data]);

  //initialize the filtred list
  useEffect(handleSelected, [data]);

  return (
    <div>
      <SwitchButton toggleChart={toggleChart} />
      <FilterButton
        itemList={itemList}
        selectedPlanet={selectedPlanet}
        handleSelected={handleSelected}
      />
      {activeChart ? (
        <NeoChart data={filteredData} />
      ) : (
        <NeoTable data={filteredData}></NeoTable>
      )}
    </div>
  );
}

export default App;
