import React from 'react';

import { Card, Row, Col, Button, Input } from 'reactstrap';

const DeviceCommands = ({ lg, md, sm, device, onDeviceFieldChange, onCommandClick }) => {
    return (
        <>
            <Col lg md sm>
                <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
                    <h4>Device Available Commands</h4>

                    <Row className="mt-2">
                        {
                            device.isActive
                                ?
                                <Col className="text-center" md={{ size: 6, offset: 3 }}>
                                    <Button
                                        color="danger"
                                        size="sm"
                                        id="deactivateBtn"
                                        onClick={onCommandClick}>Deactivate Device</Button>
                                </Col>
                                :
                                <Col className="text-center" md={{ size: 6, offset: 3 }}>
                                    <Button
                                        color="success"
                                        size="sm"
                                        id="activateBtn"
                                        onClick={onCommandClick}>Activate Device</Button>
                                </Col>

                        }
                    </Row>



                    <Row className="mt-4">
                        <Col className="text-center" md={{ size: 6, offset: 3 }}>
                            <Button
                                size="sm"
                                id="updateLocationBtn"
                                onClick={onCommandClick}>Update Location</Button>
                        </Col>
                    </Row>



                    <Row className="mt-4">
                        <Col sm="7">
                            <Row>
                                <Col sm="6" className="text-right pt-2 pr-0">
                                    <span> Interval</span>
                                </Col>
                                <Col sm="6" className="text-left">
                                    <Input
                                        type="number"
                                        name="sendDataDelay"
                                        id="sendDataDelay"
                                        placeholder="Interval"
                                        onChange={onDeviceFieldChange}
                                        value={device.sendDataDelay} />
                                </Col>
                            </Row>

                        </Col>
                        <Col className="text-left pl-0" sm={{ size: 4 }} >
                            <Button
                                size="sm"
                                id="changeIntervalBtn"
                                onClick={onCommandClick}>Change</Button>
                        </Col>
                    </Row>


                </Card>
            </Col>

        </>
    );
};


export default DeviceCommands;