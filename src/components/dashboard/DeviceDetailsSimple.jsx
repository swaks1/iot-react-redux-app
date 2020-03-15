import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedDeviceActions from "../../redux/actions/deviceActions";
import * as importedCommandActions from "../../redux/actions/commandActions";
import * as importedDeviceDataActions from "../../redux/actions/deviceDataActions";

import toastr from "toastr";
import { commandHelper } from "./../../utils/commandHelper";
import DeviceDetailsSimpleCard from "./DeviceDetailsSimpleCard";

class DeviceDetailsSimple extends React.Component {
  constructor(props) {
    super(props);

    let dataType = "";
    if (props.device && props.device.dataTypes != null && props.device.dataTypes.length > 0) {
      dataType = props.device.dataTypes[0];
    }

    let deviceInterval = 10000;
    if (props.device && props.device.sendDataDelay != null) {
      deviceInterval = props.device.sendDataDelay;
    }

    this.state = {
      dataPeriod: "mostRecent",
      dataType: dataType,
      deviceInterval: deviceInterval,
      autoRefreshOn: false,
      autoRefreshInterval: 10, //seconds
      collapseElementOpened: false
    };
  }

  componentDidMount() {
    let { deviceId, deviceActions, commandActions, deviceDataActions } = this.props;
    const { dataPeriod, dataType, autoRefreshInterval } = this.state;

    deviceActions.loadDevice(deviceId);
    commandActions.loadDeviceCommands(deviceId);
    if (dataType != "") {
      deviceDataActions.loadDeviceData(deviceId, dataPeriod, dataType);
    }

    // set Interval for refrshing the views every autoRefreshInterval sec
    this.interval = setInterval(this.autoRefresh, autoRefreshInterval * 1000);
  }

  componentDidUpdate(prevProps) {
    //if this.state.dataType is empty set it to firstOne of the current props->device
    if (this.state.dataType == "") {
      if (this.props.device && this.props.device.dataTypes != null && this.props.device.dataTypes.length > 0) {
        this.handleDataTypeChange(this.props.device.dataTypes[0]);
      }
    }
  }

  componentWillUnmount() {
    // Clear the interval right before component unmount
    clearInterval(this.interval);
  }

  toggleAutoRefresh = () => {
    this.setState(
      prevState => ({
        autoRefreshOn: !prevState.autoRefreshOn
      }),
      () => {
        if (this.state.autoRefreshOn === true)
          toastr.warning(`Auto Refresh  turned ON, interval is ${this.state.autoRefreshInterval} sec`);
        else toastr.warning("Auto Refresh turned OFF");
      }
    );
  };

  handleRefreshIntervalChange = event => {
    let value = event.target.value; //seconds
    if (value < 1) {
      value = 1;
      toastr.warning("Device interval must be greater than 1 sec... Taken default 1 sec");
    }

    this.setState(
      {
        autoRefreshInterval: value
      },
      () => {
        clearInterval(this.interval);
        this.interval = setInterval(this.autoRefresh, value * 1000);
      }
    );
  };

  autoRefresh = () => {
    let { device } = this.props;
    if (device == null) {
      console.log("No Device Loaded yet..");
      return;
    }

    let deviceId = device._id;
    let { deviceActions, commandActions, deviceDataActions } = this.props;
    const { dataPeriod, dataType } = this.state;

    if (this.state.autoRefreshOn === true) {
      let promises = [];

      let deviceInfoPromise = deviceActions.loadDevice(deviceId);
      promises.push(deviceInfoPromise);

      let commandsHisotryPromise = commandActions.loadDeviceCommands(deviceId);
      promises.push(commandsHisotryPromise);

      if (dataType != "") {
        let deviceDataPromise = deviceDataActions.loadDeviceData(deviceId, dataPeriod, dataType);
        promises.push(deviceDataPromise);
      }

      Promise.all(promises)
        .then(values => {
          //toastr.success("Reloaded full UI!");
        })
        .catch(error => {
          toastr.error("Reload UI: " + error);
        });
    } else {
      console.log("Auto Refresh wont happen because EditMode is on or autoRefresh is false");
    }
  };

  handleDeviceIntervalChange = event => {
    let value = event.target.value;
    this.setState({
      deviceInterval: value
    });
  };

  handleDeviceIntervalBlur = event => {
    let value = event.target.value;
    if (value < 1000) {
      toastr.warning("Device Interval must be greater than 1000ms");
      value = 1000;
    }
    this.setState({
      deviceInterval: value
    });
  };

  handleCommandClick = event => {
    let btnId = event.target.id;
    let { deviceId } = this.props;
    let deviceInterval = this.state.deviceInterval;

    let { commandActions } = this.props;

    switch (btnId) {
      case "deactivateBtn":
        commandActions
          .deactivateDeviceCommand(deviceId)
          .then(() => {
            toastr.success("Inserted DEACTIVATE Device Command !");
          })
          .catch(error => {
            toastr.error(error);
          });
        break;
      case "activateBtn":
        commandActions
          .activateDeviceCommand(deviceId)
          .then(() => {
            toastr.success("Inserted ACTIVATE Device Command !");
          })
          .catch(error => {
            toastr.error(error);
          });
        break;
      case "updateLocationBtn":
        commandActions
          .updateLocationCommand(deviceId)
          .then(() => {
            toastr.success("Inserted UPDATE LOCATION Command !");
          })
          .catch(error => {
            toastr.error(error);
          });
        break;
      case "changeIntervalBtn":
        commandActions
          .changeIntervalCommand(deviceId, deviceInterval)
          .then(() => {
            toastr.success(`Inserted CHANGE INTERVAL (${deviceInterval}) Command !`);
          })
          .catch(error => {
            toastr.error(error);
          });
        break;
      case "ledOn_Lora":
        commandActions
          .sendGenericCommand(deviceId, commandHelper.getLoraWANCommand("LED_ON", 1))
          .then(() => {
            toastr.success(`Inserted Led ON command !`);
          })
          .catch(error => {
            toastr.error(error);
          });
        break;
      case "ledOff_Lora":
        commandActions
          .sendGenericCommand(deviceId, commandHelper.getLoraWANCommand("LED_OFF", 0))
          .then(() => {
            toastr.success(`Inserted Led OFF command !`);
          })
          .catch(error => {
            toastr.error(error);
          });
        break;

      default:
        console.log("unknown btn command");
    }
  };

