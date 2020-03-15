import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedSummaryDashboardActions from "../../../redux/actions/summaryDashboardActions";

import toastr from "toastr";
import { Row, Col, Button } from "reactstrap";

import LoaderRow from "../../_common/LoaderRow";
import SpanButton from "../../_common/SpanButton";
import CustomCard from "../../_common/CustomCard";

import ManageDevicesDialog from "./ManageDevicesDialog";
import ManageDataTypesDialog from "./ManageDataTypesDialog";
import ManagePeriodInPastDialog from "./ManagePeriodInPastDialog";

class BasicInformationsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isManagePeriodInPastDialogOpened: false,
      isManageDevicesDialogOpened: false,
      isManageDataTypesDialogOpened: false
    };
  }
  handleManagePeriodInPastDialogAction = (data, action) => {
    const { summaryDashboardActions, summaryDashboardName } = this.props;

    if (action == "OPEN") {
      this.setState({ isManagePeriodInPastDialogOpened: true });
    }

    if (action == "CONFIRM") {
      summaryDashboardActions
        .updatePeriodInPast(summaryDashboardName, data)
        .then(response => {
          toastr.success(`Successfully updated period in past!`);
          this.setState({ isManagePeriodInPastDialogOpened: false });
        })
        .catch(error => {
          this.setState({ isManagePeriodInPastDialogOpened: false });
          toastr.error("Failed to update peirod in past!", error);
        });
    }

    if (action == "DENY") {
      this.setState({ isManagePeriodInPastDialogOpened: false });
    }
  };

  handleManageDevicesDialogAction = (data, action) => {
    const { summaryDashboardActions, summaryDashboardName } = this.props;

    if (action == "OPEN") {
      this.setState({ isManageDevicesDialogOpened: true });
    }

    if (action == "CONFIRM") {
      let checkedDevices = data.filter(item => item.checked);
      let deviceIds = checkedDevices.map(item => item.id);
      summaryDashboardActions
        .updateDevicesOnSummaryDashboard(summaryDashboardName, deviceIds)
        .then(response => {
          toastr.success(`Successfully updated summary devices!`);
          this.setState({ isManageDevicesDialogOpened: false });
        })
        .catch(error => {
          this.setState({ isManageDevicesDialogOpened: false });
          toastr.error("Failed to update summary devices", error);
        });
    }

    if (action == "DENY") {
      this.setState({ isManageDevicesDialogOpened: false });
    }
  };

  handleManageDataTypesDialogAction = (data, action) => {
    const { summaryDashboardActions, summaryDashboardName } = this.props;

    if (action == "OPEN") {
      this.setState({ isManageDataTypesDialogOpened: true });
    }

    if (action == "CONFIRM") {
      summaryDashboardActions
        .updateDataTypesOnSummaryDashboard(summaryDashboardName, data)
        .then(response => {
          toastr.success(`Successfully updated data types!`);
        })
        .catch(error => {
          toastr.error("Failed to update summary data types!", error);
        });
      this.setState({ isManageDataTypesDialogOpened: false });
    }

    if (action == "DENY") {
      this.setState({ isManageDataTypesDialogOpened: false });
    }
  };

  render() {
    const { periodInPast, summaryDeviceIdsState, devicesForDialog, dataTypesForDialog } = this.props;

    return (
      <>
        {summaryDeviceIdsState.loading ? (
          <LoaderRow style={{ minHeight: "210px" }} />
        ) : (
          <>
            <Row>
              <Col md="12" className="mt-2">
                <CustomCard
                  card={{
                    className: "custom-summary-card"
                  }}
                  header={{
                    className: "text-uppercase text-center",
                    elements: (
                      <>
                        <span>Total Hives</span>
                        <i className={`fa fa-mobile-alt`}></i>
                      </>
                    )
                  }}
                  body={{
                    className: "text-center",
                    elements: (
                      <>
                        <div className="data-value">{summaryDeviceIdsState.deviceIds.length}</div>
                      </>
                    )
                  }}
                />
              </Col>
              <Col md={12}>
                <Row className="mt-3">
                  <Col className="col text-center" md={12}>
                    <SpanButton
                      text={`Period in the past: ${periodInPast} Hours`}
                      tooltip="Change Period"
                      faIcon="clock"
                      style={{ fontSize: "0.9em" }}
                      onClick={() => {
                        this.handleManagePeriodInPastDialogAction(null, "OPEN");
                      }}
                    />
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col className="col text-left pl-2" md={6}>
                    <SpanButton
                      text="devices"
                      tooltip="Manage Devices"
                      faIcon="mobile-alt"
                      style={{ fontSize: "0.9em" }}
                      onClick={() => {
                        this.handleManageDevicesDialogAction(null, "OPEN");
                      }}
                    />
                  </Col>
                  <Col className="col text-right pr-2" md={6}>
                    <SpanButton
                      text="data-types"
                      tooltip="Manage Data Types"
                      faIcon="link"
                      style={{ fontSize: "0.9em" }}
                      onClick={() => {
                        this.handleManageDataTypesDialogAction(null, "OPEN");
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <ManagePeriodInPastDialog
              isDialogOpened={this.state.isManagePeriodInPastDialogOpened}
              periodInPast={periodInPast}
              confirmAction={newPeriodInPast => {
                this.handleManagePeriodInPastDialogAction(newPeriodInPast, "CONFIRM");
              }}
              denyAction={() => {
                this.handleManagePeriodInPastDialogAction(null, "DENY");
              }}
            />
            <ManageDevicesDialog
              isDialogOpened={this.state.isManageDevicesDialogOpened}
              devices={devicesForDialog}
              confirmAction={devices => {
                this.handleManageDevicesDialogAction(devices, "CONFIRM");
              }}
              denyAction={() => {
                this.handleManageDevicesDialogAction(null, "DENY");
              }}
            />
            <ManageDataTypesDialog
              isDialogOpened={this.state.isManageDataTypesDialogOpened}
              dataTypes={dataTypesForDialog}
              confirmAction={dataTypes => {
                this.handleManageDataTypesDialogAction(dataTypes, "CONFIRM");
              }}
              denyAction={() => {
                this.handleManageDataTypesDialogAction(null, "DENY");
              }}
            />
          </>
        )}
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

  let allDevicesState = {
    loading: state.devices.length == 0,
    devices: state.devices.map(item => item.data)
  };

  let summaryDataTypesState = {
    loading: true,
    ...state.summaryDashboard.dataTypesState
  };

  let devicesForDialog = [];
  if (summaryDeviceIdsState.loading == false && allDevicesState.loading == false) {
    devicesForDialog = allDevicesState.devices.map(item => {
      return {
        id: item._id,
        name: item.name,
        checked: summaryDeviceIdsState.deviceIds.indexOf(item._id) != -1
      };
    });
  }

  let dataTypesForDialog = [];
  if (summaryDataTypesState.loading == false && allDevicesState.loading == false) {
    let dataTypesSet = new Set();
    allDevicesState.devices.forEach(device => {
      if (device.dataTypes && device.dataTypes.length > 0) {
        device.dataTypes.forEach(dataType => {
          dataTypesSet.add(dataType);
        });
      }
    });
    let uniqueDataTypes = [...dataTypesSet]; // just transfer set to array

    dataTypesForDialog = uniqueDataTypes.map(dataType => {
      let existing = summaryDataTypesState.dataTypes.find(item => item.name == dataType);
      return {
        name: dataType,
        minValue: existing ? existing.minValue : 0,
        maxValue: existing ? existing.maxValue : 10,
        checked: existing ? true : false
      };
    });
  }

  return {
    summaryDashboardName,
    periodInPast,
    summaryDeviceIdsState,
    allDevicesState,
    devicesForDialog,
    dataTypesForDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    summaryDashboardActions: bindActionCreators(importedSummaryDashboardActions, dispatch)
  };
};

var BasicInformationsContainerConnected = connect(mapStateToProps, mapDispatchToProps)(BasicInformationsContainer);

export default withRouter(BasicInformationsContainerConnected);
