import React from "react";
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
import Modal from "./../../_common/Modal";
import LoaderRow from "./../../_common/LoaderRow";

class TTNInfomationMissingConnectNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: true,
      saving: false,
      device: {
        appId: "",
        description: ""
      }
    };
  }

  handleInputChange = event => {
    const field = event.target.name;
    let device = this.state.device;

    switch (field) {
      case "device.appId":
        device.appId = event.target.value;
        break;
      case "device.description":
        device.description = event.target.value;
        break;
      default:
        device[field] = event.target.value;
    }

    return this.setState({ device });
  };

  localDenyAction = () => {
    this.setState({ isModalOpened: false });
    this.props.denyAction();
  };

  localConfirmAction = () => {
    this.setState({ isModalOpened: false, saving: true });
    this.props.confirmAction(this.state.device);
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.isModalOpened}
          modalTitle={"Create new ?"}
          modalBody={
            <>
              <Row>
                <Col md={12}>
                  <div>
                    Enter the following information to create new TTN device:{" "}
                  </div>
                </Col>
              </Row>
              <FormGroup row className="mt-3">
                <Label for="device.appId" sm={5}>
                  {" "}
                  App Id:
                </Label>
                <Col sm={7}>
                  <Input
                    type="text"
                    name="device.appId"
                    id="device.appId"
                    placeholder="TTN App Id"
                    onChange={this.handleInputChange}
                    value={this.state.device.devId}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="device.description" sm={5}>
                  {" "}
                  Description
                </Label>
                <Col sm={7}>
                  <Input
                    type="text"
                    name="device.description"
                    id="device.description"
                    placeholder="Description"
                    onChange={this.handleInputChange}
                    value={this.state.device.description}
                  />
                </Col>
              </FormGroup>
            </>
          }
          confirmText={"OK"}
          confirmAction={this.localConfirmAction}
          denyText={"Cancel"}
          denyAction={this.localDenyAction}
          toggle={this.localDenyAction}
        />
        {this.state.saving ? (
          <>
            <Row>
              <Col md={12}>
                <h4>Connecting... </h4>
              </Col>
            </Row>
            <LoaderRow />
          </>
        ) : (
          <>
            <Row>
              <Col md={12}>
                <h4>Connect new.. ?? </h4>
              </Col>
            </Row>
          </>
        )}
      </>
    );
  }
}

export default TTNInfomationMissingConnectNew;