  getDataForBarChart = () => {
    let response = {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
      name: ""
    };
    let { deviceDataMonthly } = this.props;

    try {
      if (deviceDataMonthly instanceof Array && deviceDataMonthly.length > 0) {
        response.name = deviceDataMonthly[0].dataItem.dataType;

        deviceDataMonthly.forEach((item, index) => {
          response.data[index] = parseFloat(item.dataItem.dataValue);
        });
      }
    } catch (error) {
      console.log("Getting Data for BAR chart ...." + error);
    }

    return response;
  };

  handleDataTypeChange = buttonText => {
    this.setState(
      {
        dataType: buttonText
      },
      () => {
        const { deviceId } = this.props;
        const { deviceDataActions } = this.props;
        const { dataPeriod, dataType } = this.state;
        if (dataType != "") {
          deviceDataActions.loadDeviceData(deviceId, dataPeriod, dataType);
        }
      }
    );
  };

  handleLineChartButtonClick = buttonText => {
    this.setState(
      {
        dataPeriod: buttonText
      },
      () => {
        const { deviceId } = this.props;
        const { deviceDataActions } = this.props;
        const { dataPeriod, dataType } = this.state;
        if (dataType != "") {
          deviceDataActions.loadDeviceData(deviceId, dataPeriod, dataType);
        }
      }
    );
  };

  handleCollapseClick = () => {
    this.setState(prevState => ({
      collapseElementOpened: !prevState.collapseElementOpened
    }));
  };

  render() {
    const {
      dataPeriod,
      dataType,
      deviceInterval,
      autoRefreshOn,
      autoRefreshInterval,
      collapseElementOpened
    } = this.state;
    const { device, deviceLoading, commandsData, commandsLoading, deviceData, deviceDataLoading } = this.props;
    const deviceWrapper = {
      isActive: device.isActive,
      interval: deviceInterval
    };
    return (
      <DeviceDetailsSimpleCard
        onCollapseClick={this.handleCollapseClick}
        collapseElementOpened={collapseElementOpened}
        toggleAutoRefresh={this.toggleAutoRefresh}
        autoRefreshInterval={autoRefreshInterval}
        onAutoRefreshIntervalChange={this.handleRefreshIntervalChange}
        autoRefreshOn={autoRefreshOn}
        device={device}
        deviceLoading={deviceLoading}
        dataType={dataType}
        onDataTypeChange={this.handleDataTypeChange}
        commandsData={commandsData}
        commandsLoading={commandsLoading}
        onCommandClick={this.handleCommandClick}
        deviceWrapper={deviceWrapper}
        onDeviceIntervalChange={this.handleDeviceIntervalChange}
        onDeviceIntervalBlur={this.handleDeviceIntervalBlur}
        deviceData={deviceData}
        deviceDataLoading={deviceDataLoading}
        onDataLineChartButtonClick={this.handleLineChartButtonClick}
        getDataForBarChart={this.getDataForBarChart}
        dataPeriod={dataPeriod}
      />
    );
  }
}

const getDeviceById = (devices, id) => {
  const filtered = devices.filter(d => d.deviceId === id);
  if (filtered.length > 0) return filtered[0];
  return null;
};

const getCommandObj = (commands, deviceId) => {
  const filtered = commands.filter(c => c.deviceId == deviceId);
  if (filtered.length > 0) return filtered[0];
  return null;
};

const getDeviceDataObj = (deviceData, deviceId) => {
  const filtered = deviceData.filter(d => d.deviceId == deviceId);
  if (filtered.length > 0) return filtered[0];
  return null;
};

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
  const { deviceId } = ownProps;

  let device = null;
  let deviceLoading = true;
  let deviceObj = getDeviceById(state.devices, deviceId);
  if (deviceObj != null) {
    device = deviceObj.data;
    deviceLoading = deviceObj.loading;
  }

  let commandsData = [];
  let commandsLoading = true;
  let commandsObj = getCommandObj(state.commands, deviceId);

  if (commandsObj != null) {
    commandsData = commandsObj.data;
    commandsLoading = commandsObj.loading;
  }

  let deviceData = [];
  let deviceDataMonthly = [];
  let deviceDataLoading = false;
  let deviceDataObj = getDeviceDataObj(state.deviceData, deviceId);

  if (deviceDataObj != null) {
    deviceData = deviceDataObj.data;
    deviceDataMonthly = deviceDataObj.dataMonthly;
    deviceDataLoading = deviceDataObj.loading;
  }

  return {
    device,
    deviceLoading,
    commandsData,
    commandsLoading,
    deviceData,
    deviceDataMonthly,
    deviceDataLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deviceActions: bindActionCreators(importedDeviceActions, dispatch),
    commandActions: bindActionCreators(importedCommandActions, dispatch),
    deviceDataActions: bindActionCreators(importedDeviceDataActions, dispatch)
  };
};

var DeviceDetailsSimpleContainer = connect(mapStateToProps, mapDispatchToProps)(DeviceDetailsSimple);
export default withRouter(DeviceDetailsSimpleContainer);
