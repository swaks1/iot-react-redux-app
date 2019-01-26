import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardBody, Row, Col, Collapse } from "reactstrap";

import LoaderRow from '../_common/LoaderRow';
import Switch from "react-switch";
import DeviceInformations from '../deviceDetails/DeviceInformations'
import DeviceDataTable from '../deviceDetails/DeviceDataTable'
import DeviceDataLineChart from '../deviceDetails/DeviceDataLineChart'
import DeviceCommands from '../deviceDetails/DeviceCommands'
import DeviceCommandsHistory from '../deviceDetails/DeviceCommandsHistory'

const DeviceDetailsSimpleCard = ({
    toggleAutoRefresh, autoRefreshOn, onRefreshClick,
    device, deviceLoading,
    commandsData, commandsLoading, onCommandClick,
    deviceData, deviceDataLoading, getDataForLineChart, onDataLineChartButtonClick, getDataForBarChart, dataPeriod }) => {
    return (
        <>
            <Row>
                <Col md="12">
                    <Card style={{ backgroundColor: "#f7f6f6", padding: "0px 0px" }}>
                        <CardBody style={{padding: "0px 0px" }}>
                            {
                                device == null
                                    ?
                                    <LoaderRow />
                                    :
                                    <>
                                        <Row>
                                            <DeviceInformations
                                                lg="2"
                                                md="12"
                                                sm="12"
                                                device={device}
                                                deviceLoading={deviceLoading}
                                                onRefreshClick={onRefreshClick}
                                                editMode={() => { }}
                                                onEditInfo={() => { }}
                                                onDeviceFieldChange={() => { }}
                                                onSaveInfo={() => { }} />

                                            <DeviceDataTable
                                                lg="3"
                                                md="12"
                                                sm="12"
                                                deviceData={deviceData}
                                                deviceDataLoading={deviceDataLoading}
                                                getDataForLineChart={getDataForLineChart}
                                                onRefreshClick={onRefreshClick}
                                            />

                                            <DeviceDataLineChart
                                                lg="4"
                                                md="12"
                                                sm="12"
                                                deviceData={deviceData}
                                                deviceDataLoading={deviceDataLoading}
                                                dataPeriod={dataPeriod}
                                                onDataLineChartButtonClick={onDataLineChartButtonClick}
                                                getDataForLineChart={getDataForLineChart}
                                                hideInfoHeader={true}
                                            />

                                            <DeviceCommands
                                                lg="3"
                                                md="12"
                                                sm="12"
                                                device={device}
                                                onCommandClick={onCommandClick}
                                                onDeviceFieldChange={() => { }}
                                            />

                                            <DeviceCommandsHistory
                                                lg="3"
                                                md="6"
                                                sm="12"
                                                commandsData={commandsData}
                                                onRefreshClick={onRefreshClick}
                                                commandsLoading={commandsLoading}
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


export default DeviceDetailsSimpleCard;