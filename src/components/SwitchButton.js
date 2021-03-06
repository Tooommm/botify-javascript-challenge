import "./SwitchButton.css";

import Form from "react-bootstrap/Form";
import React from "react";

const SwitchButton = ({ toggleChart }) => {
  return (
    <div>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="Display Chart"
        onClick={() => toggleChart()}
      />
    </div>
  );
};

export default SwitchButton;
