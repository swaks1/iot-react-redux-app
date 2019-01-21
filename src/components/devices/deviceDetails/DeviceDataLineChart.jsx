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
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip
} from "reactstrap";

import {
    chartExample1,
    chartExample2,
    chartExample3,
    chartExample4
} from "../../../assets/variables";


const DeviceCommands = ({ lg, md, sm, data, onButtonClick }) => {
    return (
        <>
            <Col lg={lg} md={md} sm={sm}>
                {/* style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }} */}
                <Card className="card-chart" >
                    <CardHeader>
                        <Row>
                            <Col className="text-left" sm="6">
                                <h5 className="card-category">Data Line Chart</h5>
                                <CardTitle tag="h2">TYPE HERE</CardTitle>
                            </Col>
                            <Col sm="6">
                                <ButtonGroup
                                    className="btn-group-toggle float-right"
                                    data-toggle="buttons"
                                >
                                    <Button
                                        tag="label"
                                        className={classNames("btn-simple", {
                                            active: data === "data1"
                                        })}
                                        color="info"
                                        id="0"
                                        size="sm"
                                        onClick={() => onButtonClick("data1")}
                                    >
                                        <input
                                            defaultChecked
                                            className="d-none"
                                            name="options"
                                            type="radio"
                                        />
                                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                            Accounts
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
                                            active: data === "data2"
                                        })}
                                        onClick={() => onButtonClick("data2")}
                                    >
                                        <input
                                            className="d-none"
                                            name="options"
                                            type="radio"
                                        />
                                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                            Purchases
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
                                            active: data === "data3"
                                        })}
                                        onClick={() => onButtonClick("data3")}
                                    >
                                        <input
                                            className="d-none"
                                            name="options"
                                            type="radio"
                                        />
                                        <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                                            Sessions
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
                        <div className="chart-area">
                            <Line
                                data={chartExample1["data1"]}
                                options={chartExample1.options}
                            />
                        </div>
                    </CardBody>
                </Card>
            </Col>

        </>
    );
};


export default DeviceCommands;