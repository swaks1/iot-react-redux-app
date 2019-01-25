import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import LoaderRow from '../../_common/LoaderRow';
import Switch from "react-switch";
import DeviceInformations from './DeviceInformations'
import DeviceCommands from './DeviceCommands'
import DeviceCommandsHistory from './DeviceCommandsHistory'
import DeviceDataTable from './DeviceDataTable'
import DeviceDataLineChart from './DeviceDataLineChart'
import DeviceDataBarChart from './DeviceDataBarChart'
import DeviceLocationMap from './DeviceLocationMap'

const DeviceDetailsCard = ({
    toggleAutoRefresh, autoRefreshOn,
    device, deviceLoading, location, onRefreshClick, onDeviceFieldChange, editMode, onEditInfo, onSaveInfo,
    onCommandClick, commandsData, commandsLoading,
    deviceData, deviceDataLoading, getDataForLineChart, onDataLineChartButtonClick, dataPeriod, getDataForBarChart }) => {
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
                            <div>
                                <label htmlFor="normal-switch">
                                    <span>Auto Refresh &nbsp;</span>
                                    <Switch
                                        height={20}
                                        width ={40}
                                        onChange={toggleAutoRefresh}
                                        checked={autoRefreshOn}
                                        className="react-switch"
                                        id="normal-switch"
                                    />
                                </label>
                            </div>
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
                                                deviceData={deviceData}
                                                deviceDataLoading={deviceDataLoading}
                                                getDataForLineChart={getDataForLineChart}
                                                onRefreshClick={onRefreshClick}
                                            />

                                            <DeviceDataLineChart
                                                lg="8"
                                                md="8"
                                                sm="8"
                                                deviceData={deviceData}
                                                deviceDataLoading={deviceDataLoading}
                                                dataPeriod={dataPeriod}
                                                onDataLineChartButtonClick={onDataLineChartButtonClick}
                                                getDataForLineChart={getDataForLineChart}
                                            />
                                        </Row>
                                        <Row>
                                            <DeviceDataBarChart
                                                lg="12"
                                                md="12"
                                                sm="12"
                                                deviceData={deviceData}
                                                deviceDataLoading={deviceDataLoading}
                                                getDataForBarChart={getDataForBarChart}
                                            />
                                        </Row>

                                        <Row className="mt-5">
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