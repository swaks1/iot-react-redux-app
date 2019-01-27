import React from 'react';

import { Card, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Loader from 'react-loader-spinner';

const DeviceInformations = ({ lg, md, sm, device, deviceLoading, dataType, onDataTypeChange, onRefreshClick, editMode, onDeviceFieldChange, onEditInfo, onSaveInfo }) => {
    return (
        <>
            <Col lg={lg} md={md} sm={sm}>
                <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
                    <h4 className="text-center font-italic font-weight-light">
                        Device Information &nbsp;
                                <i
                            className="fa fa-sync"
                            style={{ color: "green", cursor: "pointer" }}
                            id="DeviceInformations"
                            onClick={onRefreshClick}
                        ></i>
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
                            <Form>
                                <FormGroup row>
                                    <Label for="name" sm={5}> Name</Label>
                                    <Col sm={7}>
                                        {
                                            <h4 className={"col-form-label"}>{device.name}</h4>
                                        }
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="description" sm={5}> Description</Label>
                                    <Col sm={7}>
                                        {
                                            editMode === true
                                                ?
                                                <Input
                                                    type="text"
                                                    name="description"
                                                    id="description"
                                                    placeholder="Description"
                                                    onChange={onDeviceFieldChange}
                                                    value={device.description}
                                                />
                                                :
                                                <h4 className={"col-form-label"}>{device.description}</h4>
                                        }
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="active" sm={5}> Active </Label>
                                    <Col sm={7}>
                                        {
                                            device.isActive
                                                ? <i className="fa fa-check fa-2x" style={{ color: "green" }}></i>
                                                : <i className="fa fa-times fa-2x" style={{ color: "red" }} />
                                        }
                                    </Col>
                                </FormGroup>
                                {
                                    editMode === false
                                        ?
                                        <FormGroup row>
                                            <Label for="dataTypes" sm={5}> Data Types </Label>
                                            <Col sm={7} style={{ paddingLeft: "0px", fontSize: "0.8em" }}>
                                                {
                                                    device.dataTypes != null
                                                        ?
                                                        <>
                                                            {
                                                                device.dataTypes.map((item, index) => {
                                                                    return (
                                                                        <div key={index}>
                                                                            <Button
                                                                                color="btn btn-link"
                                                                                onClick={() => onDataTypeChange(item)}
                                                                                style={{ padding: "0px 0px" }}
                                                                            >
                                                                                {item}
                                                                            </Button>
                                                                        </div>
                                                                    );
                                                                })
                                                            }
                                                        </>
                                                        :
                                                        null
                                                }
                                            </Col>
                                        </FormGroup>
                                        :
                                        null
                                }

                                {
                                    editMode === false
                                        ?
                                        <FormGroup row>
                                            <Label for="active" sm={5}> Send Interval </Label>
                                            <Col sm={7}>
                                                <h4>{`${device.sendDataDelay} ms`}</h4>
                                            </Col>
                                        </FormGroup>
                                        :
                                        null
                                }

                                {
                                    editMode === false
                                        ?
                                        <FormGroup row>
                                            <Label for="active" sm={5}> Location </Label>
                                            <Col sm={7}>
                                                <h4>{`(${device.location.lat} , ${device.location.lng})`} <br /> {`${device.location.description}`}</h4>
                                            </Col>
                                        </FormGroup>
                                        :
                                        <>
                                            <FormGroup row>
                                                <Label for="lat" sm={3}>Latitude:</Label>
                                                <Col sm={3}>
                                                    {
                                                        <Input
                                                            type="text"
                                                            name="location.lat"
                                                            id="lat"
                                                            placeholder="Latitude"
                                                            onChange={onDeviceFieldChange}
                                                            value={device.location.lat}
                                                        />
                                                    }
                                                </Col>
                                                <Label for="lng" sm={3}>Longitude:</Label>
                                                <Col sm={3}>
                                                    {
                                                        <Input
                                                            type="text"
                                                            name="location.lng"
                                                            id="lng"
                                                            placeholder="Longitude"
                                                            onChange={onDeviceFieldChange}
                                                            value={device.location.lng}
                                                        />
                                                    }
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="lng" sm={5}>Location Description:</Label>
                                                <Col sm={7}>
                                                    {
                                                        <Input
                                                            type="text"
                                                            name="location.description"
                                                            id="locationDescription"
                                                            placeholder="Location Description"
                                                            onChange={onDeviceFieldChange}
                                                            value={device.location.description}
                                                        />
                                                    }
                                                </Col>
                                            </FormGroup>
                                        </>
                                }

                                <FormGroup row>
                                    <Col sm={{ size: 4, offset: 0 }}>
                                        {
                                            editMode === true
                                                ? <Button
                                                    onClick={onSaveInfo}>Save</Button>
                                                : <Button
                                                    color="link"
                                                    style={{ paddingLeft: "0px" }}
                                                    onClick={onEditInfo}>Edit Info</Button>
                                        }

                                    </Col>
                                </FormGroup>
                            </Form>
                    }
                </Card>
            </Col>


        </>
    );
};


export default DeviceInformations;