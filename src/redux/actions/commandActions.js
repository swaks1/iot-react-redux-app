import * as types from './actionTypes'
import iotApi from '../../api/iotApi';
import { beginAjaxCall, ajaxCallError, endAjaxCall } from './ajaxStatusActions'


export function beginLoadDeviceCommands() {
    return { type: types.BEGIN_LOAD_DEVICE_COMMANDS }
}

export function endLoadDeviceCommands() {
    return { type: types.END_LOAD_DEVICE_COMMANDS }
}

export function loadDeviceCommandsSuccess(data) {
    return { type: types.LOAD_DEVICE_COMMANDS_SUCCESS, data };
}

export function activateDeviceCommandSuccess(data) {
    return { type: types.ACTIVATE_DEVICE_COMMAND_SUCCESS, data };
}

export function deactivateDeviceCommandSuccess(data) {
    return { type: types.DEACTIVATE_DEVICE_COMMAND_SUCCESS, data };
}

export function updateLocationCommandSuccess(data) {
    return { type: types.UPDATE_LOCATION_COMMAND_SUCCESS, data };
}

export function changeIntervalCommandSuccess(data) {
    return { type: types.CHANGE_INTERVAL_COMMAND_SUCCESS, data };
}


//THUNKS thunk async functions that return action

export function loadDeviceCommands(id) {
    return function (dispatch) {

        dispatch(beginAjaxCall());
        dispatch(beginLoadDeviceCommands());

        return iotApi.loadCommands(id)
            .then(response => {
                dispatch(loadDeviceCommandsSuccess(response.data));
            })
            .catch((error) => {
                dispatch(ajaxCallError());
                throw (error);
            })
            .finally(() => {
                dispatch(endLoadDeviceCommands());
            })
    };
}

export function activateDeviceCommand(id) {
    return function (dispatch) {

        dispatch(beginAjaxCall());
        dispatch(beginLoadDeviceCommands());

        return iotApi.activateDeviceCommand(id)
            .then(response => {
                iotApi.loadCommands(id)
                    .then(response => {
                        dispatch(activateDeviceCommandSuccess(response.data));
                        dispatch(endLoadDeviceCommands());
                    })
                    .catch((error) => {
                        throw (error);
                    })
            })
            .catch(error => {
                dispatch(ajaxCallError());
                dispatch(endLoadDeviceCommands());
                throw (error);
            })
    };
}

export function deactivateDeviceCommand(id) {
    return function (dispatch) {

        dispatch(beginAjaxCall());
        dispatch(beginLoadDeviceCommands());

        return iotApi.deactivateDeviceCommand(id)
            .then(response => {
                iotApi.loadCommands(id)
                    .then(response => {
                        dispatch(deactivateDeviceCommandSuccess(response.data));
                        dispatch(endLoadDeviceCommands());
                    })
                    .catch((error) => {
                        throw (error);
                    })
            })
            .catch(error => {
                dispatch(ajaxCallError());
                dispatch(endLoadDeviceCommands());
                throw (error);
            })
    };
}

export function updateLocationCommand(id) {
    return function (dispatch) {

        dispatch(beginAjaxCall());
        dispatch(beginLoadDeviceCommands());

        return iotApi.updateLocationCommand(id)
            .then(response => {
                iotApi.loadCommands(id)
                    .then(response => {
                        dispatch(updateLocationCommandSuccess(response.data));
                        dispatch(endLoadDeviceCommands());
                    })
                    .catch((error) => {
                        throw (error);
                    })
            })
            .catch(error => {
                dispatch(ajaxCallError());
                throw (error);
            })
    };
}

export function changeIntervalCommand(id, interval) {
    return function (dispatch) {

        dispatch(beginAjaxCall());
        dispatch(beginLoadDeviceCommands());

        return iotApi.changeIntervalCommand(id, interval)
            .then(response => {
                iotApi.loadCommands(id)
                    .then(response => {
                        dispatch(changeIntervalCommandSuccess(response.data));
                        dispatch(endLoadDeviceCommands());
                    })
                    .catch((error) => {
                        throw (error);
                    })
            })
            .catch(error => {
                dispatch(ajaxCallError());
                dispatch(endLoadDeviceCommands());
                throw (error);
            })
    };
}