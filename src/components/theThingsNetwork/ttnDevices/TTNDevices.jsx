import React from "react";
import { withRouter, Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedTtnActions from "../../../redux/actions/ttnActions";
import * as importedDeviceActions from "../../../redux/actions/deviceActions";

import toastr from "toastr";

import { Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import LoaderRow from "../../_common/LoaderRow";
import Table from "../../_common/Table";

import TTNDevicesColumnActions from "./TTNDevicesColumnActions";
import TTNDevicesColumnIOTDevice from "./TTNDevicesColumnIOTDevice";

class TTNDevices extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      showOverlay: false,
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
    let btnId = fullBtnId.split("_")[0];
    let devId = fullBtnId.split("_")[1];

    switch (btnId) {
      case "deleteBtn":
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
      showOverlay: true
    });

    var deviceToChange = this.getSelectedDevice(selectedDevice.devId);

    if (
      deviceToChange.connectedIotDevice &&
      deviceToChange.connectedIotDevice._id
    ) {
      ttnActions
        .deleteTTNDeviceInfo(deviceToChange.connectedIotDevice._id)
        .then(() => {
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
          app_id: selectedDevice.appId,
          dev_id: selectedDevice.devId
        })
        .then(() => {
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
      showOverlay: false
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
    const { editMode, showOverlay, selectedDevice } = this.state;
    let redirectLocation = location.pathname.replace("/ttn", "/devices");

    return (
      <>
        {ttnDevicesLoading ? (
          <LoaderRow />
        ) : (
          <Row>
            <Col md="12" className="mt-2 pl-5">
              <h3>Devices</h3>
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
                      <td>{item.devId}</td>
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
                          showOverlay={showOverlay}
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
        iotDevice.ttnInfo != null && iotDevice.ttnInfo.dev_id == ttnDevice.devId
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

var TTNDevicesConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TTNDevices);

export default withRouter(TTNDevicesConnected);
