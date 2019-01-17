import Dashboard from "./components/Dashboard";

var prefix = "app";

var routes = [
  {
    path: `/${prefix}/dashboard`,
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard
  },
  // {
  //   path: `/${prefix}/icons`,
  //   name: "Icons",
  //   icon: "tim-icons icon-atom",
  //   component: Icons
  // }
];
export default routes;
