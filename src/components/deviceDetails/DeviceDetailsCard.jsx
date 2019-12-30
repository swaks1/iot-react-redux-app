import React from "react";
//import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { Card, CardHeader, CardBody, Row, Col, Input } from "reactstrap";

import LoaderRow from "../_common/LoaderRow";
import Switch from "react-switch";
import DeviceInformations from "./DeviceInformations";
import TTNInformationContainer from "./ttnInformation/TTNInformationContainer";
import DeviceCommands from "./DeviceCommands";
import DeviceCommandsHistory from "./DeviceCommandsHistory";
import DeviceDataTable from "./DeviceDataTable";
import DeviceDataLineChart from "./DeviceDataLineChart";
import DeviceDataBarChart from "./DeviceDataBarChart";
import DeviceLocationMap from "./DeviceLocationMap";

const DeviceDetailsCard = ({
  toggleAutoRefresh,
  autoRefreshOn,
  autoRefreshInterval,
  onAutoRefreshIntervalChange,
  device,
  deviceLoading,
  dataType,
  onDataTypeChange,
  location,
  onRefreshClick,
  onReloadDataTypeClick,
  onDeviceFieldChange,
  editMode,
  onEditInfo,
  onCancelEditInfo,
  onSaveInfo,
  onCommandClick,
  commandsData,
  commandsLoading,
  onDeviceIntervalBlur,
  deviceData,
  deviceDataLoading,
  getDataForLineChart,
  onDataLineChartButtonClick,
  dataPeriod,
  getDataForBarChart
}) => {
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
              <Row style={{ paddingTop: "5px" }}>
                <Col md={2} className="text-right">
                  <div>
                    <label htmlFor="normal-switch">
                      <span>Auto Refresh &nbsp;</span>
                      <Switch
                        height={20}
                        width={40}
                        onChange={toggleAutoRefresh}
                        checked={autoRefreshOn}
                        className="react-switch"
                        id="normal-switch"
                      />
                    </label>
                  </div>
                </Col>
                <Col md={1} className="text-left">
                  {autoRefreshOn ? (
                    <>
                      <span style={{ fontSize: "0.8em" }}>Sec: &nbsp;</span>
                      <Input
                        type="number"
                        name="autoRefreshInterval"
                        id="autoRefreshInterval"
                        className="sm"
                        placeholder="Auto Refresh Interval"
                        style={{
                          padding: "3px 3px",
                          height: "20px",
                          width: "50px",
                          display: "inline"
                        }}
                        onChange={onAutoRefreshIntervalChange}
                        value={autoRefreshInterval}
                      />
                    </>
                  ) : null}
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {device == null ? (
                <LoaderRow />
              ) : (
                <>
                  <Row>
                    <DeviceInformations
                      lg="4"
                      md="6"
                      sm="12"
                      device={device}
                      deviceLoading={deviceLoading}
                      dataType={dataType}
                      onDataTypeChange={onDataTypeChange}
                      onRefreshClick={onRefreshClick}
                      onReloadDataTypeClick={onReloadDataTypeClick}
                      editMode={editMode}
                      onEditInfo={onEditInfo}
                      onCancelEditInfo={onCancelEditInfo}
                      onDeviceFieldChange={onDeviceFieldChange}
                      onSaveInfo={onSaveInfo}
                    />

                    <TTNInformationContainer lg="4" md="6" sm="12" />

                    <Col lg="4" md="6" sm="12">
                      <Row>
                        <DeviceCommands
                          sm="12"
                          device={device}
                          onCommandClick={onCommandClick}
                          onDeviceFieldChange={onDeviceFieldChange}
                          onDeviceIntervalBlur={onDeviceIntervalBlur}
                        />
                      </Row>
                      <Row>
                        <DeviceCommandsHistory
                          sm="12"
                          commandsData={commandsData}
                          onRefreshClick={onRefreshClick}
                          commandsLoading={commandsLoading}
                        />
                      </Row>
                    </Col>
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
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DeviceDetailsCard;
