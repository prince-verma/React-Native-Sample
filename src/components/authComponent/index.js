import React from 'react';
import {Storage, USER_KEY} from '../../common'
import Login from "../login";

export default class Authenticate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }

  async componentWillMount() {
    try {
      let user = await Storage.get(USER_KEY);
      if (user) {
        this.setState({isLogin: true})
      }
    } catch (err) {
      console.warn("err", err)
    }
  }

  render() {
    let {isLogin} = this.state;


    if (!isLogin) {
      return <Login navigation={this.props.navigation}/>
    }

    return (this.props.children)
  }
}
