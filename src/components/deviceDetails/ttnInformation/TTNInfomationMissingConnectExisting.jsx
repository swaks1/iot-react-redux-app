import React from "react";
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

const TTNInfomationMissingConnectExisting = ({
  existingTTNDevice,
  onTTNButtonClick,
  onExistingTTNDeviceFieldChange
}) => {
  return (
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
            onChange={onExistingTTNDeviceFieldChange}
            value={existingTTNDevice.app_id}
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
            onChange={onExistingTTNDeviceFieldChange}
            value={existingTTNDevice.dev_id}
          />
        </Col>
      </FormGroup>
      <Row>
        <Col sm={{ size: 4, offset: 1 }} className="text-center">
          <Button
            color="success"
            size="lg"
            id="saveExisting"
            onClick={onTTNButtonClick}
          >
            Save
          </Button>
        </Col>
        <Col sm={{ size: 4, offset: 1 }} className="text-center">
          <Button
            color="danger"
            size="lg"
            id="cancelExisting"
            onClick={onTTNButtonClick}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default TTNInfomationMissingConnectExisting;
