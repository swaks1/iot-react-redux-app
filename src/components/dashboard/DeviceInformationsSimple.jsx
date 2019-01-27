import React from 'react';
import { Link } from 'react-router-dom';

import { Card, Row, Col } from 'reactstrap';
import Loader from 'react-loader-spinner';

const DeviceInformationsSimple = ({ lg, md, sm, device, deviceLoading }) => {
    return (
        <>
            <Col lg={lg} md={md} sm={sm}>
                <Card style={{ background: "transparent", padding: "10px 15px" }}>
                    <h4 className="text-center font-italic font-weight-light">
                        Device Information &nbsp;
                    </h4>
                    {
                        deviceLoading === true
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
                            <>

                                <Row>
                                    <Col className="text-left" md={5}>
                                        <span>Name:</span>
                                    </Col>
                                    <Col className="text-left" md={7} style={{ paddingLeft: "0px" }}>
                                        <span className="text-info text-uppercase">
                                            <Link to={`/app/devices/${device._id}`}>{device.name}</Link>
                                        </span>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col className="text-left" md={5}>
                                        <span>Descr:</span>
                                    </Col>
                                    <Col className="text-left" md={7} style={{ paddingLeft: "0px", fontSize: "0.8em" }}>
                                        <span className="text-muted">{device.description}</span>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col className="text-left" md={5}>
                                        <span>Active:</span>
                                    </Col>
                                    <Col className="text-left" md={7} style={{ paddingLeft: "0px" }}>
                                        {
                                            device.isActive
                                                ? <i className="fa fa-check fa" style={{ color: "green" }}></i>
                                                : <i className="fa fa-times fa" style={{ color: "red" }} />
                                        }
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col className="text-left" md={5}>
                                        <span>Interval:</span>
                                    </Col>
                                    <Col className="text-left" md={7} style={{ paddingLeft: "0px" }}>
                                        <span className="text-muted">{`${device.sendDataDelay} ms`}</span>
                                    </Col>
                                </Row>

                                <Row style={{ marginTop: "10px" }}>
                                    <Col className="text-left" md={5}>
                                        <span>Location:</span>
                                    </Col>
                                    <Col className="text-left" md={7} style={{ paddingLeft: "0px" }}>
                                        <span className="text-muted">{`(${device.location.lat} , ${device.location.lng})`}</span> <br />
                                        <span style={{ fontSize: "0.8em" }}>{`${device.location.description}`}</span>
                                    </Col>
                                </Row>
                            </>
                    }
                </Card>
            </Col>


        </>
    );
};


export default DeviceInformationsSimple;