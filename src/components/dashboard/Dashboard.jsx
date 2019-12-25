import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedDeviceActions from "../../redux/actions/deviceActions";

import toastr from "toastr";

import DashboardCard from "./DashboardCard";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { devices, devicesLoading } = this.props;
    return <DashboardCard devices={devices} loading={devicesLoading} />;
  }
}

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  let allDevices = state.devices.map((item, index) => {
    return item.data;
  });

  let devicesOnDashboard = allDevices.filter(
    item => item.isAddedToDashboard == true
  );

  return {
    devices: devicesOnDashboard,
    devicesLoading: allDevices.length == 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deviceActions: bindActionCreators(importedDeviceActions, dispatch)
  };
};

var DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
export default withRouter(DashboardContainer);
