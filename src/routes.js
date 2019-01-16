import Dashboard from "./components/_common/TableList";
import Icons from "./components/_common/Icons.jsx";
// import Map from "./views/Map.jsx";
// import Notifications from "./views/Notifications.jsx";
// import Rtl from "./views/Rtl.jsx";
// import TableList from "./views/TableList.jsx";
// import Typography from "./views/Typography.jsx";
// import UserProfile from "./views/UserProfile.jsx";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "Monkas",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/app"
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "Monkas",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/app"
  }
  // {
  //   path: "/map",
  //   name: "Map",
  //   rtlName: "خرائط",
  //   icon: "tim-icons icon-pin",
  //   component: Map,
  //   layout: "/app"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/app"
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/app"
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/app"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/app"
  // },
  // {
  //   path: "/rtl-support",
  //   name: "RTL Support",
  //   rtlName: "ار تي ال",
  //   icon: "tim-icons icon-world",
  //   component: Rtl,
  //   layout: "/rtl"
  // }
];
export default routes;
