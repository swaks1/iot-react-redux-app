import React from "react";

import { Card, Row, Col, Button, Input } from "reactstrap";

const DeviceCommandsSimple = ({
  lg,
  md,
  sm,
  deviceWrapper,
  onDeviceIntervalChange,
  onDeviceIntervalBlur,
  onCommandClick
}) => {
  return (
    <>
      <Col lg={lg} md={md} sm={sm}>
        <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
          <h4 className="text-center font-italic font-weight-light">Device Available Commands</h4>

          <Row>
            <Col md={12}>
              <i className="fa fa-wifi"></i> Wifi Commands
            </Col>
          </Row>

          <Row className="mt-2">
            {deviceWrapper.isActive ? (
              <Col className="text-center" md={{ size: 6, offset: 0 }}>
                <Button
                  color="danger"
                  size="sm"
                  id="deactivateBtn"
                  className="btn-block"
                  style={{ fontSize: "0.8em" }}
                  onClick={onCommandClick}
                >
                  Deactivate Device
                </Button>
              </Col>
            ) : (
              <Col className="text-center" md={{ size: 6, offset: 0 }}>
                <Button
                  color="success"
                  size="sm"
                  id="activateBtn"
                  className="btn-block"
                  style={{ fontSize: "0.8em" }}
                  onClick={onCommandClick}
                >
                  Activate Device
                </Button>
              </Col>
            )}

            <Col className="text-center" md={{ size: 6, offset: 0 }}>
              <Button
                size="sm"
                id="updateLocationBtn"
                className="btn-block"
                style={{ fontSize: "0.8em" }}
                onClick={onCommandClick}
              >
                Update Location
              </Button>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col sm="8">
              <Row>
                <Col sm="5" className="text-right pt-2 pr-0">
                  <span> Interval</span>
                </Col>
                <Col sm="7" className="text-left">
                  <Input
                    type="number"
                    name="interval"
                    id="interval"
                    placeholder="Interval"
                    onChange={onDeviceIntervalChange}
                    onBlur={onDeviceIntervalBlur}
                    value={deviceWrapper.interval}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="text-left pl-0" sm={{ size: 4 }}>
              <Button size="sm" id="changeIntervalBtn" onClick={onCommandClick} style={{ fontSize: "0.8em" }}>
                Change
              </Button>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col>
              <hr />
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <i className="fa fa-signal"></i> LoraWAN Commands
            </Col>
          </Row>

          <Row className="mt-2">
            <Col className="text-center" md={{ size: 6, offset: 0 }}>
              <Button size="sm" id="ledOn_Lora" color="success" className="btn-block" onClick={onCommandClick}>
                Led On
              </Button>
            </Col>

            <Col className="text-center" md={{ size: 6, offset: 0 }}>
              <Button size="sm" id="ledOff_Lora" color="warning" className="btn-block" onClick={onCommandClick}>
                Led Off
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default DeviceCommandsSimple;
