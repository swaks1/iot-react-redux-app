import React from "react";

import { Row, Col } from "reactstrap";
import Modal from "./../../_common/Modal";
import LoaderRow from "../../_common/LoaderRow";
import CustomCheckBox from "../../_common/CustomCheckBox";

class ManageDevicesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      devices: []
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.devices !== this.props.devices) {
      this.setState({ confirming: false, devices: this.props.devices });
    }
    if (prevProps.isDialogOpened !== this.props.isDialogOpened) {
      this.setState({ confirming: false });
    }
  }

  handleCheckboxChanged = event => {
    const deviceId = event.target.name;
    let devices = this.state.devices.map(item => {
      if (item.id == deviceId) {
        return { ...item, checked: event.target.checked };
      }
      return item;
    });
    this.setState({ devices });
  };

  localDenyAction = () => {
    this.props.denyAction();
  };

  localConfirmAction = () => {
    this.setState({ confirming: true });
    this.props.confirmAction(this.state.devices);
  };

  render() {
    const { isDialogOpened } = this.props;
    const { devices } = this.state;

    return (
      <>
        <Modal
          isOpen={isDialogOpened}
          confirming={this.state.confirming}
          modalTitle={"Manage devices for summary..."}
          modalBody={
            <>
              {devices ? (
                <Row>
                  {devices.map((item, index) => (
                    <Col md={6} className="mt-2" key={item.id}>
                      <CustomCheckBox
                        name={item.id}
                        checked={item.checked}
                        onChange={this.handleCheckboxChanged}
                        label={item.name}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <LoaderRow />
              )}
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

export default ManageDevicesDialog;
