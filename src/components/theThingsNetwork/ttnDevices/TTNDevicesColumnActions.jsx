import React from "react";

import { Card, Row, Col, Button } from "reactstrap";

import LoaderOverlay from "../../_common/LoaderOverlay";

const TTNDevicesColumnActions = ({
  editMode,
  showOverlay,
  currentDevice,
  selectedDevice,
  onButtonClick
}) => {
  return editMode == false ? (
    <>
      <LoaderOverlay isLoading={showOverlay}>
        <Button
          color="danger"
          size="sm"
          id={`deleteBtn_${currentDevice.devId}`}
          onClick={onButtonClick}
        >
          Delete
        </Button>
        {" | "}
        <Button
          color="default"
          size="sm"
          id={`editBtn_${currentDevice.devId}`}
          onClick={onButtonClick}
        >
          Edit
        </Button>
      </LoaderOverlay>
    </>
  ) : currentDevice.devId == selectedDevice.devId ? (
    <>
      <LoaderOverlay isLoading={showOverlay}>
        {" "}
        <Button
          color="success"
          size="sm"
          id={`updateBtn_${currentDevice.devId}`}
          onClick={onButtonClick}
        >
          Update
        </Button>
        {" | "}
        <Button
          color="danger"
          size="sm"
          id={`cancelBtn_${currentDevice.devId}`}
          onClick={onButtonClick}
        >
          Cancel
        </Button>
      </LoaderOverlay>
    </>
  ) : (
    <span> </span>
  );
};

export default TTNDevicesColumnActions;
