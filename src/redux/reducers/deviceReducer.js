import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function deviceReducer(state = initialState.devices, action) {

    if (action.type == types.BEGIN_LOAD_DEVICES) {
        return [];
    }

    if (action.type == types.LOAD_DEVICES_SUCCESS) {

        let devices =
            action.data.map((item, index) => {
                let device = {
                    loading: false,
                    deviceId: item._id,
                    data: item
                }
                return device;
            });

        return devices;
    }

    if (action.type == types.END_LOAD_DEVICES) {
        return state;
    }

    if (action.type == types.BEGIN_LOAD_DEVICE) {
        const thisDevice = state.filter(item => item.deviceId == action.data.deviceId)[0];

        let device = {};
        if (thisDevice != null) {
            device = Object.assign({}, thisDevice);
            device.loading = true;
        }
        else {
            device = {
                loading: true,
                deviceId: action.data.deviceId,
                data: {}
            }
        }

        //preserves order in array 
        const devices = state.map(item => {
            if (item.deviceId == action.data.deviceId) {
                return device
            }
            return item;
        });

        return [...devices];
    }

    if (action.type == types.LOAD_DEVICE_SUCCESS) {
        let device = {
            loading: false,
            deviceId: action.data.deviceId,
            data: action.data.data
        }

        //preserves order in array 
        const devices = state.map(item => {
            if (item.deviceId == action.data.deviceId) {
                return device
            }
            return item;
        });

        return [...devices];
    }

    if (action.type == types.END_LOAD_DEVICE) {
        const thisDevice = state.filter(item => item.deviceId == action.data.deviceId)[0];

        let device = {};
        device = Object.assign({}, thisDevice);
        device.loading = false;

        //preserves order in array 
        const devices = state.map(item => {
            if (item.deviceId == action.data.deviceId) {
                return device
            }
            return item;
        });

        return [...devices];
    }

    if (action.type == types.SAVE_DEVICE_SUCCESS) {
        let device = {
            loading: false,
            deviceId: action.data.deviceId,
            data: action.data.data
        }
        //preserves order in array 
        const devices = state.map(item => {
            if (item.deviceId == action.data.deviceId) {
                return device
            }
            return item;
        });

        return [...devices];
    }

    return state;
}
