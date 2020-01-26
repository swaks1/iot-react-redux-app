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

class BasicInformationsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isManageDevicesDialogOpened: false,
      isManageDataTypesDialogOpened: false
    };
  }

  componentDidMount() {
    let { summaryDashboardActions } = this.props;
    summaryDashboardActions
      .loadSummaryDashboard("beehiveDashboard")
      .catch(error => toastr.error(error));
  }

  handleManageDevicesDialogAction = (data, action) => {
    const { summaryDashboardActions, summaryDashboardName } = this.props;

    if (action == "OPEN-MANAGE-DEVICES") {
      this.setState({ isManageDevicesDialogOpened: true });
    }

    if (action == "CONFIRM-MANAGE-DEVICES") {
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

    if (action == "DENY-MANAGE-DEVICES") {
      this.setState({ isManageDevicesDialogOpened: false });
    }
  };

  handleManageDataTypesDialogAction = (data, action) => {
    const { summaryDashboardActions, summaryDashboardName } = this.props;

    if (action == "OPEN-MANAGE-DATA-TYPES") {
      this.setState({ isManageDataTypesDialogOpened: true });
    }

    if (action == "CONFIRM-MANAGE-DATA-TYPES") {
      // let checkedDevices = data.filter(item => item.checked);
      // let deviceIds = checkedDevices.map(item => item.id);
      // summaryDashboardActions
      //   .updateDevicesOnSummaryDashboard(summaryDashboardName, deviceIds)
      //   .then(response => {
      //     toastr.success(`Successfully updated summary devices!`);
      //     this.setState({ isManageDevicesDialogOpened: false });
      //   })
      //   .catch(error => {
      //     this.setState({ isManageDevicesDialogOpened: false });
      //     toastr.error("Failed to update summary devices", error);
      //   });
      console.log(data);
      this.setState({ isManageDataTypesDialogOpened: false });
    }

    if (action == "DENY-MANAGE-DATA-TYPES") {
      this.setState({ isManageDataTypesDialogOpened: false });
    }
  };

  render() {
    const {
      summaryDeviceIdsState,
      devicesForDialog,
      dataTypesForDialog
    } = this.props;

    return (
      <>
        {summaryDeviceIdsState.loading ? (
          <LoaderRow style={{ minHeight: "205px" }} />
        ) : (
          <>
            <Row>
              <Col md="12">
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
                        <div className="data-value">
                          {summaryDeviceIdsState.deviceIds.length}
                        </div>
                      </>
                    )
                  }}
                />
              </Col>
              <Col md={12}>
                <Row className="mt-4">
                  <Col className="col text-left pl-2" md={6}>
                    <SpanButton
                      text="devices"
                      tooltip="Manage Devices"
                      faIcon="mobile-alt"
                      style={{ fontSize: "0.9em" }}
                      onClick={() => {
                        this.handleManageDevicesDialogAction(
                          null,
                          "OPEN-MANAGE-DEVICES"
                        );
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
                        this.handleManageDataTypesDialogAction(
                          null,
                          "OPEN-MANAGE-DATA-TYPES"
                        );
                      }}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <ManageDevicesDialog
              isDialogOpened={this.state.isManageDevicesDialogOpened}
              devices={devicesForDialog}
              confirmAction={devices => {
                this.handleManageDevicesDialogAction(
                  devices,
                  "CONFIRM-MANAGE-DEVICES"
                );
              }}
              denyAction={() => {
                this.handleManageDevicesDialogAction(
                  null,
                  "DENY-MANAGE-DEVICES"
                );
              }}
            />
            <ManageDataTypesDialog
              isDialogOpened={this.state.isManageDataTypesDialogOpened}
              dataTypes={dataTypesForDialog}
              confirmAction={dataTypes => {
                this.handleManageDataTypesDialogAction(
                  dataTypes,
                  "CONFIRM-MANAGE-DATA-TYPES"
                );
              }}
              denyAction={() => {
                this.handleManageDataTypesDialogAction(
                  null,
                  "DENY-MANAGE-DATA-TYPES"
                );
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
  if (
    summaryDeviceIdsState.loading == false &&
    allDevicesState.loading == false
  ) {
    devicesForDialog = allDevicesState.devices.map(item => {
      return {
        id: item._id,
        name: item.name,
        checked: summaryDeviceIdsState.deviceIds.indexOf(item._id) != -1
      };
    });
  }

  let dataTypesForDialog = [];
  if (
    summaryDataTypesState.loading == false &&
    allDevicesState.loading == false
  ) {
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
      let existing = summaryDataTypesState.dataTypes.find(
        item => item.name == dataType
      );
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
    summaryDeviceIdsState,
    allDevicesState,
    devicesForDialog,
    dataTypesForDialog
  };
};

const mapDispatchToProps = dispatch => {
  return {
    summaryDashboardActions: bindActionCreators(
      importedSummaryDashboardActions,
      dispatch
    )
  };
};

var BasicInformationsContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicInformationsContainer);

export default withRouter(BasicInformationsContainerConnected);
