import React from "react";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

import { LineChartHelper } from "../../utils/chartHelper";
import LoaderOverlay from "../_common/LoaderOverlay";

const DeviceDataLineChart = ({
  lg,
  md,
  sm,
  deviceData,
  deviceDataLoading,
  onDataLineChartButtonClick,
  getDataForLineChart,
  dataPeriod,
  hideInfoHeader
}) => {
  let response = getDataForLineChart();
  let lineChart = new LineChartHelper(
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
        <Card
          className="card-chart"
          style={{
            backgroundColor: "#f7f6f6",
            padding: "10px 15px",
            marginBottom: "10px"
          }}
        >
          <CardHeader>
            <Row>
              <Col className="text-left" sm="6">
                {hideInfoHeader == null || hideInfoHeader == false ? (
                  <div>
                    <h5 className="card-category">Data Line Chart</h5>
                    <CardTitle tag="h3">
                      <i className="tim-icons icon-bell-55 text-info" />{" "}
                      {dataType}
                    </CardTitle>
                  </div>
                ) : null}
              </Col>

              <Col sm="6">
                <ButtonGroup
                  className="btn-group-toggle float-right"
                  data-toggle="buttons"
                >
                  <Button
                    color="info"
                    id="2"
                    size="sm"
                    tag="label"
                    className={classNames("btn-simple", {
                      active: dataPeriod === "mostRecent"
                    })}
                    onClick={e => {
                      e.preventDefault();
                      onDataLineChartButtonClick("mostRecent");
                    }} //was firing twice for some reason ???
                  >
                    <input
                      defaultChecked
                      className="d-none"
                      name="options"
                      type="radio"
                    />
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                      Most Recent
                    </span>
                    <span className="d-block d-sm-none">
                      <i className="tim-icons icon-tap-02" />
                    </span>
                  </Button>

                  <Button
                    color="info"
                    id="1"
                    size="sm"
                    tag="label"
                    className={classNames("btn-simple", {
                      active: dataPeriod === "lastHour"
                    })}
                    onClick={e => {
                      e.preventDefault();
                      onDataLineChartButtonClick("lastHour");
                    }} //was firing twice for some reason ???
                  >
                    <input className="d-none" name="options" type="radio" />
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                      Last Hour
                    </span>
                    <span className="d-block d-sm-none">
                      <i className="tim-icons icon-gift-2" />
                    </span>
                  </Button>

                  <Button
                    tag="label"
                    className={classNames("btn-simple", {
                      active: dataPeriod === "daily"
                    })}
                    color="info"
                    id="0"
                    size="sm"
                    onClick={e => {
                      e.preventDefault();
                      onDataLineChartButtonClick("daily");
                    }} //was firing twice for some reason ???
                  >
                    <input className="d-none" name="options" type="radio" />
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                      Daily
                    </span>
                    <span className="d-block d-sm-none">
                      <i className="tim-icons icon-single-02" />
                    </span>
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <LoaderOverlay isLoading={deviceDataLoading}>
              <div className="chart-area">
                <Line
                  data={lineChart.getData} //pointer to function
                  options={lineChart.getOptions()} //actual result of function
                />
              </div>
            </LoaderOverlay>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default DeviceDataLineChart;
