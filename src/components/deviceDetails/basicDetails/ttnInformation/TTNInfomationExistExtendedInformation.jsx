import React from "react";
import { Card, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import LoaderRow from "../../../_common/LoaderRow";
import SpanButton from "../../../_common/SpanButton";
import toastr from "toastr";
import ReactTooltip from "react-tooltip";

const TTNInfomationExistExtendedInformation = ({ extendedTTNInfo }) => {
  return (
    <>
      {extendedTTNInfo != null &&
      extendedTTNInfo.data != null &&
      extendedTTNInfo.data.appEui != null &&
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
              style={{ cursor: "text" }}
              readOnly
              defaultValue={extendedTTNInfo.data.appEui}
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
              style={{ cursor: "text" }}
              readOnly
              defaultValue={extendedTTNInfo.data.appKey}
            />
          </Col>
          <Label for="appSKey" sm={5}>
            Applicaiton Session Key
          </Label>
          <Col sm={7}>
            <div style={{ display: "flex" }}>
              <Input
                type="text"
                name="appSKey"
                id="appSKey"
                style={{ cursor: "text" }}
                readOnly
                defaultValue={formatToHexArray(extendedTTNInfo.data.appSKey)}
              />
              <SpanButton
                text=""
                tooltip="Copy to clipboard"
                faIcon="copy"
                onClick={() => copyToClipborad(formatToHexArray(extendedTTNInfo.data.appSKey))}
              />
            </div>
          </Col>
          <Label for="nwkSKey" sm={5}>
            Network Session Key
          </Label>
          <Col sm={7}>
            <div style={{ display: "flex" }}>
              <Input
                type="text"
                name="nwkSKey"
                id="nwkSKey"
                style={{ cursor: "text" }}
                readOnly
                defaultValue={formatToHexArray(extendedTTNInfo.data.nwkSKey)}
              />
              <SpanButton
                text=""
                tooltip="Copy to clipboard"
                faIcon="copy"
                onClick={() => copyToClipborad(formatToHexArray(extendedTTNInfo.data.nwkSKey))}
              />
            </div>
          </Col>
          <Label for="devAddr" sm={5}>
            Dev Addr
          </Label>
          <Col sm={7}>
            <div style={{ display: "flex" }}>
              <Input
                type="text"
                name="devAddr"
                id="devAddr"
                style={{ cursor: "text" }}
                readOnly
                defaultValue={`0x${extendedTTNInfo.data.devAddr}`}
              />
              <SpanButton
                text=""
                tooltip="Copy to clipboard"
                faIcon="copy"
                onClick={() => copyToClipborad(`0x${extendedTTNInfo.data.devAddr}`)}
              />
            </div>
          </Col>
        </Row>
      ) : (
        <LoaderRow />
      )}
    </>
  );
};

const formatToHexArray = str => {
  let strArray = str.split("");
  let result = [];
  for (let i = 0; i < strArray.length - 1; i += 2) {
    result.push(`0x${strArray[i]}${strArray[i + 1]}`);
  }
  return `{${result.join(", ")}}`;
};

const copyToClipborad = value => {
  navigator.clipboard.writeText(value);
  toastr.success("Copied to cliboard!");
};

export default TTNInfomationExistExtendedInformation;
