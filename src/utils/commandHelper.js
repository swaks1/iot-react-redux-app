export const commandHelper = {
  getLoraWANCommand: (commandType, commandValue) => {
    return {
      commandType,
      commandValue,
      channel: "LoraWAN"
    };
  },
  getWiFiCommand: (commandType, commandValue) => {
    return {
      commandType,
      commandValue,
      channel: "WiFi"
    };
  }
};
