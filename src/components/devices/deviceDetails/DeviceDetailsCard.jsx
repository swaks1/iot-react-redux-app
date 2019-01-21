import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import LoaderRow from '../../_common/LoaderRow';
import DeviceInformations from './DeviceInformations'
import DeviceCommands from './DeviceCommands'
import DeviceCommandsHistory from './DeviceCommandsHistory'
import DeviceLocationMap from './DeviceLocationMap'
import DeviceDataLineChart from './DeviceDataLineChart'
import DeviceDataTable from './DeviceDataTable'

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
                                    <>
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
                                        <Row>
                                            <DeviceDataTable
                                                lg="4"
                                                md="4"
                                                sm="4"
                                                deviceData={[]}
                                                deviceDataLoading={() => { }}
                                                onRefreshClick={() => { }}
                                            />
                                            <DeviceDataLineChart
                                                lg="4"
                                                md="4"
                                                sm="4"
                                                data={{}}
                                                onButtonClick={() => { }}
                                            />
                                            <DeviceDataLineChart
                                                lg="4"
                                                md="4"
                                                sm="4"
                                                data={{}}
                                                onButtonClick={() => { }}
                                            />
                                        </Row>

                                        <Row>
                                            <DeviceLocationMap
                                                lg="12"
                                                md="12"
                                                sm="12"
                                                device={device}
                                                deviceLoading={deviceLoading}
                                            />
                                        </Row>
                                    </>
                            }


                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </>
    );
};


export default DeviceDetailsCard;