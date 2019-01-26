import React from 'react';
//import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import LoaderRow from '../_common/LoaderRow';
import Switch from "react-switch";
import DeviceInformations from '../deviceDetails/DeviceInformations'
import DeviceDataTable from '../deviceDetails/DeviceDataTable'
import DeviceDataLineChart from '../deviceDetails/DeviceDataLineChart'
import DeviceCommands from '../deviceDetails/DeviceCommands'

const DeviceDetailsSimpleCard = ({
    toggleAutoRefresh, autoRefreshOn, onRefreshClick,
    device, deviceLoading,
    commandsData, commandsLoading, onCommandClick,
    deviceData, deviceDataLoading, getDataForLineChart, onDataLineChartButtonClick, getDataForBarChart, dataPeriod }) => {
    return (
        <>
            <Row>
                <Col md="12">
                    <Card>
                        <CardBody>
                            {
                                device == null
                                    ?
                                    <LoaderRow />
                                    :
                                    <>
                                        <Row>
                                            <DeviceInformations
                                                lg="3"
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
                                                lg="3"
                                                md="12"
                                                sm="12"
                                                deviceData={deviceData}
                                                deviceDataLoading={deviceDataLoading}
                                                dataPeriod={dataPeriod}
                                                onDataLineChartButtonClick={onDataLineChartButtonClick}
                                                getDataForLineChart={getDataForLineChart}
                                            />

                                            <DeviceCommands
                                                lg="3"
                                                md="12"
                                                sm="12"
                                                device={device}
                                                onCommandClick={onCommandClick}
                                                onDeviceFieldChange={() => { }}
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