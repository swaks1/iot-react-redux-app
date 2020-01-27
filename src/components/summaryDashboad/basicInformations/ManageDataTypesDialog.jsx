import React from "react";

import toastr from "toastr";
import { Row, Col, FormGroup, Label, Input } from "reactstrap";
import Modal from "./../../_common/Modal";
import LoaderRow from "../../_common/LoaderRow";
import CustomCheckBox from "../../_common/CustomCheckBox";

class ManageDataTypesDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      dataTypes: []
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataTypes !== this.props.dataTypes) {
      this.setState({ confirming: false, dataTypes: this.props.dataTypes });
    }
    if (prevProps.isDialogOpened !== this.props.isDialogOpened) {
      this.setState({ confirming: false });
    }
  }

  handleCheckboxChanged = event => {
    const dataTypeName = event.target.name;
    let dataTypes = this.state.dataTypes.map(item => {
      if (item.name == dataTypeName) {
        return { ...item, checked: event.target.checked };
      }
      return item;
    });
    this.setState({ dataTypes });
  };

  handleInputChanged = event => {
    const name = event.target.name;
    let dataTypeName = name.substring(0, name.lastIndexOf("_"));
    let minMax = name.substring(name.lastIndexOf("_") + 1);

    let dataTypes = this.state.dataTypes.map(item => {
      if (item.name == dataTypeName) {
        var newItem = { ...item };
        newItem[minMax] = event.target.value;
        return newItem;
      }
      return item;
    });
    this.setState({ dataTypes });
  };

  localDenyAction = () => {
    this.props.denyAction();
  };

  localConfirmAction = () => {
    let dataTypes = [];
    try {
      let checkedDataTypes = this.state.dataTypes.filter(item => item.checked);
      dataTypes = checkedDataTypes.map(item => {
        let minValue = parseFloat(item.minValue);
        let maxValue = parseFloat(item.maxValue);
        if (isNaN(minValue) || isNaN(maxValue)) {
          toastr.error(
            `${item.name} => enter valid numbers for minValue and maxValue !`
          );
          throw new Error();
        } else {
          return {
            name: item.name,
            minValue: minValue,
            maxValue: maxValue
          };
        }
      });
    } catch (error) {
      return;
    }
    this.setState({ confirming: true });
    this.props.confirmAction(dataTypes);
  };

  render() {
    const { isDialogOpened } = this.props;
    const { dataTypes } = this.state;

    return (
      <>
        <Modal
          className="wide-modal-dialog"
          isOpen={isDialogOpened}
          confirming={this.state.confirming}
          modalTitle={"Manage Data Types for summary..."}
          modalBody={
            <>
              {dataTypes ? (
                <Row>
                  {dataTypes.map((item, index) => (
                    <Col md={12} key={index}>
                      <Row>
                        <Col md={3}>
                          <CustomCheckBox
                            name={item.name}
                            checked={item.checked}
                            onChange={this.handleCheckboxChanged}
                            label={item.name}
                          />
                        </Col>
                        <Col md={3}>
                          <FormGroup row>
                            <Label for={`${item.name}_minValue`} sm={6}>
                              Min Value:
                            </Label>
                            <Col sm={6}>
                              <Input
                                type="text"
                                name={`${item.name}_minValue`}
                                id={`${item.name}_minValue`}
                                placeholder="Min Value"
                                onChange={this.handleInputChanged}
                                value={item.minValue}
                                disabled={!item.checked}
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup row>
                            <Label for={`${item.name}_maxValue`} sm={6}>
                              Max Value:
                            </Label>
                            <Col sm={6}>
                              <Input
                                type="text"
                                name={`${item.name}_maxValue`}
                                id={`${item.name}_maxValue`}
                                placeholder="Max Value"
                                onChange={this.handleInputChanged}
                                value={item.maxValue}
                                disabled={!item.checked}
                              />
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
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

export default ManageDataTypesDialog;
