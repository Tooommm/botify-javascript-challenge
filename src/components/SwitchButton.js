import "./SwitchButton.css";

import Form from "react-bootstrap/Form";
import React from "react";

const SwitchButton = () => {
  return (
    <div>
      <Form.Check type="switch" id="custom-switch" label="Display Chart" />
    </div>
  );
};

export default SwitchButton;
