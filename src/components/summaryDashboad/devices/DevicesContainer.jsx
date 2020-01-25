import React from "react";
import { Row, Col, Button } from "reactstrap";

import DeviceGaugeChart from "./DeviceGaugeChart";

class DevicesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, faIcon, minDevice, maxDevice, avg, selected } = this.props;

    return (
      <>
        <Row>
          <Col md={2} className="d-flex justify-content-center">
            <DeviceGaugeChart
              minValue={0}
              maxValue={200}
              currentValue={22}
              title="Device"
            />
          </Col>
          <Col md={2} className="d-flex justify-content-center">
            <DeviceGaugeChart
              minValue={0}
              maxValue={200}
              currentValue={22}
              title="Device"
              selected={true}
            />
          </Col>
          <Col md={2} className="d-flex justify-content-center">
            <DeviceGaugeChart
              minValue={0}
              maxValue={200}
              currentValue={22}
              title="Device"
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default DevicesContainer;
