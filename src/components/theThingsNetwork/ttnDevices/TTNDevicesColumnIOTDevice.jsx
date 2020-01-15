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
  const connectedDeviceExists = device => {
    return device.connectedIotDevice != null && device.connectedIotDevice._id;
  };
  return editMode == false && connectedDeviceExists(currentDevice) ? (
    <>
      <Link to={`${redirectLocation}/${currentDevice.connectedIotDevice._id}`}>
        {currentDevice.connectedIotDevice.name}
      </Link>
    </>
  ) : editMode == true && currentDevice.devId == selectedDevice.devId ? (
    <select
      className="form-select"
      value={
        connectedDeviceExists(selectedDevice)
          ? selectedDevice.connectedIotDevice._id
          : ""
      }
      onChange={onSelectChange}
    >
      <option value="">{""}</option>
      {connectedDeviceExists(currentDevice) ? (
        <option value={currentDevice.connectedIotDevice._id}>
          {currentDevice.connectedIotDevice.name}
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
      {connectedDeviceExists(currentDevice) ? (
        <span>{currentDevice.connectedIotDevice.name}</span>
      ) : (
        <span></span>
      )}
    </>
  );
};

export default TTNDevicesColumnIOTDevice;
