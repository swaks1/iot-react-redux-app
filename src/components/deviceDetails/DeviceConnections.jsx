import React from "react";

import { Card, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import TTNInformationContainer from "./ttnInformation/TTNInformationContainer";
import Spinner from "../_common/Spinner";

const DeviceConnections = ({ lg, md, sm, device, deviceLoading }) => {
  return (
    <>
      <Col lg={lg} md={md} sm={sm}>
        <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
          <Row>
            <Col md={11}>
              <h4 className="text-center font-italic font-weight-light">Device Connections</h4>
            </Col>
            <Col md={1}>{deviceLoading ? <Spinner /> : null}</Col>
          </Row>
          <>
            <Row className="mb-2">
              <Col md={12}>
                <i className="fa fa-wifi"></i> WiFi
              </Col>
            </Row>
            <FormGroup row>
              <Label for="active" sm={5}>
                {" "}
                Active{" "}
              </Label>
              <Col sm={7}>
                {device.isActive ? (
                  <i className="fa fa-check fa-2x" style={{ color: "green" }}></i>
                ) : (
                  <i className="fa fa-times fa-2x" style={{ color: "red" }} />
                )}
              </Col>
              <Label for="active" sm={5}>
                {" "}
                Send Interval{" "}
              </Label>
              <Col sm={7}>
                <h4>{`${device.sendDataDelay} ms`}</h4>
              </Col>
            </FormGroup>

            <Row className="mb-1">
              <Col md={12}>
                <hr />
              </Col>
            </Row>

            <Row className="mb-2">
              <TTNInformationContainer lg="12" md="12" sm="12" />
            </Row>
          </>
        </Card>
      </Col>
    </>
  );
};

export default DeviceConnections;
