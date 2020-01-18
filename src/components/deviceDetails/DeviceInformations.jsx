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
import LoaderOverlay from "../_common/LoaderOverlay";

const DeviceInformations = ({
  lg,
  md,
  sm,
  device,
  deviceLoading,
  onRefreshClick,
  editMode,
  onDeviceFieldChange,
  onEditInfo,
  onCancelEditInfo,
  onSaveInfo
}) => {
  return (
    <>
      <Col lg={lg} md={md} sm={sm}>
        <Card style={{ backgroundColor: "#f7f6f6", padding: "20px 20px" }}>
          <h4 className="text-center font-italic font-weight-light">
            Device Information &nbsp;
            <i
              className="fa fa-sync"
              style={{ color: "green", cursor: "pointer" }}
              id="DeviceInformations"
              onClick={onRefreshClick}
            ></i>
          </h4>
          <LoaderOverlay isLoading={deviceLoading}>
            <Form>
              <FormGroup row>
                <Label for="name" sm={5}>
                  {" "}
                  Name
                </Label>
                <Col sm={7}>
                  {<h4 className={"col-form-label"}>{device.name}</h4>}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="description" sm={5}>
                  {" "}
                  Description
                </Label>
                <Col sm={7}>
                  {editMode === true ? (
                    <Input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="Description"
                      onChange={onDeviceFieldChange}
                      value={device.description}
                    />
                  ) : (
                    <h4 className={"col-form-label"}>{device.description}</h4>
                  )}
                </Col>
              </FormGroup>

              {editMode === false ? (
                <FormGroup row>
                  <Label for="active" sm={5}>
                    {" "}
                    Location{" "}
                  </Label>
                  <Col sm={7}>
                    <h4 className={"col-form-label"}>
                      {`(${device.location.lat} , ${device.location.lng})`}{" "}
                      <br /> {`${device.location.description}`}
                    </h4>
                  </Col>
                </FormGroup>
              ) : (
                <>
                  <FormGroup row>
                    <Label for="lat" sm={3}>
                      Latitude:
                    </Label>
                    <Col sm={3}>
                      {
                        <Input
                          type="text"
                          name="location.lat"
                          id="lat"
                          placeholder="Latitude"
                          onChange={onDeviceFieldChange}
                          value={device.location.lat}
                        />
                      }
                    </Col>
                    <Label for="lng" sm={3}>
                      Longitude:
                    </Label>
                    <Col sm={3}>
                      {
                        <Input
                          type="text"
                          name="location.lng"
                          id="lng"
                          placeholder="Longitude"
                          onChange={onDeviceFieldChange}
                          value={device.location.lng}
                        />
                      }
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="lng" sm={5}>
                      Location Description:
                    </Label>
                    <Col sm={7}>
                      {
                        <Input
                          type="text"
                          name="location.description"
                          id="locationDescription"
                          placeholder="Location Description"
                          onChange={onDeviceFieldChange}
                          value={device.location.description}
                        />
                      }
                    </Col>
                  </FormGroup>
                </>
              )}

              <FormGroup row>
                {editMode === true ? (
                  <>
                    <Col sm={{ size: 3, offset: 1 }} className="text-left">
                      <Button color="success" size="sm" onClick={onSaveInfo}>
                        Save
                      </Button>
                    </Col>
                    <Col sm={{ size: 3, offset: 3 }} className="text-right">
                      <Button
                        color="danger"
                        size="sm"
                        onClick={onCancelEditInfo}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col sm={{ size: 4, offset: 0 }}>
                      <Button
                        color="link"
                        style={{ paddingLeft: "0px" }}
                        onClick={onEditInfo}
                      >
                        Edit Info
                      </Button>
                    </Col>
                  </>
                )}
              </FormGroup>             
            </Form>
          </LoaderOverlay>
        </Card>
      </Col>
    </>
  );
};

export default DeviceInformations;
