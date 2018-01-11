import Input from './components/input/Input.native';
import * as Storage from './components/storage/Storage.native';
import * as Api from './components/api/Api.native';
import showSnackbar from './showSnackbar';
import {NavigationActions} from "react-navigation";

const USER_KEY = "xebia_user";
const getResetAction = (routeName) => {
  return NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName})]
  });
};

export {
  Input,
  Storage,
  Api,
  USER_KEY,
  showSnackbar,
  getResetAction,
};