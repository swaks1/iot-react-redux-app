import axios from 'axios'

class IotApi {

    // ======= DEVICE ==========

    static getDevices() {
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:8000/api/devices')
                .then(response => {
                    setTimeout(() => {
                        resolve(response);
                    }, 1000);

                })
                .catch(error => {
                    //var dummyResult = getDummyDevices();
                    //reject(dummyResult);   
                    reject(error);
                })
        });
    }

    static toggleDeviceToDashboard(checked, id) {
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:8000/api/devices/${id}`, { isAddedToDashboard: checked })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    static saveDeviceInfo(device) {
        return new Promise((resolve, reject) => {
            axios.put(`http://localhost:8000/api/devices/${device._id}`, device)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    // ======= COMMANDS ==========

    static loadCommands(deviceId) {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8000/api/command?deviceId=${deviceId}`)
                .then(response => {
                    setTimeout(() => {
                        resolve(response);
                    }, 500);

                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    static activateDeviceCommand(id) {
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8000/api/command`, {
                device: id,
                commandItem: {
                    commandValue: true,
                    commandType: "IS_ACTIVE"
                }
            })
                .then(response => {
                    setTimeout(() => {
                        resolve(response);
                    }, 500);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    static deactivateDeviceCommand(id) {
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8000/api/command`, {
                device: id,
                commandItem: {
                    commandValue: false,
                    commandType: "IS_ACTIVE"
                }
            })
                .then(response => {
                    setTimeout(() => {
                        resolve(response);
                    }, 500);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }


    static updateLocationCommand(id) {
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8000/api/command`, {
                device: id,
                commandItem: {
                    commandValue: "Location",
                    commandType: "DEVICE_INFO"
                }
            })
                .then(response => {
                    setTimeout(() => {
                        resolve(response);
                    }, 500);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    static changeIntervalCommand(id, interval) {
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:8000/api/command`, {
                device: id,
                commandItem: {
                    commandValue: interval,
                    commandType: "SEND_DATA_DELAY"
                }
            })
                .then(response => {
                    setTimeout(() => {
                        resolve(response);
                    }, 500);
                })
                .catch(error => {
                    reject(error);
                })
        });
    }

    // ======= DEVICE DATA ==========

    static loadDeviceData(deviceId) {
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:8000/api/data?deviceId=${deviceId}`)
                .then(response => {
                    setTimeout(() => {
                        resolve(response);
                    }, 500);

                })
                .catch(error => {
                    reject(error);
                })
        });
    }





}

export default IotApi;



const getDummyDevices = () => {
    return {
        data: [
            {
                "location": {
                    "lat": "40.1",
                    "lng": "33.2",
                    "description": "2location Descr"
                },
                "_id": "5c1548154b159d33c4d7b59c",
                "name": "secondDevice",
                "description": "2device Descr",
                "__v": 0,
                "isActive": true,
                "isAddedToDashboard": false
            },
            {
                "location": {
                    "lat": "40.1",
                    "lng": "33.2",
                    "description": "111location Descr"
                },
                "_id": "5c155ac37edd5241308289a9",
                "name": "EditedFFFFFDevice",
                "description": "1device Descr",
                "__v": 0,
                "isActive": true,
                "isAddedToDashboard": true
            },
            {
                "location": {
                    "lat": "40.1",
                    "lng": "33.2",
                    "description": "2location Descr"
                },
                "_id": "5c155d5abea777461420387a",
                "name": "thirdDevice",
                "description": "2device Descr",
                "__v": 0,
                "isActive": false,
                "isAddedToDashboard": true
            },
            {
                "location": {
                    "lat": "40.1",
                    "lng": "33.2",
                    "description": "2location Descr"
                },
                "_id": "5c15685c4fdd084574660826",
                "name": "dasdasda",
                "description": "dasdasd Descr",
                "__v": 0,
                "isActive": true,
                "isAddedToDashboard": false
            }
        ]
    };
}







