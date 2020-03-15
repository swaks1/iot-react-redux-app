import React from "react";
//import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import ReactTooltip from "react-tooltip";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import Loader from "react-loader-spinner";
import Switch from "react-switch";
import Table from "../_common/Table";

import CreateNewDeviceDialog from "./CreateNewDeviceDialog";

const DevicesCard = ({
  devices,
  loading,
  onSwitchChange,
  showDialog,
  onDialogAction,
  onDeleteDeviceClick,
  location
}) => {
  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <Row>
                <Col md="12" className="mt-2 pl-5">
                  <h3 style={{ display: "inline-block", marginRight: "10px" }} className="title">
                    IOT Devices
                  </h3>
                  <ReactTooltip effect="solid" />
                  <Button
                    color="success"
                    size="sm"
                    id="addNewTTNDevice"
                    onClick={() => {
                      onDialogAction(null, "OPEN");
                    }}
                    data-tip="Create new IOT device"
                  >
                    +
                  </Button>
                  <p className="category">All IoT devices registered on the API</p>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg="12" md="12" sm="12" className="text-center">
                  {loading ? (
                    <Loader type="Puff" color="#00BFFF" height="100" width="100" />
                  ) : (
                    <Table>
                      <thead className="text-primary">
                        <tr>
                          <th>Id</th>
                          <th>Name</th>
                          <th>TTN Dev Id</th>
                          <th>Is Active</th>
                          <th>Description</th>
                          <th>Location</th>
                          <th>On Dashboard</th>
                        </tr>
                      </thead>
                      <tbody>
                        {devices.map((item, index) => (
                          <tr key={item._id}>
                            <td>
                              {item._id}{" "}
                              <span
                                id="deleteDevice"
                                style={{
                                  color: "red",
                                  cursor: "pointer",
                                  fontSize: "0.7em",
                                  opacity: "0.4"
                                }}
                                onClick={() => {
                                  onDeleteDeviceClick(item._id);
                                }}
                              >
                                <i className="fa fa-trash"></i>
                              </span>
                            </td>
                            <td>
                              <Link to={`${location.pathname}/${item._id}`}>{item.name}</Link>
                            </td>
                            <td>{item.ttnInfo ? item.ttnInfo.devId : ""}</td>
                            <td>
                              {item.isActive ? (
                                <i className="fa fa-check fa-2x" style={{ color: "green" }}></i>
                              ) : (
                                <i className="fa fa-times fa-2x" style={{ color: "red" }} />
                              )}
                            </td>
                            <td>{item.description}</td>
                            <td>
                              {`(${item.location.lat} , ${item.location.lng})`} <br /> {`${item.location.description}`}
                            </td>
                            <td>
                              {
                                <Switch
                                  onChange={checked => onSwitchChange(checked, item._id)}
                                  checked={item.isAddedToDashboard}
                                />
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {showDialog ? (
        <CreateNewDeviceDialog
          confirmAction={iotDevice => {
            onDialogAction(iotDevice, "CONFIRMED");
          }}
          denyAction={() => {
            onDialogAction(null, "DENIED");
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default DevicesCard;
