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

const TTNInfomationMissingAvailableActions = ({ onTTNButtonClick }) => {
  return (
    <>
      <Row className="mt-5">
        <Col sm={{ size: 4, offset: 1 }} className="text-center">
          <Button
            color="default"
            size="sm"
            id="connectExisting"
            onClick={onTTNButtonClick}
          >
            Connect Existing
          </Button>
        </Col>

        <Col sm={{ size: 4, offset: 1 }} className="text-center">
          <Button
            color="info"
            size="sm"
            id="connectNew"
            onClick={onTTNButtonClick}
          >
            Connect NEW
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default TTNInfomationMissingAvailableActions;
