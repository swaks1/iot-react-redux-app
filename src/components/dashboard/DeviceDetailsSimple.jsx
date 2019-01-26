import React from 'react';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as importedDeviceActions from '../../redux/actions/deviceActions';
import * as importedCommandActions from '../../redux/actions/commandActions';
import * as importedDeviceDataActions from '../../redux/actions/deviceDataActions';

import toastr from 'toastr';

import DeviceDetailsSimpleCard from './DeviceDetailsSimpleCard'

class DeviceDetailsSimple extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPeriod: "mostRecent",
            autoRefreshOn: false
        }
    }

    componentDidMount() {
        const { deviceId } = this.props;

        const { commandActions } = this.props;
        commandActions.loadDeviceCommands(deviceId);

        const { deviceDataActions } = this.props;
        const { dataPeriod } = this.state;
        deviceDataActions.loadDeviceData(deviceId, dataPeriod, 5);

        // set Interval for refrshing the views every 30 sec
        //this.interval = setInterval(this.autoRefresh, 30000);
    }

    componentWillUnmount() {
        // Clear the interval right before component unmount
        //clearInterval(this.interval);
    }

    toggleAutoRefresh = () => {
        this.setState((prevState) => ({
            autoRefreshOn: !prevState.autoRefreshOn
        }), () => {
            if (this.state.autoRefreshOn === true)
                toastr.warning("Auto Refresh  turned ON, interval is 30 sec");
            else
                toastr.warning("Auto Refresh turned OFF");
        });
    }

    autoRefresh = () => {
        if (this.state.device == null) {
            console.log("No Device Loaded yet..");
            return;
        }

        let deviceId = this.state.device._id;
        let { deviceActions, commandActions, deviceDataActions } = this.props;
        const { dataPeriod } = this.state;

        if (this.state.autoRefreshOn === true && this.state.editMode === false) {
            let deviceInfoPromise = deviceActions.loadDevices();
            let commandsHisotryPromise = commandActions.loadDeviceCommands(deviceId);
            let deviceDataPromise = deviceDataActions.loadDeviceData(deviceId, dataPeriod, 5);

            Promise.all([deviceInfoPromise, commandsHisotryPromise, deviceDataPromise])
                .then((values) => {
                    toastr.success("Reloaded full UI!");
                })
                .catch((error) => {
                    toastr.error("Reload UI: " + error);
                })
        }
        else {
            console.log("Auto Refresh wont happen because EditMode is on or autoRefresh is false");
        }
    }


    handleRefreshClick = (event) => {
        let btnId = event.target.id;
        let deviceId = this.state.device._id;

        let { deviceActions, commandActions, deviceDataActions } = this.props;
        const { dataPeriod } = this.state;

        switch (btnId) {
            case "DeviceInformations":
                deviceActions.loadDevices()
                    .then(() => {
                        toastr.success("Reloaded Device Info!");
                    })
                    .catch((error) => {
                        toastr.error(error);
                    })
                break;

            case "DeviceCommandsHistory":
                commandActions.loadDeviceCommands(deviceId)
                    .then(() => {
                        toastr.success("Reloaded Commands!");
                    })
                    .catch((error) => {
                        toastr.error(error);
                    })
                break;
            case "DeviceData":
                deviceDataActions.loadDeviceData(deviceId, dataPeriod, 5)
                    .then(() => {
                        toastr.success("Reloaded Device Data!");
                    })
                    .catch((error) => {
                        toastr.error(error);
                    })
                break;

            default:
                console.log("unknown btn refresh");
                break;
        }
    }

    handleCommandClick = (event) => {
        let btnId = event.target.id;
        let { deviceId } = this.props
        let deviceInterval = this.props.device.sendDataDelay;

        let { commandActions } = this.props;

        switch (btnId) {
            case "deactivateBtn":
                commandActions.deactivateDeviceCommand(deviceId)
                    .then(() => {
                        toastr.success("Inserted DEACTIVATE Device Command !");
                    })
                    .catch((error) => {
                        toastr.error(error);
                    })
                break;
            case "activateBtn":
                commandActions.activateDeviceCommand(deviceId)
                    .then(() => {
                        toastr.success("Inserted ACTIVATE Device Command !");
                    })
                    .catch((error) => {
                        toastr.error(error);
                    })
                break;
            case "updateLocationBtn":
                commandActions.updateLocationCommand(deviceId)
                    .then(() => {
                        toastr.success("Inserted UPDATE LOCATION Command !");
                    })
                    .catch((error) => {
                        toastr.error(error);
                    })
                break;
            case "changeIntervalBtn":
                commandActions.changeIntervalCommand(deviceId, deviceInterval)
                    .then(() => {
                        toastr.success(`Inserted CHANGE INTERVAL (${deviceInterval}) Command !`);
                    })
                    .catch((error) => {
                        toastr.error(error);
                    })
                break;
            default:
                console.log("unknown btn command");
        }
    }

    getDataForLineChart = () => {
        let response = {
            data: [],
            labels: [],
            name: "",
            datesCreated: []
        }

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
                        return item.created.slice(11, 19);//"17:44:54" only hour
                    });
                }
                if (dataPeriod === "lastHour") {
                    labels = deviceData.map((item, index) => {
                        return item.created.slice(11, 17);//"17:44:54" only hour
                    });
                }

                response.data = data.reverse();
                response.labels = labels.reverse();
                response.datesCreated = datesCreated.reverse();
                response.name = name;
            }
        }
        catch (error) {
            console.log("Getting Data for Line chart ...." + error);
        }

        return response;
    }

    getDataForBarChart = () => {
        let response = {
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
            name: ""
        }
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
    }

    handleLineChartButtonClick = (buttonText) => {
        this.setState({
            dataPeriod: buttonText
        }, () => {
            const { deviceId } = this.props;
            const { deviceDataActions } = this.props;
            const { dataPeriod } = this.state;
            deviceDataActions.loadDeviceData(deviceId, dataPeriod, 5);
        });
    }

    render() {
        const { dataPeriod, autoRefreshOn } = this.state;
        const { device, deviceLoading, commandsData, commandsLoading, deviceData, deviceDataLoading } = this.props;

        return (
            <DeviceDetailsSimpleCard
                toggleAutoRefresh={this.toggleAutoRefresh}
                autoRefreshOn={autoRefreshOn}
                onRefreshClick={this.handleRefreshClick}
                device={device}
                deviceLoading={deviceLoading}
                commandsData={commandsData}
                commandsLoading={commandsLoading}
                onCommandClick={this.handleCommandClick}
                deviceData={deviceData}
                deviceDataLoading={deviceDataLoading}
                getDataForLineChart={this.getDataForLineChart}
                onDataLineChartButtonClick={this.handleLineChartButtonClick}
                getDataForBarChart={this.getDataForBarChart}
                dataPeriod={dataPeriod}
            />
        );
    }
}

