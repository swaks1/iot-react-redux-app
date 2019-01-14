import * as types from './actionTypes'
import courseApi from '../../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions'
import toastr from 'toastr';


//ACTIONS

export function loadDevicesSuccess(devices) {
    return { type: types.LOAD_DEVICES_SUCCESS, devices };
}


//THUNKS thunk async functions that return action   
export function loadDevices() {
    return function (dispatch) {// this wrapper function in important
        dispatch(beginAjaxCall());
        return courseApi.getDevices()
            .then(response => {
                dispatch(loadDevicesSuccess(response.data))
            })
            .catch(error => {
                toastr.error(error + "<br/>" + error.stack);
                dispatch(ajaxCallError());
                throw (error);
            });
    };
}