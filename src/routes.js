import Dashboard from "./components/dashboard/Dashboard";
import Devices from "./components/devices/Devices";
import DevicesDetails from "./components/deviceDetails/DeviceDetails";
import TheThingsNetworkContainer from "./components/theThingsNetwork/TheThingsNetworkContainer"

export const prefix = "app";

var routes = [
  {
    path: `/${prefix}/dashboard`,
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard
  },
  {
    path: `/${prefix}/devices`,
    name: "Devices",
    icon: "tim-icons icon-mobile",
    component: Devices,
    exact: true
  },
  {
    path: `/${prefix}/devices/:id`,
    name: "DeviceDetails",
    icon: "tim-icons icon-mobile",
    component: DevicesDetails,
    hidden: true
  },
  {
    path: `/${prefix}/ttn`,
    name: "The Things Network",
    icon: "tim-icons icon-puzzle-10",
    component: TheThingsNetworkContainer,
    exact: true
  }
];

export default routes;
