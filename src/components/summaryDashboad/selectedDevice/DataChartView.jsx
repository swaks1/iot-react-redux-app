import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedDeviceDataActions from "../../../redux/actions/deviceDataActions";

import { Row, Col, Button } from "reactstrap";

import LoaderRow from "../../_common/LoaderRow";
import DeviceDataLineChart from "../../deviceDetails/DeviceDataLineChart";

class DataChartView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let { deviceDataActions } = this.props;
    if (this.props.selectedInfo && this.props.selectedInfo.selectedDevice) {
      const {
        id,
        dataType,
        dataPeriod
      } = this.props.selectedInfo.selectedDevice;
      if (id != null && dataType != null && dataPeriod != null) {
        deviceDataActions.loadDeviceData(id, dataPeriod, dataType);
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let { deviceDataActions } = this.props;
    let prevSelectedDevice =
      prevProps.selectedInfo && prevProps.selectedInfo.selectedDevice
        ? prevProps.selectedInfo.selectedDevice
        : {};
    let currentSelectedDevice =
      this.props.selectedInfo && this.props.selectedInfo.selectedDevice
        ? this.props.selectedInfo.selectedDevice
        : {};

    if (
      prevSelectedDevice.id !== currentSelectedDevice.id ||
      prevSelectedDevice.dataType !== currentSelectedDevice.dataType ||
      prevSelectedDevice.dataPeriod !== currentSelectedDevice.dataPeriod
    ) {
      const { id, dataType, dataPeriod } = currentSelectedDevice;
      if (id != null && dataType != null && dataPeriod != null) {
        deviceDataActions.loadDeviceData(id, dataPeriod, dataType);
      }
    }
  }

  render() {
    let {
      selectedInfo,
      onChangeDeviceDataPeriod,
      loading,
      data,
      dataType,
      dataPeriod
    } = this.props;

    return (
      <>
        <DeviceDataLineChart
          lg="12"
          md="12"
          sm="12"
          deviceData={data}
          deviceDataLoading={loading}
          onDataLineChartButtonClick={onChangeDeviceDataPeriod}
          dataType={dataType}
          dataPeriod={dataPeriod}
        />
      </>
    );
  }
}

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  let loading = true;
  let data = [];
  let dataType = "";
  let dataPeriod = "mostRecent";

  if (
    ownProps.selectedInfo &&
    ownProps.selectedInfo.selectedDevice &&
    ownProps.selectedInfo.selectedDevice.id
  ) {
    dataType = ownProps.selectedInfo.selectedDevice.dataType;
    dataPeriod = ownProps.selectedInfo.selectedDevice.dataPeriod;

    let deviceId = ownProps.selectedInfo.selectedDevice.id;
    let deviceDataObj = state.deviceData.find(d => d.deviceId == deviceId);
    if (deviceDataObj != null) {
      data = deviceDataObj.data;
      loading = deviceDataObj.loading;
    }
  }

  return {
    data,
    loading,
    dataType,
    dataPeriod
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deviceDataActions: bindActionCreators(importedDeviceDataActions, dispatch)
  };
};

var DataChartViewConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DataChartView);

export default withRouter(DataChartViewConnected);
