import React from "react";
import { withRouter, Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedSummaryDashboardActions from "../../redux/actions/summaryDashboardActions";

import toastr from "toastr";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
import { helper } from "../../utils/helper";
import BasicInformationsContainer from "./basicInformations/BasicInformationsContainer";
import MinMaxAvgContainer from "./minMaxAvg/MinMaxAvgContainer";
import DevicesContainer from "./devices/DevicesContainer";
import SelectedDeviceContainer from "./selectedDevice/SelectedDeviceContainer";

class SummaryDashboardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDataTypeName: null,
      selectedDevice: {
        id: null,
        dataType: null,
        dataPeriod: "mostRecent"
      }
    };
  }

  componentDidMount() {
    let { summaryDashboardActions } = this.props;
    summaryDashboardActions.loadSummaryDashboard("beehiveDashboard").catch(error => toastr.error(error));
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let reloadDevicesWithData = false;
    if (prevProps.summaryDeviceIdsState.deviceIds !== this.props.summaryDeviceIdsState.deviceIds) {
      reloadDevicesWithData = true;
      this.checkSelectedDevice();
    }
    if (prevProps.summaryDataTypesState.dataTypes !== this.props.summaryDataTypesState.dataTypes) {
      reloadDevicesWithData = true;
      this.checkSelectedDataType();
    }
    if (prevProps.periodInPast !== this.props.periodInPast) {
      reloadDevicesWithData = true;
    }

    if (reloadDevicesWithData) {
      let deviceIds = this.props.summaryDeviceIdsState.deviceIds;
      let dataTypeNames = this.props.summaryDataTypesState.dataTypes.map(item => item.name);
      let { periodInPast } = this.props;
      this.loadDeviceWithData(deviceIds, dataTypeNames, periodInPast);
    }
  }

  checkSelectedDevice = () => {
    let deviceIds = this.props.summaryDeviceIdsState.deviceIds;
    let selectedDeviceId = this.state.selectedDevice ? this.state.selectedDevice.id : null;
    if (!deviceIds.includes(selectedDeviceId)) {
      let newId = deviceIds.length > 0 ? deviceIds[0] : null;
      this.changeSelectedDevice(newId);
    }
  };

  checkSelectedDataType = () => {
    let dataTypes = this.props.summaryDataTypesState.dataTypes;

    // change global selected dataType
    let selectedDataTypeName = this.state.selectedDataTypeName;
    let exists = dataTypes.find(dataType => dataType.name == selectedDataTypeName) != null;
    if (!exists) {
      let newDataTypeName = dataTypes.length > 0 ? dataTypes[0].name : null;
      this.changeSelectedDataType(newDataTypeName);
    }

    //change selected device dataType
    let deviceDataType = this.state.selectedDevice != null ? this.state.selectedDevice.dataType : null;
    exists = dataTypes.find(dataType => dataType.name == deviceDataType) != null;
    if (!exists) {
      let newDataTypeName = dataTypes.length > 0 ? dataTypes[0].name : null;
      this.changeSelectedDeviceDataType(newDataTypeName);
    }
  };

  loadDeviceWithData = (deviceIds, dataTypeNames, periodInPast) => {
    if (deviceIds.length == 0 || dataTypeNames.length == 0) {
      toastr.warning("devicesIds or dataTypes are empty !");
    }
    console.log("getting device with data: ", deviceIds, dataTypeNames, periodInPast);
    let { summaryDashboardActions } = this.props;
    summaryDashboardActions
      .loadDevicesWithData(deviceIds, dataTypeNames, periodInPast)
      .then(resp => toastr.success("Loaded devices with data !"))
      .catch(error => toastr.error(error));
  };

  changeSelectedDataType = dataTypeName => {
    this.setState({
      selectedDataTypeName: dataTypeName
    });
    // also change this selected device dataType
    this.changeSelectedDeviceDataType(dataTypeName);
  };

  changeSelectedDevice = deviceId => {
    let iotDevices = this.props.allDevicesState.devices;
    let device = { ...iotDevices.find(item => item._id == deviceId) }; // if find returns null, destruction of null is {}

    this.setState(prevState => ({
      selectedDevice: {
        ...prevState.selectedDevice,
        id: device._id ? device._id : null,
        name: device.name ? device.name : null
      }
    }));
  };

  changeSelectedDeviceDataType = dataTypeName => {
    this.setState(prevState => ({
      selectedDevice: { ...prevState.selectedDevice, dataType: dataTypeName }
    }));
  };

  changeSelectedDeviceDataPeriod = dataPeriod => {
    this.setState(prevState => ({
      selectedDevice: { ...prevState.selectedDevice, dataPeriod: dataPeriod }
    }));
  };

  render() {
    return (
      <>
        <Row>
          <Col md="12">
            <h3>BEEHIVE DASHBOARD</h3>
          </Col>
        </Row>

        <Row>
          <Col md="2">
            <Card>
              <CardHeader>
                <h5>BASIC INFO</h5>
              </CardHeader>
              <CardBody>
                <BasicInformationsContainer />
              </CardBody>
            </Card>
          </Col>
          <Col md="10">
            <Card>
              <CardHeader>
                <h5>MIN, MAX, AVG </h5>
              </CardHeader>
              <CardBody>
                <MinMaxAvgContainer
                  selectedInfo={this.state}
                  onChangeDataType={this.changeSelectedDataType}
                  onChangeDevice={this.changeSelectedDevice}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <>
                  <div className="data-type-with-icon">
                    <span className="text-capitalize">{this.state.selectedDataTypeName}</span>
                    <i className={`fa fa-${helper.getIconForDataType(this.state.selectedDataTypeName)}`}></i>
                  </div>
                </>
              </CardHeader>
              <CardBody>
                <DevicesContainer selectedInfo={this.state} onChangeDevice={this.changeSelectedDevice} />
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <>
                  <h3>
                    {this.state.selectedDevice && this.state.selectedDataTypeName ? (
                      <Link to={`/app/devices/${this.state.selectedDevice.id}`}>{this.state.selectedDevice.name}</Link>
                    ) : (
                      ""
                    )}
                  </h3>
                </>
              </CardHeader>
              <CardBody>
                <SelectedDeviceContainer
                  selectedInfo={this.state}
                  onChangeDeviceDataType={this.changeSelectedDeviceDataType}
                  onChangeDeviceDataPeriod={this.changeSelectedDeviceDataPeriod}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  let summaryDashboardName = state.summaryDashboard.name;
  let periodInPast = state.summaryDashboard.periodInPast;

  let summaryDeviceIdsState = {
    loading: true,
    ...state.summaryDashboard.deviceIdsState
  };

  let summaryDataTypesState = {
    loading: true,
    ...state.summaryDashboard.dataTypesState
  };

  let summaryDevicesWithDataState = {
    loading: true,
    ...state.summaryDashboard.devicesWithDataState
  };

  let allDevicesState = {
    loading: state.devices.length == 0,
    devices: state.devices.map(item => item.data)
  };

  return {
    summaryDashboardName,
    periodInPast,
    summaryDeviceIdsState,
    summaryDataTypesState,
    summaryDevicesWithDataState,
    allDevicesState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    summaryDashboardActions: bindActionCreators(importedSummaryDashboardActions, dispatch)
  };
};

var SummaryDashboardContainerConnected = connect(mapStateToProps, mapDispatchToProps)(SummaryDashboardContainer);

export default withRouter(SummaryDashboardContainerConnected);
