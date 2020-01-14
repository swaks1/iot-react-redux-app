import React from "react";

import { Card, Row, Col, Button } from "reactstrap";

import LoaderOverlay from "../../_common/LoaderOverlay";

const TTNDevicesColumnActions = ({
  editMode,
  actionExecuting,
  currentDevice,
  selectedDevice,
  onButtonClick
}) => {
  return editMode == false ? (
    <>
      <Button
        color="danger"
        size="sm"
        id={`deleteBtn_${currentDevice.devId}`}
        disabled={actionExecuting}
        onClick={onButtonClick}
      >
        Delete
      </Button>
      {" | "}
      <Button
        color="default"
        size="sm"
        id={`editBtn_${currentDevice.devId}`}
        disabled={actionExecuting}
        onClick={onButtonClick}
      >
        Edit
      </Button>
    </>
  ) : currentDevice.devId == selectedDevice.devId ? (
    <>
      {" "}
      <Button
        color="success"
        size="sm"
        id={`updateBtn_${currentDevice.devId}`}
        disabled={actionExecuting}
        onClick={onButtonClick}
      >
        Update
      </Button>
      {" | "}
      <Button
        color="danger"
        size="sm"
        id={`cancelBtn_${currentDevice.devId}`}
        disabled={actionExecuting}
        onClick={onButtonClick}
      >
        Cancel
      </Button>
    </>
  ) : (
    <span> </span>
  );
};

export default TTNDevicesColumnActions;
