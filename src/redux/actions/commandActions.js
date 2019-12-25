import * as types from "./actionTypes";
import iotApi from "../../api/iotApi";
import { beginAjaxCall, ajaxCallError, endAjaxCall } from "./ajaxStatusActions";

export function beginLoadDeviceCommands(deviceId) {
  return {
    type: types.BEGIN_LOAD_DEVICE_COMMANDS,
    data: {
      deviceId: deviceId
    }
  };
}

export function endLoadDeviceCommands(deviceId) {
  return {
    type: types.END_LOAD_DEVICE_COMMANDS,
    data: {
      deviceId: deviceId
    }
  };
}

export function loadDeviceCommandsSuccess(deviceId, commands) {
  return {
    type: types.LOAD_DEVICE_COMMANDS_SUCCESS,
    data: {
      deviceId: deviceId,
      data: commands
    }
  };
}

export function activateDeviceCommandSuccess(deviceId, commands) {
  return {
    type: types.ACTIVATE_DEVICE_COMMAND_SUCCESS,
    data: {
      deviceId: deviceId,
      data: commands
    }
  };
}

export function deactivateDeviceCommandSuccess(deviceId, commands) {
  return {
    type: types.DEACTIVATE_DEVICE_COMMAND_SUCCESS,
    data: {
      deviceId: deviceId,
      data: commands
    }
  };
}

export function updateLocationCommandSuccess(deviceId, commands) {
  return {
    type: types.UPDATE_LOCATION_COMMAND_SUCCESS,
    data: {
      deviceId: deviceId,
      data: commands
    }
  };
}

export function changeIntervalCommandSuccess(deviceId, commands) {
  return {
    type: types.CHANGE_INTERVAL_COMMAND_SUCCESS,
    data: {
      deviceId: deviceId,
      data: commands
    }
  };
}

//THUNKS thunk async functions that return action

export function loadDeviceCommands(id) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginLoadDeviceCommands(id));

    return iotApi
      .loadCommands(id)
      .then(response => {
        dispatch(loadDeviceCommandsSuccess(id, response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endLoadDeviceCommands(id));
      });
  };
}

export function activateDeviceCommand(id) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginLoadDeviceCommands(id));

    return iotApi
      .activateDeviceCommand(id)
      .then(response => {
        iotApi
          .loadCommands(id)
          .then(response => {
            dispatch(activateDeviceCommandSuccess(id, response.data));
            dispatch(endLoadDeviceCommands(id));
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        dispatch(endLoadDeviceCommands(id));
        throw error;
      });
  };
}

export function deactivateDeviceCommand(id) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginLoadDeviceCommands(id));

    return iotApi
      .deactivateDeviceCommand(id)
      .then(response => {
        iotApi
          .loadCommands(id)
          .then(response => {
            dispatch(deactivateDeviceCommandSuccess(id, response.data));
            dispatch(endLoadDeviceCommands(id));
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        dispatch(endLoadDeviceCommands(id));
        throw error;
      });
  };
}

export function updateLocationCommand(id) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginLoadDeviceCommands(id));

    return iotApi
      .updateLocationCommand(id)
      .then(response => {
        iotApi
          .loadCommands(id)
          .then(response => {
            dispatch(updateLocationCommandSuccess(id, response.data));
            dispatch(endLoadDeviceCommands(id));
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      });
  };
}

export function changeIntervalCommand(id, interval) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginLoadDeviceCommands(id));

    return iotApi
      .changeIntervalCommand(id, interval)
      .then(response => {
        iotApi
          .loadCommands(id)
          .then(response => {
            dispatch(changeIntervalCommandSuccess(id, response.data));
            dispatch(endLoadDeviceCommands(id));
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        dispatch(endLoadDeviceCommands(id));
        throw error;
      });
  };
}
