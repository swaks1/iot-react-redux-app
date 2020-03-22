import React from "react";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
//import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  CardTitle,
  CardText
} from "reactstrap";

import LoaderRow from "../_common/LoaderRow";
import Switch from "react-switch";
import BasicDetailsContainer from "./basicDetails/BasicDetailsContainer";
import DataContainer from "./data/DataContainer";
import CommandsContainer from "./commands/CommandsContainer";
import AlertsModuleContainer from "../alertsModule/AlertsModuleContainer";

class DeviceDetailsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "basicDetails"
    };
  }
  componentDidMount() {
    let deviceId = this.props.match.params.id;
    let localStorageDevice = localStorage.getItem(deviceId);
    if (localStorageDevice) {
      let device = JSON.parse(localStorageDevice);
      this.setState({ activeTab: device.activeTab });
    }
  }

  setActiveTab = tabId => {
    let deviceId = this.props.match.params.id;
    this.setState({ activeTab: tabId }, () => {
      localStorage.setItem(deviceId, JSON.stringify({ activeTab: tabId }));
    });
  };

  render() {
    const { toggleAutoRefresh, autoRefreshOn, autoRefreshInterval, onAutoRefreshIntervalChange, device } = this.props;

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
                  <Col md={3} className="text-left">
                    <div className="d-flex">
                      <label htmlFor="normal-switch" className="d-flex">
                        <Switch
                          height={20}
                          width={40}
                          onChange={toggleAutoRefresh}
                          checked={autoRefreshOn}
                          className="react-switch"
                          id="normal-switch"
                        />
                        <span style={{ marginLeft: "5px", cursor: "pointer" }}>Auto Refresh</span>
                      </label>
                      {autoRefreshOn ? (
                        <>
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
                              display: "inline",
                              marginLeft: "10px"
                            }}
                            onChange={onAutoRefreshIntervalChange}
                            value={autoRefreshInterval}
                          />
                          <span style={{ fontSize: "0.8em", marginLeft: "5px" }}>seconds</span>
                        </>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                {device == null ? (
                  <LoaderRow />
                ) : (
                  <>
                    <Row>
                      <Col md={12}>
                        <h4 className="title">{device.name}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <div>
                          <Nav tabs>
                            <NavItem>
                              <NavLink
                                className={classNames({ active: this.state.activeTab === "basicDetails" })}
                                onClick={() => this.setActiveTab("basicDetails")}
                              >
                                Basic Details
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classNames({ active: this.state.activeTab === "data" })}
                                onClick={() => this.setActiveTab("data")}
                              >
                                Data
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classNames({ active: this.state.activeTab === "commands" })}
                                onClick={() => this.setActiveTab("commands")}
                              >
                                Commands
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                className={classNames({ active: this.state.activeTab === "alerts" })}
                                onClick={() => this.setActiveTab("alerts")}
                              >
                                Alerts
                              </NavLink>
                            </NavItem>
                          </Nav>
                          <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="basicDetails">
                              <BasicDetailsContainer {...this.props} />
                            </TabPane>
                            <TabPane tabId="data">
                              <DataContainer {...this.props} />
                            </TabPane>
                            <TabPane tabId="commands">
                              <CommandsContainer {...this.props} />
                            </TabPane>
                            <TabPane tabId="alerts">
                              <AlertsModuleContainer />
                            </TabPane>
                          </TabContent>
                        </div>
                      </Col>
                    </Row>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(DeviceDetailsCard);
