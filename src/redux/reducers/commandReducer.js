/* eslint-disable eqeqeq */
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function commandReducer(state = initialState.commands, action) {
  if (action.type == types.BEGIN_LOAD_DEVICE_COMMANDS) {
    const otherCommands = state.filter(
      item => item.deviceId != action.data.deviceId
    );
    const thisCommand = state.filter(
      item => item.deviceId == action.data.deviceId
    )[0];

    let command = {};
    if (thisCommand != null) {
      command = Object.assign({}, thisCommand);
      command.loading = true;
    } else {
      command = {
        loading: true,
        deviceId: action.data.deviceId,
        data: []
      };
    }

    return [...otherCommands, command];
  }

  if (action.type == types.END_LOAD_DEVICE_COMMANDS) {
    const otherCommands = state.filter(
      item => item.deviceId != action.data.deviceId
    );
    const thisCommand = state.filter(
      item => item.deviceId == action.data.deviceId
    )[0];

    let command = {};
    command = Object.assign({}, thisCommand);
    command.loading = false;

    return [...otherCommands, command];
  }

  if (action.type == types.LOAD_DEVICE_COMMANDS_SUCCESS) {
    const otherCommands = state.filter(
      item => item.deviceId != action.data.deviceId
    );
    let command = {
      loading: false,
      deviceId: action.data.deviceId,
      data: action.data.data
    };

    return [...otherCommands, command];
  }

  if (
    action.type == types.ACTIVATE_DEVICE_COMMAND_SUCCESS ||
    action.type == types.DEACTIVATE_DEVICE_COMMAND_SUCCESS ||
    action.type == types.UPDATE_LOCATION_COMMAND_SUCCESS ||
    action.type == types.CHANGE_INTERVAL_COMMAND_SUCCESS
  ) {
    const otherCommands = state.filter(
      item => item.deviceId != action.data.deviceId
    );
    let command = {
      loading: false,
      deviceId: action.data.deviceId,
      data: action.data.data
    };

    return [...otherCommands, command];
  }

  return state;
}
