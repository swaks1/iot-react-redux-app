import React from "react";

import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import toastr from "toastr";

import { helper } from "../../../utils/helper";

import Modal from "./../../_common/Modal";
import LoaderRow from "../../_common/LoaderRow";
import CustomCheckBox from "../../_common/CustomCheckBox";

class ManageRulesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      alert: {}
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.alert !== this.props.alert) {
      this.setState({ confirming: false, alert: this.props.alert });
    }
    if (prevProps.isDialogOpened !== this.props.isDialogOpened) {
      this.setState({ confirming: false });
    }
  }

  handleCheckboxChanged = event => {
    const operator = event.target.name;
    let rules = this.state.alert.rules.map(item => {
      if (item.operator == operator) {
        return { ...item, selected: event.target.checked };
      }
      return item;
    });
    this.setState(prevState => ({
      alert: {
        ...prevState.alert,
        rules: rules
      }
    }));
  };

  handleCheckboxChangedChannel = event => {
    const channelName = event.target.name;
    let channels = this.state.alert.channels.map(item => {
      if (item.name == channelName) {
        return { ...item, selected: event.target.checked };
      }
      return item;
    });
    this.setState(prevState => ({
      alert: {
        ...prevState.alert,
        channels: channels
      }
    }));
  };

  handleInputChanged = event => {
    const name = event.target.name;
    let operator = name.substring(0, name.lastIndexOf("_"));
    let rules = this.state.alert.rules.map(item => {
      if (item.operator == operator) {
        return {
          ...item,
          operatorValue: event.target.value
        };
      }
      return item;
    });
    this.setState(prevState => ({
      alert: {
        ...prevState.alert,
        rules: rules
      }
    }));
  };

  getLabel = operator => {
    if (operator == "lastSeen") {
      return "before (minutes)";
    } else {
      return "than";
    }
  };

  localDenyAction = () => {
    this.props.denyAction();
  };

  localConfirmAction = () => {
    try {
      let rules = this.state.alert.rules;
      if (rules.some(rule => isNaN(parseFloat(rule.operatorValue)))) {
        toastr.error(`Enter valid numbers for operator values !`);
        throw new Error();
      } else {
        this.setState({ confirming: true });
        this.props.confirmAction(this.state.alert);
      }
    } catch (error) {
      return;
    }
  };

  render() {
    const { isDialogOpened } = this.props;
    const { alert } = this.state;

    return (
      <>
        <Modal
          isOpen={isDialogOpened}
          confirming={this.state.confirming}
          modalTitle={`Manage alert for ${alert && alert.dataType ? alert.dataType : ""}...`}
          modalBody={
            <>
              <Row>
                <Col md="12">
                  <h4 style={{ textTransform: "uppercase" }}>
                    {alert.dataType} <i className={`fa fa-${helper.getIconForDataType(alert.dataType)}`}></i>
                  </h4>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <hr />
                </Col>
              </Row>
              {alert && alert.rules && alert.rules.length > 0 ? (
                <>
                  <Row>
                    <Col md={12}>
                      <h4>Rules:</h4>
                    </Col>
                  </Row>
                  <Row>
                    {alert.rules.map((item, index) => (
                      <Col md={12} className="mt-1" key={item._id}>
                        <Row>
                          <Col md={4}>
                            <CustomCheckBox
                              name={item.operator}
                              checked={item.selected}
                              onChange={this.handleCheckboxChanged}
                              label={item.operator}
                            />
                          </Col>
                          <Col md={8}>
                            <FormGroup row>
                              <Label for={`${item.operator}_value`} sm={6}>
                                {this.getLabel(item.operator)}
                              </Label>
                              <Col sm={6}>
                                <Input
                                  type="text"
                                  name={`${item.operator}_value`}
                                  id={`${item.operator}_value`}
                                  placeholder="value"
                                  onChange={this.handleInputChanged}
                                  value={item.operatorValue}
                                  disabled={!item.selected}
                                />
                              </Col>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    ))}
                  </Row>
                </>
              ) : (
                <LoaderRow />
              )}
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
              {alert && alert.channels && alert.channels.length > 0 ? (
                <>
                  <Row>
                    <Col md={12}>
                      <h4>Channels:</h4>
                    </Col>
                  </Row>
                  <Row>
                    {alert.channels.map((item, index) => (
                      <Col md={6} className="mt-1" key={item._id}>
                        <CustomCheckBox
                          name={item.name}
                          checked={item.selected}
                          onChange={this.handleCheckboxChangedChannel}
                          label={item.name}
                        />
                      </Col>
                    ))}
                  </Row>
                </>
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

export default ManageRulesDialog;
