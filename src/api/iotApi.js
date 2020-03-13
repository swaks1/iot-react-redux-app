import axios from "axios";
import config from "../config";

class IotApi {
  // ======= DEVICE ==========

  static getDevices() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.apiUrl}/devices`)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          //var dummyResult = getDummyDevices();
          //reject(dummyResult);
          reject(error);
        });
    });
  }

  static getDevice(deviceId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.apiUrl}/devices/${deviceId}`)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static toggleDeviceToDashboard(checked, id) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${config.apiUrl}/devices/${id}`, {
          isAddedToDashboard: checked
        })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static registerDevice(device) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/devices`, device)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static deleteDevice(deviceId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${config.apiUrl}/devices/${deviceId}`)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static saveDeviceInfo(device) {
    return new Promise((resolve, reject) => {
      axios
        .put(`${config.apiUrl}/devices/${device._id}`, device)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static reloadDeviceDataType(deviceId) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/devices/reloadDataTypes`, { deviceId })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // ======= COMMANDS ==========

  static loadCommands(deviceId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.apiUrl}/command?deviceId=${deviceId}`)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static activateDeviceCommand(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/command`, {
          device: id,
          commandItem: {
            commandValue: true,
            commandType: "IS_ACTIVE"
          },
          channel: "WiFi"
        })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static deactivateDeviceCommand(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/command`, {
          device: id,
          commandItem: {
            commandValue: false,
            commandType: "IS_ACTIVE"
          },
          channel: "WiFi"
        })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static updateLocationCommand(id) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/command`, {
          device: id,
          commandItem: {
            commandValue: "Location",
            commandType: "DEVICE_INFO"
          },
          channel: "WiFi"
        })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static changeIntervalCommand(id, interval) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/command`, {
          device: id,
          commandItem: {
            commandValue: interval,
            commandType: "SEND_DATA_DELAY"
          },
          channel: "WiFi"
        })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static sendGenericCommand(id, command) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/command`, {
          device: id,
          commandItem: {
            commandValue: command.commandValue,
            commandType: command.commandType
          },
          channel: command.channel
        })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // ======= DEVICE DATA ==========

  static loadDeviceData(deviceId, dataPeriod, pageSize, deviceType) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${config.apiUrl}/data?deviceId=${deviceId}&period=${dataPeriod}&pageSize=${pageSize}&dataType=${deviceType}`
        )
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static loadDeviceDataMonthly(deviceId, deviceType) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${config.apiUrl}/data?deviceId=${deviceId}&period=monthly&pageSize=12&dataType=${deviceType}`
        )
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // ======= TTN INFO ==========

  static saveExistingTTNDevice(deviceId, existingTTNDevice) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/devices/modifyTTNInfo`, {
          _id: deviceId,
          ttnInfo: existingTTNDevice
        })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static registerNewTTNDevice(ttnDeviceToRegister) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/ttnDevices`, {
          devId: ttnDeviceToRegister.devId,
          description: ttnDeviceToRegister.description,
          activation: ttnDeviceToRegister.activation
        })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static deleteTTNDeviceInfo(deviceId) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/devices/modifyTTNInfo`, {
          _id: deviceId,
          ttnInfo: null
        })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static loadExtendedTTNInfo(deviceId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.apiUrl}/ttnDevices/${deviceId}`)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static loadTTNApplicationInfo() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.apiUrl}/ttnDevices/application/info`)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static loadTTNDevices() {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.apiUrl}/ttnDevices`)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static deleteTTNDevice(devId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${config.apiUrl}/ttnDevices/${devId}`)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static loadSummaryDashboard(dashboardName) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.apiUrl}/summaryDashboard/${dashboardName}`)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static updatePeriodInPast(dashboardName, periodInPast) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${config.apiUrl}/summaryDashboard/${dashboardName}/updatePeriodInPast`,
          { periodInPast: periodInPast }
        )
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static updateDevicesOnSummaryDashboard(dashboardName, deviceIds) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${config.apiUrl}/summaryDashboard/${dashboardName}/updateDevices`,
          { devices: deviceIds }
        )
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static updateDataTypesOnSummaryDashboard(dashboardName, dataTypes) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${config.apiUrl}/summaryDashboard/${dashboardName}/updateDataTypes`,
          { dataTypes: dataTypes }
        )
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static loadDevicesWithData(deviceIds, dataTypes, period) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/data/getForEachDevice`, {
          devices: deviceIds,
          dataTypes: dataTypes,
          period: period
        })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static loadAlerts(deviceId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${config.apiUrl}/alerts?deviceId=${deviceId}`)
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static loadAlertsHistory(deviceId, pageSize) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${config.apiUrl}/alertsHistory?deviceId=${deviceId}&pageSize=${pageSize}`
        )
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  static updateAlert(alert) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${config.apiUrl}/alerts`, {
          deviceId: alert.device,
          alerts: [alert]
        })
        .then(response => {
          custom(resolve, response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

const custom = (resolve, response) => {
  if (config.isProduction) {
    setTimeout(() => {
      resolve(response);
    }, 400);
  } else {
    resolve(response);
  }
};

export default IotApi;
