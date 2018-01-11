import {StackNavigator} from "react-navigation";

import Dashboard from "./components/dashboard";
import Login from "./components/login";

let ROUTE_CONFIG = {
  Dashboard: {screen: Dashboard},
  Login: {screen: Login}
};
let STACK_NAVIGATOR_CONFIG = {initialRouteName: "Dashboard"};

export default StackNavigator(ROUTE_CONFIG, STACK_NAVIGATOR_CONFIG);
