import React from 'react';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as importedDeviceActions from '../../../redux/actions/deviceActions';
import * as importedCommandActions from '../../../redux/actions/commandActions';

import toastr from 'toastr';

import DeviceDetailsCard from './DeviceDetailsCard'

class DeviceDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            device: props.device ? this.deepCopyDevice(props.device) : null, //keep in local state because this will be changed in children components,
            editMode: false
        }
    }

    deepCopyDevice = (device) => {
        let newDevice = Object.assign({}, device)
        newDevice.location = Object.assign({}, device.location);
        return newDevice;
    }

    componentDidMount() {
        const { commandActions } = this.props;

        const deviceId = this.props.match.params.id; // from the path '/devices/:id'

        commandActions.loadDeviceCommands(deviceId);
    }


    componentWillReceiveProps(nextProps) {
        //when the device recieves state from redux update htis local state
        this.setState({ device: this.deepCopyDevice(nextProps.device) });
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
        let id = event.target.id;
        switch (id) {
            case "deactivateBtn":
                console.log("d");
                break;
            case "activateBtn":
                console.log("a");
                break;
            case "updateLocationBtn":
                console.log("u");
                break;
            case "changeIntervalBtn":
                console.log("c");
                break;
            default:
                console.log("unknown btn");
        }
    }

    render() {
        const { device, editMode } = this.state;
        const { commands } = this.props;
        
        return (
            <DeviceDetailsCard
                device={device}
                location={this.props.location}
                onDeviceFieldChange={this.updateDeviceFields}
                editMode={editMode}
                onEditInfo={this.setEditMode}
                onSaveInfo={this.saveDeviceInfo}
                onCommandClick={this.handleCommandClick}
                commands={commands}
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

    return {
        device,
        commands: state.commands
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deviceActions: bindActionCreators(importedDeviceActions, dispatch),
        commandActions: bindActionCreators(importedCommandActions, dispatch)
    };
};

var DeviceDetailsContainer = connect(mapStateToProps, mapDispatchToProps)(DeviceDetails);
export default withRouter(DeviceDetailsContainer);