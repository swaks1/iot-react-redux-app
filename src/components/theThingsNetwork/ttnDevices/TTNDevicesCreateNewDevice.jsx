import React from "react";
import toastr from "toastr";

import { Card, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Modal from "./../../_common/Modal";
import LoaderRow from "./../../_common/LoaderRow";

class TTNDevicesCreateNewDevice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: true,
      saving: false,
      device: {
        devId: "",
        description: ""
      }
    };
  }

  handleInputChange = event => {
    const field = event.target.name;
    let device = this.state.device;

    switch (field) {
      case "device.devId":
        device.devId = event.target.value;
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
                  <div>Enter the following information to create new TTN device: </div>
                </Col>
              </Row>
              <FormGroup row className="mt-3">
                <Label for="device.devId" sm={5}>
                  {" "}
                  Dev Id
                </Label>
                <Col sm={7}>
                  <Input
                    type="text"
                    name="device.devId"
                    id="device.devId"
                    placeholder="TTN Dev Id"
                    onChange={this.handleInputChange}
                    value={this.state.device.devId}
                  />
                  <div className={"text-danger font-weight-bold"}>Lower case letters, no spaces!</div>
                </Col>
              </FormGroup>
              <FormGroup row className="mt-3">
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
      </>
    );
  }
}

export default TTNDevicesCreateNewDevice;
