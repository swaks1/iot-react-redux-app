import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import ApplicaitonInfo from "./ApplicaitonInfo";
import TTNDevicesContainer from "./ttnDevices/TTNDevicesContainer";

class TheThingsNetworkContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h3 className="title">The Things Netowrk Integration</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={12}>
                    <ApplicaitonInfo />
                  </Col>
                  <Col md={{ size: 10, offset: 1 }} className="mt-2">
                    <hr />
                  </Col>
                  <Col md="12">
                    <TTNDevicesContainer />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default TheThingsNetworkContainer;
