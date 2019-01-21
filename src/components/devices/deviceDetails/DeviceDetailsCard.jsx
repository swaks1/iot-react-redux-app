import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import LoaderRow from '../../_common/LoaderRow';
import DeviceInformations from './DeviceInformations'
import DeviceCommands from './DeviceCommands'
import DeviceCommandsHistory from './DeviceCommandsHistory'

const DeviceDetailsCard = ({ device, deviceLoading, location, onRefreshClick, onDeviceFieldChange, editMode, onEditInfo, onSaveInfo, onCommandClick, commandsData, commandsLoading }) => {
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
                                            deviceLoading={deviceLoading}
                                            onRefreshClick={onRefreshClick}
                                            editMode={editMode}
                                            onEditInfo={onEditInfo}
                                            onDeviceFieldChange={onDeviceFieldChange}
                                            onSaveInfo={onSaveInfo} />

                                        <DeviceCommands
                                            lg="4"
                                            md="6"
                                            sm="12"
                                            device={device}
                                            onCommandClick={onCommandClick}
                                            onDeviceFieldChange={onDeviceFieldChange}
                                        />
                                        <DeviceCommandsHistory
                                            lg="4"
                                            md="6"
                                            sm="12"
                                            commandsData={commandsData}
                                            onRefreshClick={onRefreshClick}
                                            commandsLoading={commandsLoading}
                                        />

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