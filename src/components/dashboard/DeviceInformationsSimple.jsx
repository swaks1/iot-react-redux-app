import React from "react";
import { Link } from "react-router-dom";

import { Card, Row, Col, Button } from "reactstrap";
import LoaderOverlay from "../_common/LoaderOverlay";

const DeviceInformationsSimple = ({
  lg,
  md,
  sm,
  device,
  deviceLoading
}) => {
  return (
    <>
      <Col lg={lg} md={md} sm={sm}>
        <Card style={{ background: "transparent", padding: "10px 15px" }}>
          <h4 className="text-center font-italic font-weight-light">
            Device Information &nbsp;
          </h4>
          <LoaderOverlay isLoading={deviceLoading}>
            <Row>
              <Col className="text-left" md={5}>
                <span>Name:</span>
              </Col>
              <Col className="text-left" md={7} style={{ paddingLeft: "0px" }}>
                <span className="text-info text-uppercase">
                  <Link to={`/app/devices/${device._id}`}>{device.name}</Link>
                </span>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <hr />
              </Col>
              <Col md={12} style={{ fontSize: "0.8em" }}>
                <i className="fa fa-wifi"></i> WiFi
              </Col>
            </Row>

            <Row style={{ marginTop: "10px " }}>
              <Col className="text-left" md={5} style={{ fontSize: "0.9em" }}>
                <span>Active:</span>
              </Col>
              <Col className="text-left" md={7} style={{ paddingLeft: "0px" }}>
                {device.isActive ? (
                  <i className="fa fa-check fa" style={{ color: "green" }}></i>
                ) : (
                  <i className="fa fa-times fa" style={{ color: "red" }} />
                )}
              </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col className="text-left" md={5} style={{ fontSize: "0.9em" }}>
                <span>Interval:</span>
              </Col>
              <Col className="text-left" md={7} style={{ paddingLeft: "0px" }}>
                <span className="text-muted">{`${device.sendDataDelay} ms`}</span>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <hr />
              </Col>
              <Col md={12} style={{ fontSize: "0.8em" }}>
                <i className="fa fa-signal"></i> LoraWAN
              </Col>
            </Row>

            <Row
              style={{
                marginTop: "10px",
                fontSize: "0.8em"
              }}
            >
              <Col className="text-left" md={5}>
                <span>TTN DevId:</span>
              </Col>
              <Col className="text-left" md={7} style={{ paddingLeft: "0px" }}>
                <span className="font-weight-bold">
                  {device.ttnInfo ? device.ttnInfo.devId : ""}
                </span>
              </Col>
            </Row>           
          </LoaderOverlay>
        </Card>
      </Col>
    </>
  );
};

export default DeviceInformationsSimple;
