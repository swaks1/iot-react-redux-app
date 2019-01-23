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

import { BarChartHelper } from "../../../charts/chartHelper";

import Loader from 'react-loader-spinner';

const DeviceDataBarChart = ({ lg, md, sm, deviceData, deviceDataLoading, getDataForBarChart }) => {
    let response = getDataForBarChart();
    let barChart = new BarChartHelper(response.data, response.labels, response.name);

    let dataType = "";
    if (deviceData != null && deviceData.length > 0) {
        dataType = deviceData[0].dataItem.dataType;
    }

    return (
        <>
            <Col lg={lg} md={md} sm={sm}>
                {/* */}
                <Card className="card-chart" style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
                    <CardHeader>
                        <h5 className="card-category">Data Bar Chart</h5>
                        <CardTitle tag="h3">
                            <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                            {dataType}
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        {
                            deviceDataLoading === true
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
                                    <Bar
                                        data={barChart.getData}
                                        options={barChart.getOptions()}
                                    />
                                </div>
                        }
                    </CardBody>
                </Card>
            </Col>

        </>
    );
};


export default DeviceDataBarChart;