import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import LoaderRow from '../../_common/LoaderRow';
import DeviceInformations from './DeviceInformations'

const DeviceDetailsCard = ({ device, location, onDeviceFieldChange, editMode, onEditInfo, onSaveInfo }) => {
    return (
        <>
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <h3 className="title">Device Details</h3>
                            <p className="category">
                                <Link to={`/app/devices`}> Back to Devices</Link>
                            </p>
                        </CardHeader>
                        <CardBody>
                            {
                                device == null
                                    ?
                                    <LoaderRow />
                                    :
                                    <Row>
                                        <DeviceInformations
                                            lg="4"
                                            md="6"
                                            sm="12"
                                            device={device}
                                            editMode={editMode}
                                            onEditInfo={onEditInfo}
                                            onDeviceFieldChange={onDeviceFieldChange} 
                                            onSaveInfo = {onSaveInfo}/>
                                        <Col
                                            lg="4"
                                            md="6"
                                            sm="12"
                                        >
                                            <Card className={"bg-light p-3"}>
                                                <span> {device.name}</span>
                                            </Card>

                                        </Col>
                                        <Col
                                            lg="4"
                                            md="6"
                                            sm="12"
                                        >
                                            <Card className={"bg-light p-3"}>
                                                <span> {device.name}</span>
                                            </Card>

                                        </Col>

                                    </Row>
                            }


                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </>
    );
};


export default DeviceDetailsCard;