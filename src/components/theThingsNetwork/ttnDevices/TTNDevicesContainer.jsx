import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedTtnActions from "../../../redux/actions/ttnActions";

import toastr from "toastr";
import { Row, Col, Button } from "reactstrap";

import TTNDevices from "./TTNDevices";

class TTNDevicesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const { ttnActions } = this.props;

    return (
      <>
        <Row>
          <Col md={{ size: 10, offset: 1 }} className="text-right">
            <Button
              color="success"
              size="sm"
              id="addNewTTNDevice"
              onClick={() => {}}
            >
              New TTN Device
            </Button>
          </Col>
          <Col md={12}>
            <TTNDevices></TTNDevices>
          </Col>
        </Row>
      </>
    );
  }
}


export default withRouter(TTNDevicesContainer);
