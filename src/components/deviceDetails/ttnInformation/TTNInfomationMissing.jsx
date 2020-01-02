import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as importedTTNActions from "../../../redux/actions/ttnActions";

import toastr from "toastr";

import {
  Card,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import TTNInfomationMissingAvailableActions from "./TTNInfomationMissingAvailableActions";
import TTNInfomationMissingConnectExisting from "./TTNInfomationMissingConnectExisting";
import TTNInfomationMissingConnectNew from "./TTNInfomationMissingConnectNew";

class TTNInfomationMissing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectExisting: false,
      connectNew: false,
      existingTTNDevice: {
        dev_id: "",
        app_id: ""
      }
    };
  }

  handleTTNButtonClick = event => {
    let btnId = event.target.id;
    let existingTTNDevice = this.state.existingTTNDevice;
    let { ttnActions } = { ...this.props };

    switch (btnId) {
      case "connectExisting":
        this.setState({ connectExisting: true });
        break;

      case "saveExisting":
        if (
          existingTTNDevice.app_id.trim() == "" ||
          existingTTNDevice.dev_id.trim() == ""
        )
          toastr.error("Enter values for Dev Id and App Id !");
        else {
          ttnActions
            .saveExistingTTNDevice(
              this.props.device._id,
              this.state.existingTTNDevice
            )
            .then(() => {
              toastr.success("Successfully saved existing TTN Info !");
            })
            .catch(() => {
              toastr.error("Failed to save existing TTN Info");
            });
        }
        break;
      case "cancelExisting":
        this.setState({
          connectExisting: false,
          existingTTNDevice: {
            dev_id: "",
            app_id: ""
          }
        });
        break;

      case "connectNew":
        this.setState({ connectNew: true });
        break;

        
      case "connectNew_Yes":
        ttnActions
          .registerNewTTNDevice(this.props.device._id, event.data)
          .then(() => {
            toastr.success(
              "Successfully registered and connected TTN device !"
            );
          })
          .catch(() => {
            this.setState({ connectNew: false });
            toastr.error("Failed to register and conneect TTN device");
          });
        break;

      case "connectNew_No":
        this.setState({ connectNew: false });
        break;

      default:
        console.log("unknown btn command");
    }
  };

  handleExistingTTNDeviceFieldChange = event => {
    const field = event.target.name;
    var existingTTNDevice = this.state.existingTTNDevice;
    switch (field) {
      case "existingTTNDevice.app_id":
        existingTTNDevice.app_id = event.target.value;
        break;
      case "existingTTNDevice.dev_id":
        existingTTNDevice.dev_id = event.target.value;
        break;
      default:
        existingTTNDevice[field] = event.target.value;
    }

    return this.setState({ existingTTNDevice });
  };

  render() {
    //const { lg, md, sm, device, deviceLoading, extendedTTNInfo } = this.props;

    return (
      <>
        <Row>
          <Col sm="12" className="text-center">
            <h4>
              {" "}
              No TTN Device connected...{" "}
              <i className="fa fa-times fa-2x" style={{ color: "red" }} />
            </h4>
          </Col>
        </Row>
        {this.state.connectExisting == false &&
        this.state.connectNew == false ? (
          <TTNInfomationMissingAvailableActions
            onTTNButtonClick={this.handleTTNButtonClick}
          />
        ) : this.state.connectExisting ? (
          <TTNInfomationMissingConnectExisting
            existingTTNDevice={this.state.existingTTNDevice}
            onTTNButtonClick={this.handleTTNButtonClick}
            onExistingTTNDeviceFieldChange={
              this.handleExistingTTNDeviceFieldChange
            }
          />
        ) : this.state.connectNew ? (
          <>
            <TTNInfomationMissingConnectNew
              confirmAction={ttnDeviceToRegister => {
                this.handleTTNButtonClick({
                  data: ttnDeviceToRegister,
                  target: { id: "connectNew_Yes" }
                });
              }}
              denyAction={() => {
                this.handleTTNButtonClick({
                  target: { id: "connectNew_No" }
                });
              }}
            />
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const getDeviceById = (devices, id) => {
  const filtered = devices.filter(d => d.deviceId === id);
  if (filtered.length > 0) return filtered[0];
  return null;
};
//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  const deviceId = ownProps.match.params.id; // from the path '/devices/:id'

  let device = null;
  let deviceLoading = true;

  let deviceObj = getDeviceById(state.devices, deviceId);
  if (deviceObj != null) {
    device = deviceObj.data;
    deviceLoading = deviceObj.loading;
  }
  return {
    device,
    deviceLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ttnActions: bindActionCreators(importedTTNActions, dispatch)
  };
};

var TTNInfomationMissingConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TTNInfomationMissing);
export default withRouter(TTNInfomationMissingConnected);
