import React from "react";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";

import { Button, ButtonGroup, Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";

import Spinner from "../../_common/Spinner";
import { LineChartHelper } from "../../../utils/chartHelper";
import { helper } from "../../../utils/helper";

const DeviceDataLineChart = ({
  lg,
  md,
  sm,
  deviceData,
  deviceDataLoading,
  onDataLineChartButtonClick,
  dataType,
  dataPeriod,
  hideInfoHeader
}) => {
  let currentDataType = dataType;
  if (currentDataType == null) {
    currentDataType = deviceData != null && deviceData.length > 0 ? deviceData[0].dataItem.dataType : "";
  }

  let response = helper.mapDataToResponse(true, deviceData, dataPeriod);
  let lineChart = new LineChartHelper(response.data, response.labels, response.name);

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
                    <CardTitle tag="h3" className="mt-3">
                      <Row>
                        <Col md={10}>
                          <i className={`fa fa-${helper.getIconForDataType(currentDataType)} text-info`} />{" "}
                          {currentDataType}
                        </Col>
                        <Col md={2}>{deviceDataLoading ? <Spinner /> : null}</Col>
                      </Row>
                    </CardTitle>
                  </div>
                ) : null}
              </Col>

              <Col sm="6">
                <ButtonGroup className="btn-group-toggle float-right" data-toggle="buttons">
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
                    <input defaultChecked className="d-none" name="options" type="radio" />
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">Most Recent</span>
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
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">Last 1h</span>
                    <span className="d-block d-sm-none">
                      <i className="tim-icons icon-gift-2" />
                    </span>
                  </Button>

                  <Button
                    tag="label"
                    className={classNames("btn-simple", {
                      active: dataPeriod === "last24h"
                    })}
                    color="info"
                    id="0"
                    size="sm"
                    onClick={e => {
                      e.preventDefault();
                      onDataLineChartButtonClick("last24h");
                    }} //was firing twice for some reason ???
                  >
                    <input className="d-none" name="options" type="radio" />
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">Last 24h</span>
                    <span className="d-block d-sm-none">
                      <i className="tim-icons icon-single-02" />
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
                    <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">Daily</span>
                    <span className="d-block d-sm-none">
                      <i className="tim-icons icon-single-02" />
                    </span>
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <div className="chart-area">
              <Line
                data={lineChart.getData} //pointer to function
                options={lineChart.getOptions()} //actual result of function
              />
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default DeviceDataLineChart;
