import "./FilterButton.css";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";

const FilterButton = () => {
  return (
    <DropdownButton id="dropdown-basic-button" title="Filter Button">
      <Dropdown.ItemText>Choose a planet:</Dropdown.ItemText>
    </DropdownButton>
  );
};

export default FilterButton;
