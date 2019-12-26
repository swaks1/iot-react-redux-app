import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as importedDeviceActions from "../../redux/actions/deviceActions";

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
import LoaderOverlay from "../_common/LoaderOverlay";

class DeviceTTNInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { lg, md, sm, device, deviceLoading, extendedTTNInfo } = this.props;

    return (
      <>
        <Col lg={lg} md={md} sm={sm}>
          <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
            <h4 className="text-center font-italic font-weight-light">
              Device TTN Information &nbsp;
              {/* <i
                className="fa fa-sync"
                style={{ color: "green", cursor: "pointer" }}
                id="DeviceInformations"
                onClick={onRefreshClick}
              ></i> */}
            </h4>
            <LoaderOverlay isLoading={deviceLoading}>
              <Form>
                <FormGroup row>
                  <Label for="dev_id" sm={5}>
                    {" "}
                    Name
                  </Label>
                  <Col sm={7}>
                    {<h4 className={"col-form-label"}>{device.ttnInfo.dev_id}</h4>}
                  </Col>
                </FormGroup>
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
  let extendedTTNInfo = {
    loading: true
  };
  let deviceObj = getDeviceById(state.devices, deviceId);
  if (deviceObj != null) {
    device = deviceObj.data;
    deviceLoading = deviceObj.loading;
    extendedTTNInfo = deviceObj.externalTTNInfo;
  }
  return {
    device,
    deviceLoading,
    extendedTTNInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deviceActions: bindActionCreators(importedDeviceActions, dispatch)
  };
};

var DeviceTTNInformationContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceTTNInformation);
export default withRouter(DeviceTTNInformationContainer);
