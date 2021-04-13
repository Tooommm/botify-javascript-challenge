import "./Error.css";

import { Alert, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

const Error = ({ error }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    error.length === 0 ? setShow(false) : setShow(true);
  }, [error]);

  const displayError = () => {
    const message = error.message;
    const http_error = error.response?.data?.http_error;
    console.log(http_error);

    if (message && http_error) {
      return (
        <div>
          <p>{message}</p>
          <p> {http_error} </p>
        </div>
      );
    } else {
      return <p>{message}</p>;
    }
  };

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <div className="alert-body">
          <Alert.Heading>Oh snap! You got an Error!</Alert.Heading>
          {displayError()}
          {/* <p>{error.response.statusText}</p> */}
          <Button
            variant="outline-danger"
            onClick={() => window.location.reload()}
          >
            Refresh App
          </Button>
        </div>
      </Alert>
    );
  }
  return <></>;
};

export default Error;
