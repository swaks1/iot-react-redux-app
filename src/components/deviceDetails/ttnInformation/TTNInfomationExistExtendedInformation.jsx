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
import LoaderRow from "../../_common/LoaderRow";

const TTNInfomationExistExtendedInformation = ({ extendedTTNInfo }) => {
  return (
    <>
      {extendedTTNInfo != null &&
      extendedTTNInfo.data != null &&
      extendedTTNInfo.loading == false ? (
        <Row>
          <Label for="appKey" sm={5}>
            Applicaiton EUI
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="appKey"
              id="appKey"
              readOnly
              onChange={() => {}}
              value={extendedTTNInfo.appEui}
            />
          </Col>
          <Label for="appKey" sm={5}>
            Applicaiton Key
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="appKey"
              id="appKey"
              readOnly
              onChange={() => {}}
              value={extendedTTNInfo.appKey}
            />
          </Col>
          <Label for="appKey" sm={5}>
            Applicaiton Session Key
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="appKey"
              id="appKey"
              readOnly
              onChange={() => {}}
              value={extendedTTNInfo.appSKey}
            />
          </Col>
          <Label for="appKey" sm={5}>
            Network Session Key
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="appKey"
              id="appKey"
              readOnly
              onChange={() => {}}
              value={extendedTTNInfo.nwkSKey}
            />
          </Col>
          <Label for="appKey" sm={5}>
            Dev Addr
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="appKey"
              id="appKey"
              readOnly
              onChange={() => {}}
              value={extendedTTNInfo.devAddr}
            />
          </Col>
        </Row>
      ) : (
        <LoaderRow />
      )}
    </>
  );
};

export default TTNInfomationExistExtendedInformation;
