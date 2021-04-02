import "./FilterButton.css";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";

const FilterButton = ({ itemList }) => {
  const displayList = itemList.map((item, index) => {
    return <Dropdown.Item key={index}>{item}</Dropdown.Item>;
  });

  return (
    <DropdownButton id="dropdown-basic-button" title="Filter Button">
      <Dropdown.ItemText>Choose a planet:</Dropdown.ItemText>
      {displayList}
    </DropdownButton>
  );
};

export default FilterButton;
