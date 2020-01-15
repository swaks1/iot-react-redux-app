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

import { prefix } from "../../../routes";

import LoaderRow from "../../_common/LoaderRow";
import TTNInfomationMissingAvailableActions from "./TTNInfomationMissingAvailableActions";
import TTNDevicesCreateNewDevice from "../../theThingsNetwork/ttnDevices/TTNDevicesCreateNewDevice";

class TTNInfomationMissing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connectNew: false
    };
  }

  handleTTNButtonClick = event => {
    let btnId = event.target.id;
    let { ttnActions, history } = this.props;

    switch (btnId) {
      case "connectExisting":
        history.push(`/${prefix}/ttn`);
        break;

      case "connectNew":
        this.setState({ connectNew: true });
        break;

      case "connectNew_Yes":
        ttnActions
          .registerNewTTNDevice(event.data)
          .then(ttnDevice => {
            ttnActions
              .saveExistingTTNDevice(this.props.device._id, {
                app_id: ttnDevice.appId,
                dev_id: ttnDevice.devId
              })
              .then(() => {
                toastr.success(
                  "Successfully registered TTN Device and connected it to this IOT device !"
                );
              })
              .catch(error => {
                throw error;
              });
          })
          .catch(error => {
            this.setState({ connectNew: false });
            toastr.error("Failed to register or conneect TTN device", error);
          });
        break;

      case "connectNew_No":
        this.setState({ connectNew: false });
        break;

      default:
        console.log("unknown btn command");
    }
  };

  render() {
    const { location } = this.props;

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
        {this.state.connectNew ? (
          <>
            <TTNDevicesCreateNewDevice
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
            <LoaderRow />
          </>
        ) : (
          <TTNInfomationMissingAvailableActions
            location={location}
            onTTNButtonClick={this.handleTTNButtonClick}
          />
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
