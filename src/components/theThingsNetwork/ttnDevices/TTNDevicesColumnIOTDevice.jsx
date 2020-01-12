import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "reactstrap";

import LoaderOverlay from "../../_common/LoaderOverlay";

const TTNDevicesColumnIOTDevice = ({
  editMode,
  redirectLocation,
  currentDevice,
  selectedDevice,
  notConnectedIotDevices,
  onSelectChange
}) => {
  return editMode == false &&
    currentDevice.connectedIotDevice != null &&
    currentDevice.connectedIotDevice._id ? (
    <>
      <Link to={`${redirectLocation}/${currentDevice.connectedIotDevice._id}`}>
        {currentDevice.connectedIotDevice.name}
      </Link>
    </>
  ) : editMode == true && currentDevice.devId == selectedDevice.devId ? (
    <select
      value={
        selectedDevice.connectedIotDevice._id
          ? selectedDevice.connectedIotDevice._id
          : ""
      }
      onChange={onSelectChange}
    >
      <option value="">{""}</option>
      {selectedDevice.connectedIotDevice._id ? (
        <option value={selectedDevice.connectedIotDevice._id}>
          {selectedDevice.connectedIotDevice.name}
        </option>
      ) : (
        <></>
      )}
      {notConnectedIotDevices.map(item => (
        <option value={item._id} key={item._id}>
          {item.name}
        </option>
      ))}
    </select>
  ) : (
    <>
      <span></span>
    </>
  );
};

export default TTNDevicesColumnIOTDevice;
