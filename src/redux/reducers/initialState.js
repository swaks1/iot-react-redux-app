export default {
  ajaxCallsInProgress: 0,
  devices: [
    {
      deviceId: null,
      data: {},
      extendedTTNInfo: {
        data: {},
        loading: false
      },
      loading: false
    }
  ],
  commands: [
    {
      deviceId: null,
      data: [],
      loading: false
    }
  ],
  deviceData: [
    {
      deviceId: null,
      data: [],
      dataMonthly: [],
      loading: false
    }
  ],
  ttnIntegration: {
    applicationInfoState: {
      applicationInfo: {},
      loading: false
    },
    deviceState: {
      devices: [],
      loading: false
    }
  },
  summaryDashboard: {
    name: "",
    periodInPast: 24,
    deviceIdsState: {
      deviceIds: [],
      loading: false
    },
    dataTypesState: {
      dataTypes: [],
      loading: false
    },
    devicesWithDataState: {
      devices: [],
      loading: false
    }
  },
  alertsModule: [
    {
      deviceId: null,
      alertsState: {
        alerts: [],
        loading: false
      },
      alertsHistoryState: {
        alertsHistory: [],
        loading: false
      }
    }
  ]
};
