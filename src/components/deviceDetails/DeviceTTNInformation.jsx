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
    this.state = {
      connectExistingMode: false,
      existingTTNDevice: {
        dev_id: "",
        app_id: ""
      }
    };
  }

  handleTTNButtonClick = event => {
    let btnId = event.target.id;
    let existingTTNDevice = this.state.existingTTNDevice;
    let { deviceActions } = { ...this.props };

    switch (btnId) {
      case "deleteExisting":
        deviceActions
          .saveExistingTTNDevice(this.props.device._id, null)
          .then(() => {
            toastr.success("Successfully deleted existing TTN Info !");
            this.setState({
              existingTTNDevice: {
                dev_id: "",
                app_id: ""
              }
            });
          })
          .catch(() => {
            toastr.error("Failed to deleted existing TTN Info");
          });
        break;
      case "connectExisting":
        this.setState({ connectExistingMode: true });
        break;
      case "saveExisting":
        if (
          existingTTNDevice.app_id.trim() == "" ||
          existingTTNDevice.dev_id.trim() == ""
        )
          toastr.error("Enter values for Dev Id and App Id !");
        else {
          deviceActions
            .saveExistingTTNDevice(
              this.props.device._id,
              this.state.existingTTNDevice
            )
            .then(() => {
              toastr.success("Successfully saved existing TTN Info !");
              this.setState({
                existingTTNDevice: {
                  dev_id: "",
                  app_id: ""
                }
              });
            })
            .catch(() => {
              toastr.error("Failed to save existing TTN Info");
            });
        }
        break;
      case "cancelExisting":
        this.setState({
          connectExistingMode: false,
          existingTTNDevice: {
            dev_id: "",
            app_id: ""
          }
        });
        break;

      case "connectNew":
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
    const { lg, md, sm, device, deviceLoading, extendedTTNInfo } = this.props;

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
                  <>
                    <FormGroup row>
                      <Label for="app_id" sm={5}>
                        {" "}
                        App Id
                      </Label>
                      <Col sm={7}>
                        {
                          <h4 className={"col-form-label"}>
                            {device.ttnInfo.app_id}
                          </h4>
                        }
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="dev_id" sm={5}>
                        {" "}
                        Dev Id
                      </Label>
                      <Col sm={7}>
                        {
                          <h4 className={"col-form-label"}>
                            {device.ttnInfo.dev_id}
                          </h4>
                        }
                      </Col>
                    </FormGroup>
                    <Row className="mt-5">
                      <Col sm={{ size: 4, offset: 6 }} className="text-center">
                        <Button
                          color="danger"
                          size="sm"
                          id="deleteExisting"
                          onClick={this.handleTTNButtonClick}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col sm="12" className="text-center">
                        <h4>
                          {" "}
                          No TTN Device connected...{" "}
                          <i
                            className="fa fa-times fa-2x"
                            style={{ color: "red" }}
                          />
                        </h4>
                      </Col>
                    </Row>
                    {this.state.connectExistingMode == false ? (
                      <>
                        <Row className="mt-5">
                          <Col
                            sm={{ size: 4, offset: 1 }}
                            className="text-center"
                          >
                            <Button
                              color="default"
                              size="sm"
                              id="connectExisting"
                              onClick={this.handleTTNButtonClick}
                            >
                              Connect Existing
                            </Button>
                          </Col>

                          <Col
                            sm={{ size: 4, offset: 1 }}
                            className="text-center"
                          >
                            <Button
                              color="info"
                              size="sm"
                              id="connectNew"
                              onClick={this.handleTTNButtonClick}
                            >
                              Connect NEW
                            </Button>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <>
                        <FormGroup row>
                          <Label for="existingTTNDevice.app_id" sm={5}>
                            {" "}
                            TTN App Id
                          </Label>
                          <Col sm={7}>
                            <Input
                              type="text"
                              name="existingTTNDevice.app_id"
                              id="existingTTNDevice.app_id"
                              placeholder="TTN App Id"
                              onChange={this.handleExistingTTNDeviceFieldChange}
                              value={this.state.existingTTNDevice.app_id}
                            />
                          </Col>
                        </FormGroup>
                        <FormGroup row>
                          <Label for="existingTTNDevice.dev_id" sm={5}>
                            {" "}
                            TTN Dev Id
                          </Label>
                          <Col sm={7}>
                            <Input
                              type="text"
                              name="existingTTNDevice.dev_id"
                              id="existingTTNDevice.dev_id"
                              placeholder="TTN Dev Id"
                              onChange={this.handleExistingTTNDeviceFieldChange}
                              value={this.state.existingTTNDevice.dev_id}
                            />
                          </Col>
                        </FormGroup>
                        <Row>
                          <Col
                            sm={{ size: 4, offset: 1 }}
                            className="text-center"
                          >
                            <Button
                              color="success"
                              size="lg"
                              id="saveExisting"
                              onClick={this.handleTTNButtonClick}
                            >
                              Save
                            </Button>
                          </Col>
                          <Col
                            sm={{ size: 4, offset: 1 }}
                            className="text-center"
                          >
                            <Button
                              color="danger"
                              size="lg"
                              id="cancelExisting"
                              onClick={this.handleTTNButtonClick}
                            >
                              Cancel
                            </Button>
                          </Col>
                        </Row>
                      </>
                    )}
                  </>
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
