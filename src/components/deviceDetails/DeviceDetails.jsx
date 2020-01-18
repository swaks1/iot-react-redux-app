/* eslint-disable eqeqeq */
import React from "react";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as importedDeviceActions from "../../redux/actions/deviceActions";
import * as importedCommandActions from "../../redux/actions/commandActions";
import * as importedDeviceDataActions from "../../redux/actions/deviceDataActions";

import toastr from "toastr";

import { commandHelper } from "./../../utils/commandHelper";

import DeviceDetailsCard from "./DeviceDetailsCard";

class DeviceDetails extends React.Component {
  constructor(props) {
    super(props);

    let dataType = "";
    if (
      props.device &&
      props.device.dataTypes != null &&
      props.device.dataTypes.length > 0
    ) {
      dataType = props.device.dataTypes[0];
    }

    this.state = {
      device: props.device ? this.deepCopyDevice(props.device) : null, //keep in local state because this will be changed in children components,
      editMode: false,
      dataPeriod: "mostRecent",
      dataType: dataType,
      autoRefreshOn: false,
      autoRefreshInterval: 10 //seconds
    };
  }

  deepCopyDevice = device => {
    let newDevice = Object.assign({}, device);
    newDevice.location = Object.assign({}, device.location);
    return newDevice;
  };

  componentDidMount() {
    const deviceId = this.props.match.params.id; // from the path '/devices/:id'

    let { deviceActions, commandActions, deviceDataActions } = this.props;
    const { dataPeriod, dataType, autoRefreshInterval } = this.state;

    deviceActions.loadDevice(deviceId);
    commandActions.loadDeviceCommands(deviceId);
    if (dataType != "") {
      deviceDataActions.loadDeviceData(deviceId, dataPeriod, 10, dataType);
    }

    // set Interval for refrshing the views every autoRefreshInterval sec
    this.interval = setInterval(this.autoRefresh, autoRefreshInterval * 1000);
  }

