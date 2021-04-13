import "bootstrap/dist/css/bootstrap.min.css";

import React, { useEffect, useState } from "react";

import Error from "./components/Error";
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
  const [error, setError] = useState("");

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
    const fetchData = () => {
      axios
        .get("https://api.nasa.gov/neo/rest/v1/neo/browse?", {
          params: {
            // later if we use a private api it we'll be easier to hide api key in .env file
            api_key: "DEMO_KEY",
          },
        })
        .then((response) => {
          const dataObject = setUpData(response.data.near_earth_objects);
          // store information in data using helpers setUpData
          setData(dataObject);
          setItemList([
            ...new Set(dataObject.map((item) => item.orbiting_body)),
          ]);
          setFilteredData(
            dataObject.filter((item) => item.orbiting_body === "Earth")
          );
        })
        .catch((error) => {
          //handle error by console log error response from the NASA api
          setError(error);
        });
    };
    // Set the list with all planet avaiable for filtering
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Error error={error} />
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
