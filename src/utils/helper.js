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
  }
};
