import React from "react";

import { Card, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Spinner from "../_common/Spinner";

const DeviceDataTypes = ({ lg, md, sm, device, deviceLoading, onReloadDataTypeClick }) => {
  return (
    <>
      <Col lg={lg} md={md} sm={sm}>
        <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
          <Row>
            <Col md={10}>
              <h4 className="text-center font-italic font-weight-light">Device Data Types</h4>
            </Col>
            <Col md={2}>{deviceLoading ? <Spinner /> : null}</Col>
          </Row>

          <Row>
            <Col md={6}>
              <Row>
                <Col sm={12} className="text-left mb-3">
                  <span> Currently registered: </span>
                </Col>
                <Col sm={12} style={{ paddingLeft: "0px" }}>
                  <ul>
                    {device.dataTypes != null ? (
                      <>
                        {device.dataTypes.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                      </>
                    ) : null}
                  </ul>
                </Col>
              </Row>
            </Col>
            <Col sm={6}>
              <Row>
                <Col sm={12} className="text-left mb-3">
                  <span> Some data type is missing ...?</span>
                </Col>
                <Col sm={12} className="text-left mb-3">
                  <span className="text-muted" style={{ fontSize: "0.8em" }}>
                    If you cannot see some data type on the left list, but you think your devices are sending it, click
                    the following refresh button.
                  </span>
                  &nbsp;&nbsp;&nbsp;
                  <i
                    className="fa fa-sync"
                    style={{ color: "green", cursor: "pointer" }}
                    id="ReloadDataTypeBtn"
                    onClick={onReloadDataTypeClick}
                  ></i>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default DeviceDataTypes;
