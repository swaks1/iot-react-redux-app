import React from "react";

import { Row, Col } from "reactstrap";

import DeviceCommands from "./DeviceCommands";
import DeviceCommandsHistory from "./DeviceCommandsHistory";

class CommandsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      device,
      commandsData,
      commandsLoading,
      onCommandClick,
      onDeviceFieldChange,
      onDeviceIntervalBlur,
      onRefreshClick
    } = this.props;

    return (
      <>
        <Row>
          <DeviceCommands
            lg="6"
            sm="12"
            device={device}
            onCommandClick={onCommandClick}
            onDeviceFieldChange={onDeviceFieldChange}
            onDeviceIntervalBlur={onDeviceIntervalBlur}
          />
          <DeviceCommandsHistory
            lg="6"
            sm="12"
            commandsData={commandsData}
            onRefreshClick={onRefreshClick}
            commandsLoading={commandsLoading}
          />
        </Row>
      </>
    );
  }
}

export default CommandsContainer;
