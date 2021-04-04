import React from "react";
import Table from "react-bootstrap/Table";

const NeoTable = ({ data }) => {
  const renderBody = () => {
    return (
      data &&
      data.map(({ name, min, max }) => {
        return (
          <tr key={name}>
            <td>{name}</td>
            <td>{Math.round(min * 100) / 100}</td>
            <td>{Math.round(max * 100) / 100}</td>
          </tr>
        );
      })
    );
  };

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
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
