import React from 'react';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as importedDeviceActions from '../../../redux/actions/deviceActions';
import * as importedCommandActions from '../../../redux/actions/commandActions';
import * as importedDeviceDataActions from '../../../redux/actions/deviceDataActions';

import toastr from 'toastr';

import DeviceDetailsCard from './DeviceDetailsCard'

class DeviceDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device: props.device ? this.deepCopyDevice(props.device) : null, //keep in local state because this will be changed in children components,
            editMode: false,
            dataPeriod: "mostRecent",
            autoRefreshOn: false
        }
    }

    deepCopyDevice = (device) => {
        let newDevice = Object.assign({}, device)
        newDevice.location = Object.assign({}, device.location);
        return newDevice;
    }

    componentDidMount() {
        const deviceId = this.props.match.params.id; // from the path '/devices/:id'

        const { commandActions } = this.props;
        commandActions.loadDeviceCommands(deviceId);

        const { deviceDataActions } = this.props;
        const { dataPeriod } = this.state;
        deviceDataActions.loadDeviceData(deviceId, dataPeriod);

        // set Interval for refrshing the views every 30 sec
        this.interval = setInterval(this.autoRefresh, 30000);
    }


    componentWillReceiveProps(nextProps) {
        //when the device recieves state from redux update its local state
        if (nextProps.device) {
            this.setState({ device: this.deepCopyDevice(nextProps.device) });
        }
    }

    componentWillUnmount() {
        // Clear the interval right before component unmount
        clearInterval(this.interval);
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
            let deviceDataPromise = deviceDataActions.loadDeviceData(deviceId, dataPeriod);

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

    updateDeviceFields = (event) => {
        const field = event.target.name;
        let currentDevice = this.deepCopyDevice(this.state.device)
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
    }

    setEditMode = (event) => {
        event.preventDefault();
        this.setState({
            editMode: true
        })
    }

    saveDeviceInfo = (event) => {
        event.preventDefault();
        this.props.deviceActions.saveDeviceInfo(this.state.device)
            .then(() => {
                toastr.success("Saved device info !");
            })
            .catch((error) => {
                toastr.error(error);
            })
            .finally(() => {
                this.setState({
                    editMode: false
                })
            })
    }

    handleCommandClick = (event) => {
        let btnId = event.target.id;
        let deviceId = this.state.device._id;
        let deviceInterval = this.state.device.sendDataDelay;

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
                deviceDataActions.loadDeviceData(deviceId, dataPeriod)
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
            const deviceId = this.props.match.params.id
            const { deviceDataActions } = this.props;
            const { dataPeriod } = this.state;
            deviceDataActions.loadDeviceData(deviceId, dataPeriod);
        });
    }

    render() {
        const { device, editMode, dataPeriod, autoRefreshOn } = this.state;
        const { deviceLoading, commandsData, commandsLoading, deviceData, deviceDataLoading } = this.props;

        return (
            <DeviceDetailsCard
                toggleAutoRefresh={this.toggleAutoRefresh}
                autoRefreshOn={autoRefreshOn}
                device={device}
                deviceLoading={deviceLoading}
                location={this.props.location}
                onRefreshClick={this.handleRefreshClick}
                onDeviceFieldChange={this.updateDeviceFields}
                editMode={editMode}
                onEditInfo={this.setEditMode}
                onSaveInfo={this.saveDeviceInfo}
                onCommandClick={this.handleCommandClick}
                commandsData={commandsData}
                commandsLoading={commandsLoading}
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
    const filtered = devices.filter(d => d._id === id);
    if (filtered.length > 0)
        return filtered[0];
    return null;
};

//can be called many times by the framework
const mapStateToProps = (state, ownProps) => {
    const deviceId = ownProps.match.params.id; // from the path '/devices/:id'

    let device = getDeviceById(state.devices.data, deviceId);
    let deviceLoading = state.devices.loading;

    let commandsData = state.commands.data;
    let commandsLoading = state.commands.loading;

    if (state.commands != null
        && state.commands.data != null
        && state.commands.data.length > 0
        && state.commands.data[0].device !== deviceId) {
        commandsData = [];
        commandsLoading = true;
    }

    let deviceData = state.deviceData.data;
    let deviceDataMonthly = state.deviceData.dataMonthly;
    let deviceDataLoading = state.deviceData.loading;

    if (state.deviceData != null
        && state.deviceData.data != null
        && state.deviceData.data.length > 0
        && state.deviceData.data[0].device !== deviceId) {
        deviceData = [];
        deviceDataMonthly = [];
        deviceDataLoading = true;
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

var DeviceDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(DeviceDetails);
export default withRouter(DeviceDetailsContainer);