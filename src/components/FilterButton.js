import "./FilterButton.css";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";

const FilterButton = ({ itemList, selectedPlanet, handleSelected }) => {
  //render method to display the list of avaiable planet
  const displayList = itemList.map((item, index) => {
    return (
      <Dropdown.Item key={index} onClick={() => handleSelected(item)}>
        {item}
      </Dropdown.Item>
    );
  });

  return (
    <DropdownButton
      id="dropdown-basic-button"
      title={`NEO orbiting arround: ${selectedPlanet}`}
    >
      <Dropdown.ItemText>Choose a planet:</Dropdown.ItemText>
      {displayList}
    </DropdownButton>
  );
};

export default FilterButton;
