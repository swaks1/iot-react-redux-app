import { combineReducers } from "redux";
import ajaxCallsInProgress from "./ajaxStatusReducer";
import deviceReducer from "./deviceReducer"; //the name can be changed because inside deviceReducer the function is exported as default...
import commands from "./commandReducer";
import deviceData from "./deviceDataReducer";
import ttnReducer from "./ttnReducer";
import summaryDashboardReducer from "./summaryDashboardReducer";
import alertsModuleReducer from "./alertsModuleReducer";

const rootReducer = combineReducers({
  devices: deviceReducer, //all the state that is returned from deviceReducer will be available in react with state.devices
  commands,
  deviceData,
  ajaxCallsInProgress,
  ttnIntegration: ttnReducer,
  summaryDashboard: summaryDashboardReducer,
  alertsModule: alertsModuleReducer
});

export default rootReducer;
