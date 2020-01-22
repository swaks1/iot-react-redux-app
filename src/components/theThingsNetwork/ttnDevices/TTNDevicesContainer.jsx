import React from "react";
import { withRouter, Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedTtnActions from "../../../redux/actions/ttnActions";
import * as importedDeviceActions from "../../../redux/actions/deviceActions";

import ReactTooltip from "react-tooltip";
import toastr from "toastr";

import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import LoaderRow from "../../_common/LoaderRow";
import Table from "../../_common/Table";

import TTNDevicesColumnActions from "./TTNDevicesColumnActions";
import TTNDevicesColumnIOTDevice from "./TTNDevicesColumnIOTDevice";
import TTNDevicesCreateNewDevice from "./TTNDevicesCreateNewDevice";

class TTNDevicesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      actionExecuting: false,
      showCreateNewDialog: false,
      selectedDevice: {
        appId: "",
        devId: "",
        connectedIotDevice: {}
      }
    };
  }

  componentDidMount() {
    let { ttnActions } = this.props;
    ttnActions.loadTTNDevices().catch(error => toastr.error(error));
  }

  handleButtonClick = event => {
    let fullBtnId = event.target.id;
    let delimiterIndex = fullBtnId.indexOf("_");
    let btnId = fullBtnId.substring(0, delimiterIndex);
    let devId = fullBtnId.substring(delimiterIndex + 1);

    switch (btnId) {
      case "deleteBtn":
        if (window.confirm("Are you sure you wish to delete this TTN device ?"))
          this.handleDeleteClick(devId);
        break;
      case "editBtn":
        this.setState({
          editMode: true,
          selectedDevice: this.getSelectedDevice(devId)
        });
        break;
      case "updateBtn":
        this.handleUpdateClick();
        break;
      case "cancelBtn":
        this.setState({
          editMode: false,
          selectedDevice: { appId: "", devId: "", connectedIotDevice: {} }
        });
        break;
      default:
        console.log(btnId, devId, "Unknown btn...");
    }
  };

  handleUpdateClick = () => {
    let { ttnActions } = this.props;
    let { selectedDevice } = this.state;

    this.setState({
      actionExecuting: true
    });

    var deviceToChange = this.getSelectedDevice(selectedDevice.devId);

    if (
      deviceToChange.connectedIotDevice &&
      deviceToChange.connectedIotDevice._id
    ) {
      ttnActions
        .deleteTTNDeviceInfo(deviceToChange.connectedIotDevice._id)
        .then(() => {
          toastr.warning(
            `Disconnected IOT device: ${deviceToChange.connectedIotDevice.name}`
          );
          this.updateTTNInfo();
        })
        .catch(error => {
          toastr.error("Failed deleting existing TTN Info..", error);
          this.exitEditMode();
        });
    } else {
      this.updateTTNInfo();
    }
  };

  updateTTNInfo = () => {
    let { ttnActions } = this.props;
    let { selectedDevice } = this.state;

    if (
      selectedDevice.connectedIotDevice &&
      selectedDevice.connectedIotDevice._id
    ) {
      ttnActions
        .saveExistingTTNDevice(selectedDevice.connectedIotDevice._id, {
          appId: selectedDevice.appId,
          devId: selectedDevice.devId
        })
        .then(() => {
          toastr.success("Successfuly changed IOT device! ");
          this.exitEditMode();
        })
        .catch(error => {
          this.exitEditMode();
          throw error;
        });
    } else {
      this.exitEditMode();
    }
  };

  exitEditMode = () => {
    this.setState({
      editMode: false,
      actionExecuting: false
    });
  };

  handleDeleteClick = devId => {
    let { ttnActions } = this.props;

    this.setState({
      actionExecuting: true
    });

    var device = this.getSelectedDevice(devId);
    if (device.connectedIotDevice && device.connectedIotDevice._id) {
      ttnActions
        .deleteTTNDeviceInfo(device.connectedIotDevice._id)
        .then(() => {
          toastr.warning(
            `Disconnected IOT device: ${device.connectedIotDevice.name} !`
          );
        })
        .catch(() => {
          toastr.error("Failed to deleted existing TTN Info");
        });
    }

    ttnActions
      .deleteTTNDevice(devId)
      .then(() => {
        toastr.success(`Successfully deleted TTN device: ${devId}`);
        this.exitEditMode();
      })
      .catch(error => {
        toastr.error("Failed deleting existing TTN device..", error);
        this.exitEditMode();
      });
  };

  handleSelectChange = event => {
    var _id = event.target.value;
    var name = event.target.selectedOptions[0].text;

    let connectedIotDevice = {};

    if (_id) {
      connectedIotDevice = {
        _id,
        name
      };
    }

    this.setState(prevState => ({
      selectedDevice: {
        appId: prevState.selectedDevice.appId,
        devId: prevState.selectedDevice.devId,
        connectedIotDevice: connectedIotDevice
      }
    }));
  };

  handleDialogButton = (data, action) => {
    const { ttnActions } = this.props;

    if (action == "OPEN") {
      this.setState({ showCreateNewDialog: true });
    }

    if (action == "CONFIRMED") {
      ttnActions
        .registerNewTTNDevice(data)
        .then(ttnDevice => {
          toastr.success(
            `Successfully registered device: ${ttnDevice.devId} on app: ${ttnDevice.appId}!`
          );
          this.setState({ showCreateNewDialog: false });
        })
        .catch(error => {
          this.setState({ showCreateNewDialog: false });
          toastr.error("Failed to register TTN device", error);
        });
    }

    if (action == "DENIED") {
      this.setState({ showCreateNewDialog: false });
    }
  };

  getSelectedDevice = devId => {
    let { ttnDevices } = this.props;
    var selectedDevice = ttnDevices.find(item => item.devId == devId);
    return {
      appId: selectedDevice.appId,
      devId: selectedDevice.devId,
      connectedIotDevice: { ...selectedDevice.connectedIotDevice }
    };
  };

  render() {
    const {
      location,
      ttnDevices,
      ttnDevicesLoading,
      notConnectedIotDevices
    } = this.props;
    const { editMode, actionExecuting, selectedDevice } = this.state;
    let redirectLocation = location.pathname.replace("/ttn", "/devices");

    return (
      <>
        <Row>
          <Col md={12}>
            {ttnDevicesLoading ? (
              <LoaderRow />
            ) : (
              <Row>
                <Col md="12" className="mt-2 pl-5">
                  <h3 style={{ display: "inline-block", marginRight: "10px" }}>
                    Devices
                  </h3>
                  <ReactTooltip effect="solid" id="customTooltip">
                    <div className="text-center">
                      <h4 style={{ color: "white" }}>
                        {" "}
                        Register new device on the Things Network ?{" "}
                      </h4>
                    </div>
                    <div
                      className="p-2 mb-2 bg-warning text-white"
                      style={{
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "center",
                        flexFlow: "wrap",
                        maxWidth: "500px"
                      }}
                    >
                      <p style={{ maxWidth: "300px" }}>
                        Currently all newly created devices will be regisered with{" "}
                        <b>OTAA</b> Activation Method.
                      </p>
                      <p style={{ maxWidth: "300px" }}>
                        If <b>ABP</b> is the preffered one, after registering
                        new device, click on the corresponding DevId in the
                        table below and you will be redirected to the device details on TTN
                        netowork.
                      </p>
                      <p style={{ maxWidth: "300px" }}>
                        Then just go to settings and change the Activation
                        Method.
                      </p>
                    </div>
                  </ReactTooltip>
                  <Button
                    color="success"
                    size="sm"
                    id="addNewTTNDevice"
                    onClick={() => {
                      this.handleDialogButton(null, "OPEN");
                    }}
                    data-tip
                    data-for="customTooltip"
                  >
                    +
                  </Button>
                </Col>
                <Col md={{ size: 8, offset: 1 }} className="text-center">
                  <Table>
                    <thead className="text-primary">
                      <tr>
                        <th>Dev Id</th>
                        <th>IOT Device</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ttnDevices.map((item, index) => (
                        <tr key={item.devId}>
                          <td>
                            <a
                              href={`https://console.thethingsnetwork.org/applications/${item.appId}/devices/${item.devId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.devId}
                            </a>
                          </td>
                          <td>
                            <TTNDevicesColumnIOTDevice
                              editMode={editMode}
                              redirectLocation={redirectLocation}
                              currentDevice={{
                                devId: item.devId,
                                connectedIotDevice: item.connectedIotDevice
                              }}
                              selectedDevice={selectedDevice}
                              notConnectedIotDevices={notConnectedIotDevices}
                              onSelectChange={this.handleSelectChange}
                            />
                          </td>
                          <td>
                            <TTNDevicesColumnActions
                              editMode={editMode}
                              actionExecuting={actionExecuting}
                              currentDevice={{
                                devId: item.devId,
                                connectedIotDevice: item.connectedIotDevice
                              }}
                              selectedDevice={selectedDevice}
                              onButtonClick={this.handleButtonClick}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            )}
          </Col>
        </Row>

        {this.state.showCreateNewDialog ? (
          <TTNDevicesCreateNewDevice
            confirmAction={ttnDeviceToRegister => {
              this.handleDialogButton(ttnDeviceToRegister, "CONFIRMED");
            }}
            denyAction={() => {
              this.handleDialogButton(null, "DENIED");
            }}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  let ttnDevices = state.ttnIntegration.deviceState.devices.map(item => item);
  let ttnDevicesLoading = state.ttnIntegration.deviceState.loading;
  let iotDevices = state.devices.map(item => item.data);

  let connectedIotDevices = [];
  // add the iot device as property if the ttn and iot devices are connected
  ttnDevices = ttnDevices.map(ttnDevice => {
    var connectedIotDevice = iotDevices.find(
      iotDevice =>
        iotDevice.ttnInfo != null && iotDevice.ttnInfo.devId == ttnDevice.devId
    );
    if (connectedIotDevice != null) {
      connectedIotDevices.push(connectedIotDevice);
      let updatedTtnDevice = {
        ...ttnDevice,
        connectedIotDevice: {
          _id: connectedIotDevice._id,
          name: connectedIotDevice.name
        }
      };
      return updatedTtnDevice;
    } else {
      return ttnDevice;
    }
  });

  let notConnectedIotDevices = iotDevices.filter(
    iotDevice =>
      connectedIotDevices.some(item => item._id == iotDevice._id) == false
  );

  return {
    ttnDevices,
    ttnDevicesLoading,
    notConnectedIotDevices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ttnActions: bindActionCreators(importedTtnActions, dispatch),
    deviceActions: bindActionCreators(importedDeviceActions, dispatch)
  };
};

var TTNDevicesContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TTNDevicesContainer);

export default withRouter(TTNDevicesContainerConnected);
