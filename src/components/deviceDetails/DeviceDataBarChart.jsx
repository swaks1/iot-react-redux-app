import React from "react";
import { Bar } from "react-chartjs-2";

import { Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

import { BarChartHelper } from "../../utils/chartHelper";

import Spinner from "../_common/Spinner";
import { helper } from "../../utils/helper";

const DeviceDataBarChart = ({
  lg,
  md,
  sm,
  deviceData,
  deviceDataLoading,
  getDataForBarChart
}) => {
  let response = getDataForBarChart();
  let barChart = new BarChartHelper(
    response.data,
    response.labels,
    response.name
  );

  let dataType = "";
  if (deviceData != null && deviceData.length > 0) {
    dataType = deviceData[0].dataItem.dataType;
  }

  return (
    <>
      <Col lg={lg} md={md} sm={sm}>
        {/* */}
        <Card
          className="card-chart"
          style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}
        >
          <CardHeader>
            <h5 className="card-category">Data Bar Chart</h5>
            <CardTitle tag="h3">
              <Row>
                <Col md={10}>
                  <i
                    className={`fa fa-${helper.getIconForDataType(
                      dataType
                    )} text-info`}
                  />{" "}
                  {dataType}
                </Col>
                <Col md={2}>{deviceDataLoading ? <Spinner /> : null}</Col>
              </Row>
            </CardTitle>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <Bar data={barChart.getData} options={barChart.getOptions()} />
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default DeviceDataBarChart;