  // this has to be refactored... the device sholdn't be kept in state.. use it from props and maybe
  // make new component that will use this device as state for update...
  UNSAFE_componentWillReceiveProps(nextProps) {
    //when the device recieves state from redux update its local state
    if (nextProps.device) {
      this.setState({ device: this.deepCopyDevice(nextProps.device) }, () => {
        //if this.state.dataType is empty set it to firstone of the nextProps.device
        if (
          nextProps.device.dataTypes != null &&
          nextProps.device.dataTypes.length > 0 &&
          this.state.dataType == ""
        )
          this.handleDataTypeChange(nextProps.device.dataTypes[0]);
      });
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
          toastr.warning(
            `Auto Refresh  turned ON, interval is ${this.state.autoRefreshInterval} sec`
          );
        else toastr.warning("Auto Refresh turned OFF");
      }
    );
  };

  handleRefreshIntervalChange = event => {
    let value = event.target.value; //seconds
    if (value < 1) {
      value = 1;
      toastr.warning(
        "Device interval must be greater than 1 sec... Taken default 1 sec"
      );
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
    if (this.state.device == null) {
      console.log("No Device Loaded yet..");
      return;
    }

    let deviceId = this.state.device._id;
    let { deviceActions, commandActions, deviceDataActions } = this.props;
    const { dataPeriod, dataType } = this.state;

    if (this.state.autoRefreshOn === true && this.state.editMode === false) {
      let promises = [];

      let deviceInfoPromise = deviceActions.loadDevice(deviceId);
      promises.push(deviceInfoPromise);

      let commandsHisotryPromise = commandActions.loadDeviceCommands(deviceId);
      promises.push(commandsHisotryPromise);

      if (dataType != "") {
        let deviceDataPromise = deviceDataActions.loadDeviceData(
          deviceId,
          dataPeriod,
          10,
          dataType
        );
        promises.push(deviceDataPromise);
      }

      Promise.all(promises)
        .then(values => {
          toastr.success("Reloaded full UI!");
        })
        .catch(error => {
          toastr.error("Reload UI: " + error);
        });
    } else {
      console.log(
        "Auto Refresh wont happen because EditMode is on or autoRefresh is false"
      );
    }
  };

  updateDeviceFields = event => {
    const field = event.target.name;
    let currentDevice = this.deepCopyDevice(this.state.device);
    switch (field) {
      case "location.lat":
        currentDevice.location.lat = event.target.value;
        break;
      case "location.lng":
        currentDevice.location.lng = event.target.value;
        break;
      case "location.description":
        currentDevice.location.description = event.target.value;
        break;
      default:
        currentDevice[field] = event.target.value;
    }

    return this.setState({ device: currentDevice });
  };

  setEditMode = value => {    
    this.setState({
      editMode: value
    });
  };

  saveDeviceInfo = event => {
    event.preventDefault();
    this.props.deviceActions
      .saveDeviceInfo(this.state.device)
      .then(() => {
        toastr.success("Saved device info !");
      })
      .catch(error => {
        toastr.error(error);
      })
      .finally(() => {
        this.setState({
          editMode: false
        });
      });
  };

  handleReloadDataTypeClick = event => {
    let deviceId = this.state.device._id;

    let { deviceActions } = this.props;

    deviceActions
      .reloadDeviceDataType(deviceId)
      .then(() => {
        toastr.success("Reloaded Device data types!");
      })
      .catch(error => {
        toastr.error(error);
      });
  };

  handleDeviceIntervalBlur = event => {
    let value = event.target.value;
    let currentDevice = this.deepCopyDevice(this.state.device);
    if (value < 1000) {
      toastr.warning("Device Interval must be greater than 1000ms");
      currentDevice.sendDataDelay = 1000;
    }
    this.setState({
      device: currentDevice
    });
  };

  handleCommandClick = event => {
    let btnId = event.target.id;
    let deviceId = this.state.device._id;
    let deviceInterval = this.state.device.sendDataDelay;

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
            toastr.success(
              `Inserted CHANGE INTERVAL (${deviceInterval}) Command !`
            );
          })
          .catch(error => {
            toastr.error(error);
          });
        break;
        case "ledOn_Lora":
        commandActions
          .sendGenericCommand(
            deviceId,
            commandHelper.getLoraWANCommand("LED_ON", 1)
          )
          .then(() => {
            toastr.success(`Inserted Led ON command !`);
          })
          .catch(error => {
            toastr.error(error);
          });
        break;
      case "ledOff_Lora":
        commandActions
          .sendGenericCommand(
            deviceId,
            commandHelper.getLoraWANCommand("LED_OFF", 0)
          )
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

  handleRefreshClick = event => {
    let btnId = event.target.id;
    let deviceId = this.state.device._id;

    let { deviceActions, commandActions, deviceDataActions } = this.props;
    const { dataPeriod, dataType } = this.state;

    switch (btnId) {
      case "DeviceInformations":
        deviceActions
          .loadDevice(deviceId)
          .then(() => {
            toastr.success("Reloaded Device Info!");
          })
          .catch(error => {
            toastr.error(error);
          });
        break;

      case "DeviceCommandsHistory":
        commandActions
          .loadDeviceCommands(deviceId)
          .then(() => {
            toastr.success("Reloaded Commands!");
          })
          .catch(error => {
            toastr.error(error);
          });
        break;
      case "DeviceData":
        if (dataType != "") {
          deviceDataActions
            .loadDeviceData(deviceId, dataPeriod, 10, dataType)
            .then(() => {
              toastr.success("Reloaded Device Data!");
            })
            .catch(error => {
              toastr.error(error);
            });
        }
        break;

      default:
        console.log("unknown btn refresh");
        break;
    }
  };

  getDataForLineChart = () => {
    let response = {
      data: [],
      labels: [],
      name: "",
      datesCreated: []
    };

    let { deviceData } = this.props;
    let { dataPeriod } = this.state;

    try {
      if (deviceData instanceof Array && deviceData.length > 0) {
        let datesCreated = [];
        let data = [];
        let labels = [];
        let name = deviceData[0].dataItem.dataType;

        data = deviceData.map((item, index) => {
          return parseFloat(item.dataItem.dataValue);
        });
        datesCreated = deviceData.map((item, index) => {
          return item.created;
        });
        labels = deviceData.map((item, index) => {
          return item.created;
        });

        if (dataPeriod === "mostRecent") {
          labels = deviceData.map((item, index) => {
            return item.created.slice(11, 19); //"17:44:54" only hour
          });
        }
        if (dataPeriod === "lastHour") {
          labels = deviceData.map((item, index) => {
            return item.created.slice(11, 17); //"17:44:54" only hour
          });
        }

        response.data = data.reverse();
        response.labels = labels.reverse();
        response.datesCreated = datesCreated.reverse();
        response.name = name;
      }
    } catch (error) {
      console.log("Getting Data for Line chart ...." + error);
    }

    return response;
  };

  getDataForBarChart = () => {
    let response = {
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
      ],
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
        let deviceId = this.state.device._id;
        const { deviceDataActions } = this.props;
        const { dataPeriod, dataType } = this.state;
        if (dataType != "") {
          deviceDataActions.loadDeviceData(deviceId, dataPeriod, 10, dataType);
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
        const deviceId = this.props.match.params.id;
        const { deviceDataActions } = this.props;
        const { dataPeriod, dataType } = this.state;
        if (dataType != "") {
          deviceDataActions.loadDeviceData(deviceId, dataPeriod, 10, dataType);
        }
      }
    );
  };

  render() {
    const {
      device,
      editMode,
      dataPeriod,
      dataType,
      autoRefreshOn,
      autoRefreshInterval
    } = this.state;
    const {
      deviceLoading,
      commandsData,
      commandsLoading,
      deviceData,
      deviceDataLoading
    } = this.props;

    return (
      <DeviceDetailsCard
        toggleAutoRefresh={this.toggleAutoRefresh}
        autoRefreshOn={autoRefreshOn}
        device={device}
        deviceLoading={deviceLoading}
        dataType={dataType}
        onDataTypeChange={this.handleDataTypeChange}
        location={this.props.location}
        onRefreshClick={this.handleRefreshClick}
        onReloadDataTypeClick={this.handleReloadDataTypeClick}
        autoRefreshInterval={autoRefreshInterval}
        onAutoRefreshIntervalChange={this.handleRefreshIntervalChange}
        onDeviceFieldChange={this.updateDeviceFields}
        editMode={editMode}
        onEditInfo={() => this.setEditMode(true)}
        onCancelEditInfo={() => this.setEditMode(false)}
        onSaveInfo={this.saveDeviceInfo}
        onCommandClick={this.handleCommandClick}
        commandsData={commandsData}
        commandsLoading={commandsLoading}
        onDeviceIntervalBlur={this.handleDeviceIntervalBlur}
        deviceData={deviceData}
        deviceDataLoading={deviceDataLoading}
        getDataForLineChart={this.getDataForLineChart}
        onDataLineChartButtonClick={this.handleLineChartButtonClick}
        dataPeriod={dataPeriod}
        getDataForBarChart={this.getDataForBarChart}
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
  const deviceId = ownProps.match.params.id; // from the path '/devices/:id'

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

var DeviceDetailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceDetails);
export default withRouter(DeviceDetailsContainer);
