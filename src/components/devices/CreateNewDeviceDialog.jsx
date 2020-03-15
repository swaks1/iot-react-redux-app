import React from "react";
import toastr from "toastr";

import { Card, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Modal from "./../_common/Modal";

class CreateNewDeviceDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpened: true,
      confirming: false,
      device: {
        name: "",
        description: "",
        location: {
          lat: "10",
          lng: "10",
          description: "No Location"
        }
      }
    };
  }

  handleInputChange = event => {
    const field = event.target.name;
    let device = this.state.device;

    switch (field) {
      case "location.lat":
        device.location.lat = event.target.value;
        break;
      case "location.lng":
        device.location.lng = event.target.value;
        break;
      case "location.description":
        device.location.description = event.target.value;
        break;
      default:
        device[field] = event.target.value;
    }

    return this.setState({ device });
  };

  localDenyAction = () => {
    this.props.denyAction();
  };

  localConfirmAction = () => {
    this.setState({ confirming: true });
    this.props.confirmAction(this.state.device);
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.isModalOpened}
          confirming={this.state.confirming}
          modalTitle={"Create new ?"}
          modalBody={
            <>
              <Row>
                <Col md={12}>
                  <div>Enter the following information to create new IoT device: </div>
                </Col>
              </Row>
              <FormGroup row className="mt-3">
                <Label for="name" sm={5}>
                  {" "}
                  Name:
                </Label>
                <Col sm={7}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={this.handleInputChange}
                    value={this.state.device.name}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="mt-3">
                <Label for="description" sm={5}>
                  {" "}
                  Description
                </Label>
                <Col sm={7}>
                  <Input
                    type="text"
                    name="description"
                    id="description"
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

export default CreateNewDeviceDialog;
