import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import React, { useEffect, useState } from "react";

import Error from "./components/Error";
import FilterButton from "./components/FilterButton";
import NeoChart from "./components/NeoChart";
import NeoTable from "./components/NeoTable";
import Spinner from "react-bootstrap/Spinner";
import SwitchButton from "./components/SwitchButton";
import axios from "axios";
import setUpData from "./helpers/setUpData";

function App() {
  const [neos, setNeos] = useState([]); //store neos from the NASA api
  const [planetsList, setPlanetsList] = useState([]); // Store the list of planets for the filter button
  const [selectedPlanet, setSelectedPlanet] = useState("Earth"); // Define Earth like default planet for the filter
  const [filteredNeos, setFilteredNeos] = useState([]);
  const [activeChart, setActiveChart] = useState(false); // by default we display a table to expose data
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const handleSelected = (planet = "Earth") => {
    // passing to the filter button this function change the selected planet and filter neos
    setSelectedPlanet(planet);
    const filteredNeos = neos.filter((neo) => neo.orbiting_body === planet);
    setFilteredNeos(filteredNeos);
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
          const neos = setUpData(response.data.near_earth_objects);
          // Set neos, planetList and filteredNeos
          setNeos(neos);
          setPlanetsList([
            // return an array with all orbiting_body of each neos. new Set to remove all duplicates
            ...new Set(neos.map((neo) => neo.orbiting_body)),
          ]);
          setFilteredNeos(neos.filter((neo) => neo.orbiting_body === "Earth"));
          setLoading(false);
        })
        .catch((error) => {
          //handle error by catching them and pass to the Error component
          setError(error);
        });
    };
    fetchData();
    // next comment is to remove the esllint console warning, give [] for argument to be sure useEffect just run when app is loaded and fetching api only one time.
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Error error={error} />
      <SwitchButton toggleChart={toggleChart} />
      <FilterButton
        planetsList={planetsList}
        selectedPlanet={selectedPlanet}
        handleSelected={handleSelected}
      />
      {loading ? (
        <Spinner className="spinner" animation="border" variant="primary" />
      ) : activeChart ? (
        <NeoChart data={filteredNeos} />
      ) : (
        <NeoTable data={filteredNeos}></NeoTable>
      )}
    </div>
  );
}

export default App;