const getDeviceById = (devices, id) => {
    const filtered = devices.filter(d => d._id === id);
    if (filtered.length > 0)
        return filtered[0];
    return null;
};

const getCommandObj = (commands, deviceId) => {
    const filtered = commands.filter(c => c.deviceId == deviceId);
    if (filtered.length > 0)
        return filtered[0];
    return null;
};

const getDeviceDataObj = (deviceData, deviceId) => {
    const filtered = deviceData.filter(d => d.deviceId == deviceId);
    if (filtered.length > 0)
        return filtered[0];
    return null;
};

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
    const { deviceId } = ownProps;

    let device = getDeviceById(state.devices.data, deviceId);
    let deviceLoading = state.devices.loading;

    let commandsData = [];
    let commandsLoading = true;
    let commandsObj = getCommandObj(state.commands, deviceId);

    if (commandsObj != null) {
        commandsData = commandsObj.data;
        commandsLoading = commandsObj.loading;
    }


    let deviceData = [];
    let deviceDataMonthly = [];
    let deviceDataLoading = true;
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

const mapDispatchToProps = (dispatch) => {
    return {
        deviceActions: bindActionCreators(importedDeviceActions, dispatch),
        commandActions: bindActionCreators(importedCommandActions, dispatch),
        deviceDataActions: bindActionCreators(importedDeviceDataActions, dispatch)
    };
};

var DeviceDetailsSimpleContainer = connect(mapStateToProps, mapDispatchToProps)(DeviceDetailsSimple);
export default withRouter(DeviceDetailsSimpleContainer);