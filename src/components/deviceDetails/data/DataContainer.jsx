import React from "react";

import { Row, Col } from "reactstrap";

import DeviceDataTable from "./DeviceDataTable";
import DeviceDataLineChart from "./DeviceDataLineChart";
import DeviceDataBarChart from "./DeviceDataBarChart";

class DataContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      device,
      deviceDataLoading,
      onRefreshClick,
      deviceData,
      dataPeriod,
      dataType,
      getDataForBarChart,
      onDataLineChartButtonClick,
      onDataTypeChange
    } = this.props;

    return (
      <>
        <Row>
          <DeviceDataTable
            lg="4"
            md="4"
            sm="4"
            device={device}
            dataType={dataType}
            onDataTypeChange={onDataTypeChange}
            deviceData={deviceData}
            deviceDataLoading={deviceDataLoading}
            dataPeriod={dataPeriod}
            onRefreshClick={onRefreshClick}
          />
          <Col md="8">
            <Row>
              <DeviceDataLineChart
                lg="12"
                md="12"
                sm="12"
                deviceData={deviceData}
                deviceDataLoading={deviceDataLoading}
                onDataLineChartButtonClick={onDataLineChartButtonClick}
                dataPeriod={dataPeriod}
              />
              <Col className="mt-5"></Col>
              <DeviceDataBarChart
                lg="12"
                md="12"
                sm="12"
                deviceData={deviceData}
                deviceDataLoading={deviceDataLoading}
                getDataForBarChart={getDataForBarChart}
              />
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default DataContainer;
