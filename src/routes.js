import Dashboard from "./components/Dashboard/Dashboard";
import Devices from "./components/Devices/Devices";

var prefix = "app";

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
    component: Devices
  }
];
export default routes;
