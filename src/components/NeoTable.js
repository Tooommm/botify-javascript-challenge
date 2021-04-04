import "./NeoTable.css";

import React from "react";
import Table from "react-bootstrap/Table";

const NeoTable = ({ data }) => {
  // define the table body
  const renderBody = () => {
    return (
      data &&
      data.map(({ name, min, max }, index) => {
        const id = index + 1; //Define an id

        return (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{Math.round(min * 100) / 100}</td>
            <td>{Math.round(max * 100) / 100}</td>
          </tr>
        );
      })
    );
  };

  return (
    <Table striped bordered hover size="sm" id="neo-table">
      <thead>
        <tr>
          <th></th>
          <th>Neo Name</th>
          <th>Min Estimated Diameter (km)</th>
          <th>Max estimated Diameter</th>
        </tr>
      </thead>
      <tbody>{renderBody()}</tbody>
    </Table>
  );
};

export default NeoTable;
