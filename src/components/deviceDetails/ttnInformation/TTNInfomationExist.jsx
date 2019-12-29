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

const TTNInfomationExist = ({ ttnInfo, onDeleteTTNInfoButtonClick }) => {
  return (
    <>
      <FormGroup row>
        <Label for="app_id" sm={5}>
          {" "}
          App Id
        </Label>
        <Col sm={7}>
          {<h4 className={"col-form-label"}>{ttnInfo.app_id}</h4>}
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="dev_id" sm={5}>
          {" "}
          Dev Id
        </Label>
        <Col sm={7}>
          {<h4 className={"col-form-label"}>{ttnInfo.dev_id}</h4>}
        </Col>
      </FormGroup>
      <Row className="mt-5">
        <Col sm={{ size: 4, offset: 6 }} className="text-center">
          <Button
            color="danger"
            size="sm"
            id="deleteExisting"
            onClick={onDeleteTTNInfoButtonClick}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default TTNInfomationExist;
