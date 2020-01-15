import React from "react";
//import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import Loader from "react-loader-spinner";
import Switch from "react-switch";
import Table from "../_common/Table";

const DevicesCard = ({ devices, loading, onSwitchChange, location }) => {
  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardHeader>
              <h3 className="title">Devices</h3>
              <p className="category">All devices registered on the API</p>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg="12" md="12" sm="12" className="text-center">
                  {loading ? (
                    <Loader
                      type="Puff"
                      color="#00BFFF"
                      height="100"
                      width="100"
                    />
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
                            <td>{item._id}</td>
                            <td>
                              <Link to={`${location.pathname}/${item._id}`}>
                                {item.name}
                              </Link>
                            </td>
                            <td>{item.ttnInfo ? item.ttnInfo.devId : ""}</td>
                            <td>
                              {item.isActive ? (
                                <i
                                  className="fa fa-check fa-2x"
                                  style={{ color: "green" }}
                                ></i>
                              ) : (
                                <i
                                  className="fa fa-times fa-2x"
                                  style={{ color: "red" }}
                                />
                              )}
                            </td>
                            <td>{item.description}</td>
                            <td>
                              {`(${item.location.lat} , ${item.location.lng})`}{" "}
                              <br /> {`${item.location.description}`}
                            </td>
                            <td>
                              {
                                <Switch
                                  onChange={checked =>
                                    onSwitchChange(checked, item._id)
                                  }
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
    </>
  );
};

export default DevicesCard;
