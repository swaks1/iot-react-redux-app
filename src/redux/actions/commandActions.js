import * as types from "./actionTypes";
import iotApi from "../../api/iotApi";
import { beginAjaxCall, ajaxCallError, endAjaxCall } from "./ajaxStatusActions";

export function beginDeviceCommands(deviceId) {
  return {
    type: types.BEGIN_DEVICE_COMMANDS,
    data: {
      deviceId: deviceId
    }
  };
}

export function endDeviceCommands(deviceId) {
  return {
    type: types.END_DEVICE_COMMANDS,
    data: {
      deviceId: deviceId
    }
  };
}

export function deviceCommandsSuccess(deviceId, commands) {
  return {
    type: types.DEVICE_COMMANDS_SUCCESS,
    data: {
      deviceId: deviceId,
      data: commands
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

export function loadDeviceCommands(deviceId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginDeviceCommands(deviceId));

    return iotApi
      .loadCommands(deviceId)
      .then(response => {
        dispatch(loadDeviceCommandsSuccess(deviceId, response.data));
      })
      .catch(error => {
        dispatch(ajaxCallError());
        throw error;
      })
      .finally(() => {
        dispatch(endDeviceCommands(deviceId));
      });
  };
}

export function activateDeviceCommand(deviceId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginDeviceCommands(deviceId));

    return iotApi
      .activateDeviceCommand(deviceId)
      .then(response => {
        iotApi
          .loadCommands(deviceId)
          .then(response => {
            dispatch(activateDeviceCommandSuccess(deviceId, response.data));
            dispatch(endDeviceCommands(deviceId));
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        dispatch(endDeviceCommands(deviceId));
        throw error;
      });
  };
}

export function deactivateDeviceCommand(deviceId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginDeviceCommands(deviceId));

    return iotApi
      .deactivateDeviceCommand(deviceId)
      .then(response => {
        iotApi
          .loadCommands(deviceId)
          .then(response => {
            dispatch(deactivateDeviceCommandSuccess(deviceId, response.data));
            dispatch(endDeviceCommands(deviceId));
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        dispatch(endDeviceCommands(deviceId));
        throw error;
      });
  };
}

export function updateLocationCommand(deviceId) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginDeviceCommands(deviceId));

    return iotApi
      .updateLocationCommand(deviceId)
      .then(response => {
        iotApi
          .loadCommands(deviceId)
          .then(response => {
            dispatch(updateLocationCommandSuccess(deviceId, response.data));
            dispatch(endDeviceCommands(deviceId));
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

export function changeIntervalCommand(deviceId, interval) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginDeviceCommands(deviceId));

    return iotApi
      .changeIntervalCommand(deviceId, interval)
      .then(response => {
        iotApi
          .loadCommands(deviceId)
          .then(response => {
            dispatch(changeIntervalCommandSuccess(deviceId, response.data));
            dispatch(endDeviceCommands(deviceId));
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        dispatch(endDeviceCommands(deviceId));
        throw error;
      });
  };
}

export function sendGenericCommand(deviceId, command) {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    dispatch(beginDeviceCommands(deviceId));

    return iotApi
      .sendGenericCommand(deviceId, command)
      .then(response => {
        iotApi
          .loadCommands(deviceId)
          .then(response => {
            dispatch(deviceCommandsSuccess(deviceId, response.data));
            dispatch(endDeviceCommands(deviceId));
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(error => {
        dispatch(ajaxCallError());
        dispatch(endDeviceCommands(deviceId));
        throw error;
      });
  };
}
