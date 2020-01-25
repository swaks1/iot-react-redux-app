import React from "react";
import { Row, Col, Button } from "reactstrap";

import DataCard from "./DataCard";
import DeviceDataLineChart from "../../deviceDetails/DeviceDataLineChart";

class SelectedDeviceContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, faIcon, minDevice, maxDevice, avg, selected } = this.props;

    return (
      <>
        <Row>
          <Col md={{ size: 5 }}>
            <Row>
              <Col md={6}>
                <DataCard
                  dataType="temperature"
                  faIcon="thermometer-half"
                  date="12.12.2012"
                  dataValue="33"
                />
              </Col>
              <Col md={6}>
                <DataCard
                  dataType="temperature"
                  faIcon="thermometer-half"
                  date="12.12.2012"
                  dataValue="33"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <DataCard
                  dataType="temperature"
                  faIcon="thermometer-half"
                  date="12.12.2012"
                  dataValue="33"
                />
              </Col>
              <Col md={6}>
                <DataCard
                  dataType="temperature"
                  faIcon="thermometer-half"
                  date="12.12.2012"
                  dataValue="33"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md={6}>
                <DataCard
                  dataType="temperature"
                  faIcon="thermometer-half"
                  date="12.12.2012"
                  dataValue="33"
                  selected={true}
                />
              </Col>
              <Col md={6}>
                <DataCard
                  dataType="temperature"
                  faIcon="thermometer-half"
                  date="12.12.2012"
                  dataValue="33"
                />
              </Col>
            </Row>
          </Col>
          <Col md={7}>
            <DeviceDataLineChart
              lg="12"
              md="12"
              sm="12"
              deviceData={{ data: [], labels: [], name: "temp" }}
              deviceDataLoading={false}
              onDataLineChartButtonClick={() => {}}
              getDataForLineChart={() => {
                return { data: [], labels: [], name: "temp" };
              }}
              dataPeriod={"mostRecent"}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default SelectedDeviceContainer;
