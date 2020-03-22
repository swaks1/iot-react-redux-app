import React from "react";

import { Row, Col } from "reactstrap";

import DeviceInformations from "./DeviceInformations";
import DeviceDataTypes from "./DeviceDataTypes";
import DeviceConnections from "./DeviceConnections";
import DeviceLocationMap from "./DeviceLocationMap";

class BasicDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      device,
      deviceLoading,
      onRefreshClick,
      editMode,
      onDeviceFieldChange,
      onEditInfo,
      onCancelEditInfo,
      onSaveInfo,
      onReloadDataTypeClick
    } = this.props;

    return (
      <>
        <Row>
          <Col lg="4" md="12" sm="12">
            <Row>
              <DeviceInformations
                lg="12"
                md="12"
                sm="12"
                device={device}
                deviceLoading={deviceLoading}
                onRefreshClick={onRefreshClick}
                editMode={editMode}
                onDeviceFieldChange={onDeviceFieldChange}
                onEditInfo={onEditInfo}
                onCancelEditInfo={onCancelEditInfo}
                onSaveInfo={onSaveInfo}
              />
            </Row>
            <Row>
              <DeviceDataTypes
                lg="12"
                md="12"
                sm="12"
                device={device}
                deviceLoading={deviceLoading}
                onReloadDataTypeClick={onReloadDataTypeClick}
              />
            </Row>
          </Col>
          <DeviceConnections lg="4" md="12" sm="12" device={device} deviceLoading={deviceLoading} />
          <DeviceLocationMap lg="4" md="12" sm="12" device={device} deviceLoading={deviceLoading} />
        </Row>
      </>
    );
  }
}

export default BasicDetailsContainer;
