import React from 'react';
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

import { LineChartHelper } from "../../../charts/chartHelper";
import Loader from 'react-loader-spinner';

const DeviceDataLineChart = ({ lg, md, sm, deviceData, deviceDataLoading, onDataLineChartButtonClick, getDataForLineChart, lineChartFilter }) => {
    let response = getDataForLineChart();
    let lineChart = new LineChartHelper(response.data, response.labels, response.name);

    let dataType = "";
    if (deviceData != null && deviceData.length > 0) {
        dataType = deviceData[0].dataItem.dataType;
    }

    return (
        <>
            <Col lg={lg} md={md} sm={sm} >
                <Card className="card-chart" style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
                    <CardHeader>
                        <Row>
                            <Col className="text-left" sm="6">
                                <h5 className="card-category">Data Line Chart</h5>
                                <CardTitle tag="h2">
                                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                                    {dataType}
                                </CardTitle>
                            </Col>
                            <Col sm="6">
                                <ButtonGroup
                                    className="btn-group-toggle float-right"
                                    data-toggle="buttons"
                                >
                                    <Button
                                        tag="label"
                                        className={classNames("btn-simple", {
                                            active: lineChartFilter === "daily"
                                        })}
                                        color="info"
                                        id="0"
                                        size="sm"
                                        onClick={() => onDataLineChartButtonClick("daily")}
                                    >
                                        <input
                                            defaultChecked
                                            className="d-none"
                                            name="options"
                                            type="radio"
                                        />
                                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                            Daily
                                        </span>
                                        <span className="d-block d-sm-none">
                                            <i className="tim-icons icon-single-02" />
                                        </span>
                                    </Button>
                                    <Button
                                        color="info"
                                        id="1"
                                        size="sm"
                                        tag="label"
                                        className={classNames("btn-simple", {
                                            active: lineChartFilter === "lastHour"
                                        })}
                                        onClick={() => onDataLineChartButtonClick("lastHour")}
                                    >
                                        <input
                                            className="d-none"
                                            name="options"
                                            type="radio"
                                        />
                                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                            Last Hour
                                        </span>
                                        <span className="d-block d-sm-none">
                                            <i className="tim-icons icon-gift-2" />
                                        </span>
                                    </Button>
                                    <Button
                                        color="info"
                                        id="2"
                                        size="sm"
                                        tag="label"
                                        className={classNames("btn-simple", {
                                            active: lineChartFilter === "mostRecent"
                                        })}
                                        onClick={() => onDataLineChartButtonClick("mostRecent")}
                                    >
                                        <input
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
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        {
                            deviceDataLoading === "r"//true
                                ?
                                <div className="text-center" >
                                    <Loader
                                        type="Puff"
                                        color="#00BFFF"
                                        height="100"
                                        width="100"
                                    />
                                </div>
                                :
                                <div className="chart-area">
                                    <Line
                                        data={lineChart.getData} //pointer to function
                                        options={lineChart.getOptions()} //actual result of function
                                    />
                                </div>
                        }

                    </CardBody>
                </Card>
            </Col>

        </>
    );
};


export default DeviceDataLineChart;