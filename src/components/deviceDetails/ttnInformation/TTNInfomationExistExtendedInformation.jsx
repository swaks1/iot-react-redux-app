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
          <Label for="appEui" sm={5}>
            Applicaiton EUI
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="appEui"
              id="appEui"
              readOnly
              onChange={() => {}}
              value={extendedTTNInfo.data.appEui}
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
              value={extendedTTNInfo.data.appKey}
            />
          </Col>
          <Label for="appSKey" sm={5}>
            Applicaiton Session Key
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="appSKey"
              id="appSKey"
              readOnly
              onChange={() => {}}
              value={extendedTTNInfo.data.appSKey}
            />
          </Col>
          <Label for="nwkSKey" sm={5}>
            Network Session Key
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="nwkSKey"
              id="nwkSKey"
              readOnly
              onChange={() => {}}
              value={extendedTTNInfo.data.nwkSKey}
            />
          </Col>
          <Label for="devAddr" sm={5}>
            Dev Addr
          </Label>
          <Col sm={7}>
            <Input
              type="text"
              name="devAddr"
              id="devAddr"
              readOnly
              onChange={() => {}}
              value={extendedTTNInfo.data.devAddr}
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
