import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedSummaryDashboardActions from "../../../redux/actions/summaryDashboardActions";

import { Row, Col, Button } from "reactstrap";

import { helper } from "../../../utils/helper";
import LoaderRow from "../../_common/LoaderRow";
import MinMaxAvgCard from "./MinMaxAvgCard";

class MinMaxAvgContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { minMaxDataTypes, loading, selectedInfo, onChangeDataType, onChangeDevice } = this.props;
    return (
      <>
        {loading ? (
          <LoaderRow style={{ minHeight: "210px" }} />
        ) : (
          <Row>
            {minMaxDataTypes.map(item => (
              <Col md={3} key={item.dataType} className="mt-2">
                <MinMaxAvgCard
                  title={item.dataType}
                  faIcon={helper.getIconForDataType(item.dataType)}
                  minDevice={{
                    id: item.minDevice.id,
                    name: item.minDevice.name,
                    date: item.minDevice.created,
                    value: item.minDevice.value
                  }}
                  maxDevice={{
                    id: item.maxDevice.id,
                    name: item.maxDevice.name,
                    date: item.maxDevice.created,
                    value: item.maxDevice.value
                  }}
                  avg={item.avg}
                  selected={selectedInfo.selectedDataTypeName == item.dataType}
                  onChangeDataType={onChangeDataType}
                  onChangeDevice={onChangeDevice}
                />
              </Col>
            ))}
          </Row>
        )}
      </>
    );
  }
}

const getUniqueDataTypes = devices => {
  let dataTypesSet = new Set();
  for (let device of devices) {
    if (device.data && device.data.length > 0) {
      for (let dataItem of device.data) {
        dataTypesSet.add(dataItem.dataType);
      }
    }
  }
  return [...dataTypesSet];
};

const getInitialDataTypeObj = dataType => {
  return {
    dataType: dataType,
    minDevice: {
      id: null,
      value: 999999,
      created: null
    },
    maxDevice: {
      id: null,
      value: -999999,
      created: null
    },
    avg: 0
  };
};

const tryUpdateDataTypeObj = (dataTypeObj, id, value, created) => {
  if (dataTypeObj.minDevice.value > value) {
    dataTypeObj.minDevice = {
      id: id,
      value: value,
      created: created
    };
  }
  if (dataTypeObj.maxDevice.value < value) {
    dataTypeObj.maxDevice = {
      id: id,
      value: value,
      created: created
    };
  }
};

const calculateAverage = (currentSum, currentNumDevices) => {
  let avgRounded = 0;
  if (currentNumDevices > 0) {
    let avg = currentSum / currentNumDevices;
    avgRounded = Math.round(avg * 100) / 100;
  }
  return avgRounded;
};

const updateDeviceNames = (minMaxDataTypes, devices) => {
  for (let device of devices) {
    for (let type of minMaxDataTypes) {
      if (type.minDevice.id == device._id) {
        type.minDevice.name = device.name;
      }
      if (type.maxDevice.id == device._id) {
        type.maxDevice.name = device.name;
      }
    }
  }
};

const mapStateToProps = (state, ownProps) => {
  let allDevicesState = {
    loading: state.devices.length == 0,
    devices: state.devices.map(item => item.data)
  };

  let summaryDevicesWithDataState = {
    loading: true,
    ...state.summaryDashboard.devicesWithDataState
  };

  let loading = true;
  let minMaxDataTypes = [];
  if (allDevicesState.loading == false && summaryDevicesWithDataState.loading == false) {
    let summaryDevices = summaryDevicesWithDataState.devices;
    let uniqueDataTypes = getUniqueDataTypes(summaryDevices);

    for (let dataType of uniqueDataTypes) {
      let dataTypeObj = getInitialDataTypeObj(dataType);
      let currentSum = 0;
      let currentNumDevices = 0;
      for (let device of summaryDevices) {
        let dataWithCurrentDataType = device.data.find(item => item.dataType == dataType);
        if (dataWithCurrentDataType) {
          var value = parseFloat(dataWithCurrentDataType.dataValue);
          if (!isNaN(value)) {
            tryUpdateDataTypeObj(dataTypeObj, device.id, value, dataWithCurrentDataType.created);
            currentSum += value;
            currentNumDevices++;
          }
        }
      }
      dataTypeObj.avg = calculateAverage(currentSum, currentNumDevices);
      minMaxDataTypes.push(dataTypeObj);
    }
    updateDeviceNames(minMaxDataTypes, allDevicesState.devices);
    loading = false;
  }
  return { minMaxDataTypes, loading };
};

const mapDispatchToProps = dispatch => {
  return {
    summaryDashboardActions: bindActionCreators(importedSummaryDashboardActions, dispatch)
  };
};

var MinMaxAvgContainerConnected = connect(mapStateToProps, mapDispatchToProps)(MinMaxAvgContainer);

export default withRouter(MinMaxAvgContainerConnected);
