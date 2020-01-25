import React from "react";
import { Row, Col, Button } from "reactstrap";

import MinMaxAvgCard from "./MinMaxAvgCard";

class MinMaxAvgContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { dataType, faIcon, date, dataValue, selected } = this.props;

    return (
      <>
        <Row>
          <Col md={2}>
            <MinMaxAvgCard
              title="temeprature"
              faIcon="thermometer-half"
              minDevice={{
                name: "minDeviceName",
                date: "2019.01.01",
                value: "50"
              }}
              maxDevice={{
                name: "maxDeviceeeeeeeeee",
                date: "2019.01.01",
                value: "222"
              }}
              avg={58}
              selected={true}
            />
          </Col>
          <Col md={2}>
            <MinMaxAvgCard
              title="temeprature"
              faIcon="thermometer-half"
              minDevice={{
                name: "minDeviceName",
                date: "2019.01.01",
                value: "50"
              }}
              maxDevice={{
                name: "maxDeviceeeeeeeeee",
                date: "2019.01.01",
                value: "222"
              }}
              avg={58}
            />
          </Col>
          <Col md={2}>
            <MinMaxAvgCard
              title="temeprature"
              faIcon="thermometer-half"
              minDevice={{
                name: "minDeviceName",
                date: "2019.01.01",
                value: "50"
              }}
              maxDevice={{
                name: "maxDeviceeeeeeeeee",
                date: "2019.01.01",
                value: "222"
              }}
              avg={58}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default MinMaxAvgContainer;
