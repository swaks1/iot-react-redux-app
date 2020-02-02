import React from "react";

import toastr from "toastr";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import Modal from "./../../_common/Modal";
import LoaderRow from "../../_common/LoaderRow";

class ManagePeriodInPastDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      periodInPast: this.props.periodInPast
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.periodInPast !== this.props.periodInPast) {
      this.setState({
        confirming: false,
        periodInPast: this.props.periodInPast
      });
    }
    if (prevProps.isDialogOpened !== this.props.isDialogOpened) {
      this.setState({ confirming: false });
    }
  }

  handleInputChanged = event => {
    const name = event.target.name;
    let value = event.target.value;
    this.setState({ periodInPast: value });
  };

  localDenyAction = () => {
    this.props.denyAction();
  };

  localConfirmAction = () => {
    try {
      let periodInPast = parseInt(this.state.periodInPast);
      if (isNaN(periodInPast)) {
        toastr.error(`Enter valid numbers for hours in past !`);
        throw new Error();
      } else {
        this.setState({ confirming: true });
        this.props.confirmAction(periodInPast);
      }
    } catch (error) {
      return;
    }
  };

  render() {
    const { isDialogOpened } = this.props;
    const { periodInPast } = this.state;

    return (
      <>
        <Modal
          isOpen={isDialogOpened}
          confirming={this.state.confirming}
          modalTitle={"Manage period in past..."}
          modalBody={
            <>
              <Row>
                <Col md={12} className="text-center">
                  <p className="text-info" style={{ fontSize: "1.3em" }}>
                    Here you can set the max hours in the past from which the
                    data will be loaded and shown on the dashboard.
                  </p>
                  <br></br>
                </Col>
                <Col md={12}>
                  <FormGroup row>
                    <Label for={`periodInPast`} sm={6}>
                      Period In Past (Hours):
                    </Label>
                    <Col sm={6}>
                      <Input
                        type="text"
                        name={`periodInPast`}
                        id={`periodInPast`}
                        placeholder="Period In Past"
                        onChange={this.handleInputChanged}
                        value={this.state.periodInPast}
                      />
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </>
          }
          confirmText={"SAVE"}
          confirmAction={this.localConfirmAction}
          denyText={"Cancel"}
          denyAction={this.localDenyAction}
          toggle={this.localDenyAction}
        />
      </>
    );
  }
}

export default ManagePeriodInPastDialog;
