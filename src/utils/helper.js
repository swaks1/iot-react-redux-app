export const helper = {
  getIconForDataType: dataType => {
    if (!dataType) return "";
    switch (dataType.toLowerCase()) {
      case "temperature":
        return "thermometer-half";
      case "humidity":
        return "tint";
      case "light":
        return "sun";
      case "ledState":
        return "lightbulb";
      default:
        return "asterisk";
    }
  },
  mapDataToResponse: (reverse, deviceData, dataPeriod) => {
    let response = {
      data: [],
      labels: [],
      name: "",
      datesCreated: []
    };
    try {
      if (deviceData instanceof Array && deviceData.length > 0) {
        let datesCreated = [];
        let data = [];
        let labels = [];
        let channels = [];
        let name = deviceData[0].dataItem.dataType;

        data = deviceData.map((item, index) => {
          return Math.round(parseFloat(item.dataItem.dataValue) * 100) / 100;
        });
        datesCreated = deviceData.map((item, index) => {
          return item.created;
        });
        labels = deviceData.map((item, index) => {
          return item.created;
        });
        channels = deviceData.map((item, index) => {
          return item.channel;
        });
        if (dataPeriod === "mostRecent") {
          labels = deviceData.map((item, index) => {
            return `${item.created.slice(0, 10)} @ ${item.created.slice(11, 19)}`;
          });
        }
        if (dataPeriod === "lastHour" || dataPeriod == "last24h") {
          labels = deviceData.map((item, index) => {
            return item.created.slice(11, 17); //"17:44" only hour
          });
        }
        response.data = reverse ? data.reverse() : data;
        response.labels = reverse ? labels.reverse() : labels;
        response.channels = reverse ? channels.reverse() : channels;
        response.datesCreated = reverse ? datesCreated.reverse() : datesCreated;
        response.name = name;
      }
    } catch (error) {
      console.log("Getting Data for Line chart ...." + error);
    }

    return response;
  }
};
