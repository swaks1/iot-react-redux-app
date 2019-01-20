import * as types from './actionTypes'
import iotApi from '../../api/iotApi';
import { beginAjaxCall, ajaxCallError, endAjaxCall } from './ajaxStatusActions'


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

        iotApi.loadCommands(id)
            .then(response => {
                dispatch(loadDeviceCommandsSuccess(response.data));
            })
            .catch((error) => {
                dispatch(ajaxCallError());
                throw (error);
            })
    };
}

export function activateDeviceCommand(id) {
    return function (dispatch) {

        dispatch(beginAjaxCall());

        return iotApi.activateDeviceCommand(id)
            .then(response => {
                iotApi.loadCommands(id)
                    .then(response => {
                        dispatch(activateDeviceCommandSuccess(response.data));
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