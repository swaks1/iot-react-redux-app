import React from "react";
import { Link } from "react-router-dom";

import { Card, Row, Col, Button } from "reactstrap";
import LoaderOverlay from "../_common/LoaderOverlay";

const DeviceInformationsSimple = ({
  lg,
  md,
  sm,
  device,
  deviceLoading,
  dataType,
  onDataTypeChange
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

            <Row style={{ marginTop: "10px" }}>
              <Col className="text-left" md={5}>
                <span>Descr:</span>
              </Col>
              <Col
                className="text-left"
                md={7}
                style={{ paddingLeft: "0px", fontSize: "0.8em" }}
              >
                <span className="text-muted">{device.description}</span>
              </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col className="text-left" md={5}>
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
              <Col className="text-left" md={5} style={{ fontSize: "0.8em" }}>
                <span>DataTypes:</span>
              </Col>
              <Col
                className="text-left"
                md={7}
                style={{ paddingLeft: "0px", fontSize: "0.8em" }}
              >
                {device.dataTypes != null ? (
                  <>
                    {device.dataTypes.map((item, index) => {
                      return (
                        <div key={index}>
                          <Button
                            color="btn btn-link"
                            onClick={() => onDataTypeChange(item)}
                            style={{ padding: "0px 0px" }}
                          >
                            {item}
                          </Button>
                        </div>
                      );
                    })}
                  </>
                ) : null}
              </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col className="text-left" md={5}>
                <span>Interval:</span>
              </Col>
              <Col className="text-left" md={7} style={{ paddingLeft: "0px" }}>
                <span className="text-muted">{`${device.sendDataDelay} ms`}</span>
              </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col className="text-left" md={5}>
                <span>Location:</span>
              </Col>
              <Col className="text-left" md={7} style={{ paddingLeft: "0px" }}>
                <span className="text-muted">{`(${device.location.lat} , ${device.location.lng})`}</span>{" "}
                <br />
                <span
                  style={{ fontSize: "0.8em" }}
                >{`${device.location.description}`}</span>
              </Col>
            </Row>
          </LoaderOverlay>
        </Card>
      </Col>
    </>
  );
};

export default DeviceInformationsSimple;
