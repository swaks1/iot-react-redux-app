import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as importedTTNActions from "../../../redux/actions/ttnActions";

import toastr from "toastr";

import { Card, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import LoaderOverlay from "../../_common/LoaderOverlay";
import TTNInfomationExist from "./TTNInfomationExist";
import TTNInfomationMissing from "./TTNInfomationMissing";

class TTNInformationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { lg, md, sm, device, deviceLoading } = this.props;

    return (
      <>
        <Col lg={lg} md={md} sm={sm}>
          <Card style={{ backgroundColor: "#f7f6f6", padding: "0px 0px" }}>
            <Row>
              <Col md={12}>
                <i className="fa fa-signal"></i> LoraWAN (The Things Network)
              </Col>
            </Row>
            <Form>
              {device && device.ttnInfo && device.ttnInfo.devId ? <TTNInfomationExist /> : <TTNInfomationMissing />}
            </Form>
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

var TTNInformationContainerConnected = connect(mapStateToProps, mapDispatchToProps)(TTNInformationContainer);
export default withRouter(TTNInformationContainerConnected);
