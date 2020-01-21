import React from "react";
//import PropTypes from 'prop-types';
import Switch from "react-switch";

import { Button, Card, CardBody, Row, Col, Collapse, Input } from "reactstrap";

import LoaderRow from "../_common/LoaderRow";
import DeviceInformationsSimple from "./DeviceInformationsSimple";
import DeviceDataTableSimple from ".//DeviceDataTableSimple";
import DeviceDataLineChart from "../deviceDetails/DeviceDataLineChart";
import DeviceDataBarChart from "../deviceDetails/DeviceDataBarChart";
import DeviceCommandsSimple from "./DeviceCommandsSimple";
import DeviceLocationMap from "../deviceDetails/DeviceLocationMap";
import DeviceCommandsHistorySimple from "./DeviceCommandsHistorySimple";

const DeviceDetailsSimpleCard = ({
  collapseElementOpened,
  onCollapseClick,
  autoRefreshOn,
  toggleAutoRefresh,
  autoRefreshInterval,
  onAutoRefreshIntervalChange,
  device,
  deviceLoading,
  dataType,
  onDataTypeChange,
  commandsData,
  commandsLoading,
  onCommandClick,
  deviceWrapper,
  onDeviceIntervalChange,
  onDeviceIntervalBlur,
  deviceData,
  deviceDataLoading,
  getDataForLineChart,
  onDataLineChartButtonClick,
  getDataForBarChart,
  dataPeriod
}) => {
  return (
    <>
      <Row>
        <Col md="12">
          <Card style={{ backgroundColor: "#f7f6f6", padding: "0px 0px" }}>
            <CardBody style={{ padding: "0px 0px" }}>
              {device == null ? (
                <LoaderRow />
              ) : (
                <>
                  <Row style={{ paddingTop: "5px" }}>
                    <Col md={1} className="text-right">
                      <div>
                        <label htmlFor="normal-switch">
                          <span style={{ fontSize: "0.8em" }}>
                            Auto Refresh &nbsp;
                          </span>
                          <Switch
                            height={10}
                            width={20}
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
                  <Row>
                    <DeviceInformationsSimple
                      lg="2"
                      md="12"
                      sm="12"
                      device={device}
                      deviceLoading={deviceLoading}
                      onDataTypeChange={onDataTypeChange}
                    />

                    <DeviceDataTableSimple
                      lg="3"
                      md="12"
                      sm="12"
                      device={device}
                      dataType={dataType}
                      onDataTypeChange={onDataTypeChange}
                      deviceData={deviceData}
                      deviceDataLoading={deviceDataLoading}
                      getDataForLineChart={getDataForLineChart}
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
                    />

                    <DeviceCommandsSimple
                      lg="3"
                      md="12"
                      sm="12"
                      deviceWrapper={deviceWrapper}
                      onCommandClick={onCommandClick}
                      onDeviceIntervalChange={onDeviceIntervalChange}
                      onDeviceIntervalBlur={onDeviceIntervalBlur}
                    />
                  </Row>
                  <Row>
                    {collapseElementOpened == false ? (
                      <Col md={12} className="text-center">
                        <Button
                          color="btn btn-link"
                          onClick={onCollapseClick}
                          style={{ marginBottom: "10px", padding: "0px 0px" }}
                        >
                          <span style={{ fontSize: "0.8em" }}>
                            <i className="fas fa-angle-double-down"></i> View
                            More
                          </span>
                        </Button>
                      </Col>
                    ) : null}
                  </Row>

                  <Collapse isOpen={collapseElementOpened}>
                    <Row>
                      <DeviceLocationMap
                        lg="5"
                        md="12"
                        sm="12"
                        device={device}
                        deviceLoading={deviceLoading}
                      />

                      <DeviceDataBarChart
                        lg="4"
                        md="12"
                        sm="12"
                        deviceData={deviceData}
                        deviceDataLoading={deviceDataLoading}
                        getDataForBarChart={getDataForBarChart}
                      />

                      <DeviceCommandsHistorySimple
                        lg="3"
                        md="6"
                        sm="12"
                        commandsData={commandsData}
                        commandsLoading={commandsLoading}
                      />
                    </Row>
                    <Row>
                      {collapseElementOpened == true ? (
                        <Col md={12} className="text-center">
                          <Button
                            color="btn btn-link"
                            onClick={onCollapseClick}
                            style={{ marginBottom: "10px", padding: "0px 0px" }}
                          >
                            <span style={{ fontSize: "0.8em" }}>
                              <i className="fas fa-angle-double-up"></i> Show
                              Less
                            </span>
                          </Button>
                        </Col>
                      ) : null}
                    </Row>
                  </Collapse>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default DeviceDetailsSimpleCard;
