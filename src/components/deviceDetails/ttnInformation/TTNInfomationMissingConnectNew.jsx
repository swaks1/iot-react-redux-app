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
      saving: false
    };
  }

  localDenyAction = () => {
    this.setState({ isModalOpened: false });
    this.props.denyAction();
  };

  localConfirmAction = () => {
    this.setState({ isModalOpened: false, saving: true });
    this.props.confirmAction();
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.state.isModalOpened}
          modalTitle={"Create new ?"}
          modalBody={
            "Do you want to create new TTN device, and connect it to this device ?"
          }
          confirmText={"Yes"}
          confirmAction={this.localConfirmAction}
          denyText={"No"}
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
