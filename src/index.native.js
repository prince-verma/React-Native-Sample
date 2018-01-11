import React from 'react';

import StackNavigator from "./routes";
import Authenticate from "./components/authComponent";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StackNavigator/>
    )
  }
}
