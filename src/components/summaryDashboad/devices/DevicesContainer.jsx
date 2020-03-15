import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedSummaryDashboardActions from "../../../redux/actions/summaryDashboardActions";

import { Row, Col, Button } from "reactstrap";

import LoaderRow from "../../_common/LoaderRow";
import CustomCard from "../../_common/CustomCard";
import DeviceGaugeChart from "./DeviceGaugeChart";

class DevicesContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { devicesWithDataMapped, loading, selectedInfo, onChangeDevice } = this.props;

    return (
      <>
        {loading ? (
          <LoaderRow style={{ minHeight: "210px" }} />
        ) : (
          <Row>
            {devicesWithDataMapped.map(device => (
              <Col md={2} className="d-flex justify-content-center" key={device.id}>
                {device.dataType &&
                device.dataItem &&
                device.dataItem.dataValue != null &&
                isNaN(device.dataItem.dataValue) == false ? (
                  <DeviceGaugeChart
                    deviceId={device.id}
                    minValue={device.dataType.minValue}
                    maxValue={device.dataType.maxValue}
                    currentValue={device.dataItem.dataValue}
                    deviceName={device.name.length > 15 ? `${device.name.substring(0, 16) + "..."}` : device.name}
                    selected={selectedInfo.selectedDevice.id && selectedInfo.selectedDevice.id == device.id}
                    onChangeDevice={onChangeDevice}
                  />
                ) : (
                  <CustomCard
                    card={{
                      className: `custom-gauge-card ${
                        selectedInfo.selectedDevice.id && selectedInfo.selectedDevice.id == device.id
                          ? "border-info"
                          : ""
                      }`,
                      onClick: () => onChangeDevice(device.id)
                    }}
                    body={{
                      className: "text-center",
                      elements: (
                        <>
                          <Row>
                            <Col md={12} className="text-center">
                              <div>
                                {device.name.length > 15 ? `${device.name.substring(0, 16) + "..."}` : device.name}
                              </div>
                            </Col>
                            <Col md={12} className="text-center mt-1">
                              <div>NO DATA !</div>
                            </Col>
                          </Row>
                        </>
                      )
                    }}
                  />
                )}
              </Col>
            ))}
          </Row>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let allDevicesState = {
    loading: state.devices.length == 0,
    devices: state.devices.map(item => item.data)
  };

  let summaryDataTypesState = {
    loading: true,
    ...state.summaryDashboard.dataTypesState
  };

  let summaryDevicesWithDataState = {
    loading: true,
    ...state.summaryDashboard.devicesWithDataState
  };

  let devicesWithDataMapped = [];
  let loading = true;
  if (
    allDevicesState.loading == false &&
    summaryDataTypesState.loading == false &&
    summaryDevicesWithDataState.loading == false
  ) {
    let iotDevices = allDevicesState.devices;
    let devicesWithData = summaryDevicesWithDataState.devices;
    let selectedDataTypeName = ownProps.selectedInfo.selectedDataTypeName;
    let dataType = summaryDataTypesState.dataTypes.find(item => item.name == selectedDataTypeName);

    if (dataType != null) {
      devicesWithDataMapped = devicesWithData.map(device => {
        let data = device.data.find(item => item.dataType == dataType.name);
        return {
          id: device.id,
          dataItem: data ? { ...data } : null, //destruct here or there will be state corruption if dataItem is eddeited
          dataType: dataType
        };
      });
      // add name from iot devices, and parse the value of dataItem to float
      for (let device of devicesWithDataMapped) {
        let iotDevice = iotDevices.find(item => item._id == device.id);
        device.name = iotDevice.name;
        if (device.dataItem && device.dataItem.dataValue) {
          device.dataItem.dataValue = parseFloat(device.dataItem.dataValue);
        }
      }
    }

    loading = false;
  }

  return { devicesWithDataMapped, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    summaryDashboardActions: bindActionCreators(importedSummaryDashboardActions, dispatch)
  };
};

var DevicesContainerConnected = connect(mapStateToProps, mapDispatchToProps)(DevicesContainer);

export default withRouter(DevicesContainerConnected);
