import * as types from "../actions/actionTypes.js";
import initialState from "./initialState";

const actionTypeEndsInSuccess = type => {
  return type.substring(type.length - 8) === "_SUCCESS";
};

const ajaxStatusReducer = (
  state = initialState.ajaxCallsInProgress,
  action
) => {
  if (action.type === types.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (
    action.type === types.AJAX_CALL_ERROR ||
    action.type === types.END_AJAX_CALL ||
    actionTypeEndsInSuccess(action.type)
  ) {
    //if type passed to the reducer ends with success reduce ajaxCallsInProgress..
    return state - 1;
  }

  return state;
};

export default ajaxStatusReducer;
