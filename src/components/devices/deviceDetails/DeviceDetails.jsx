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
            lineChartFilter: "day"
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
        deviceDataActions.loadDeviceData(deviceId);

        // set Interval for refrshing the views every 10 sec
        this.interval = setInterval(this.reloadDeviceDetails, 30000);

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

        let { deviceActions, commandActions } = this.props;

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
            default:
                console.log("unknown btn refresh");
                break;
        }
    }

    reloadDeviceDetails = () => {
        if (this.state.device == null) {
            console.log("No Device Loaded yet..");
            return;
        }


        let deviceId = this.state.device._id;
        let { deviceActions, commandActions } = this.props;

        if (this.state.editMode === false) {
            let deviceInfoPromise = deviceActions.loadDevices();
            let commandsHisotryPromise = commandActions.loadDeviceCommands(deviceId);

            Promise.all([deviceInfoPromise, commandsHisotryPromise])
                .then((values) => {
                    toastr.success("Reloaded full UI!");
                })
                .catch((error) => {
                    toastr.error("Reload UI: " + error);
                })
        }
        else {
            console.log("Wont update Device Details view because it EditMode is TRUE");
        }
    }

    getDataForLineChart = () => {
        let response = {
            data: [],
            labels: [],
            name: ""
        }
        let { deviceData } = this.props;

        try {
            if (deviceData instanceof Array && deviceData.length > 0) {

                const groupedArray = deviceData.reduce((acc, curr) => {//Group By found on net
                    let day = curr.created.slice(0, 10);
                    //let minute = curr.created.slice(14, 16)
                    let groupBy = day;
                    if (!acc[groupBy]) {
                        acc[groupBy] = []; //If this type wasn't previously stored
                    }
                    acc[groupBy].push(curr);
                    return acc;
                }, {});
    
                let data = [];
                let labels = Object.keys(groupedArray);
                labels.forEach(key => {
                    let array = groupedArray[key];
                    let sumOfValues = array.reduce((acc, curr) => {
                        let floatValue = parseFloat(curr.dataItem.dataValue);
                        acc += floatValue;
                        return acc;
                    }, 0)
                    let average = sumOfValues / array.length;
                    data.push(average);
                });
                
                response.data = data;
                response.labels = labels;
                response.name = deviceData[0].dataItem.dataType;
            }
        } catch (error) {
            console.log("Getting Data for Line chart ...." + error);
        }

        return response;
    }

    render() {
        const { device, editMode } = this.state;
        const { deviceLoading, commandsData, commandsLoading, deviceData, deviceDataLoading } = this.props;

        return (
            <DeviceDetailsCard
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
    let deviceDataLoading = state.deviceData.loading;

    if (state.deviceData != null
        && state.deviceData.data != null
        && state.deviceData.data.length > 0
        && state.deviceData.data[0].device !== deviceId) {
        deviceData = [];
        deviceDataLoading = true;
    }

    return {
        device,
        deviceLoading,
        commandsData,
        commandsLoading,
        deviceData,
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