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
import LoaderOverlay from "../../_common/LoaderOverlay";
import TTNInfomationExist from "./TTNInfomationExist";
import TTNInfomationMissing from "./TTNInfomationMissing";

class TTNInformationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDeleteTTNInfo = event => {
    let { ttnActions } = { ...this.props };
    ttnActions
      .saveExistingTTNDevice(this.props.device._id, null)
      .then(() => {
        toastr.success("Successfully deleted existing TTN Info !");
      })
      .catch(() => {
        toastr.error("Failed to deleted existing TTN Info");
      });
  };

  render() {
    const { lg, md, sm, device, deviceLoading } = this.props;

    return (
      <>
        <Col lg={lg} md={md} sm={sm}>
          <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
            <h4 className="text-center font-italic font-weight-light">
              Device TTN Information &nbsp;
            </h4>
            <LoaderOverlay isLoading={deviceLoading}>
              <Form>
                {device.ttnInfo && device.ttnInfo.dev_id ? (
                  <TTNInfomationExist />
                ) : (
                  <TTNInfomationMissing />
                )}
              </Form>
            </LoaderOverlay>
          </Card>
        </Col>
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

var TTNInformationContainerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TTNInformationContainer);
export default withRouter(TTNInformationContainerConnected);
