import {Dimensions} from 'react-native';
import Input from './components/input/Input.native';
import * as Storage from './components/storage/Storage.native';
import * as Api from './components/api/Api.native';
import showSnackbar from './showSnackbar';
import {NavigationActions} from "react-navigation";
import Button from './components/button';

const USER_KEY = "xebia_user";
const {width, height} = Dimensions.get("window");
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
  Button,
  width,height,
};