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

class BasicInformationsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isManageDevicesDialogOpened: false
    };
  }

  componentDidMount() {
    let { summaryDashboardActions } = this.props;
    summaryDashboardActions
      .loadSummaryDashboard("beehiveDashboard")
      .catch(error => toastr.error(error));
  }

  handleDialogAction = (data, action) => {
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

  render() {
    const { summaryDeviceIdsState, devicesForDialog } = this.props;

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
                        this.handleDialogAction(null, "OPEN-MANAGE-DEVICES");
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
                        this.handleDialogAction(null, "OPEN");
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
                this.handleDialogAction(devices, "CONFIRM-MANAGE-DEVICES");
              }}
              denyAction={() => {
                this.handleDialogAction(null, "DENY-MANAGE-DEVICES");
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
  return {
    summaryDashboardName,
    summaryDeviceIdsState,
    allDevicesState,
    devicesForDialog
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
