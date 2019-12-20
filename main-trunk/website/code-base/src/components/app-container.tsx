import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import Login from '../components/login';
import Home from '../components/home';
import { isNN } from '../util';

interface IProps {
  history: any
};

interface IState{
  isLoggedIn: boolean
};

export default class AppContainer extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  };

  componentDidMount() {
    let token: string | null = sessionStorage.getItem('auth_token');
    if(isNN(token)){
      this.setState({
        isLoggedIn: true
      });
    }
  };

  componentWillUnmount() {};
  
  render() {
    return(
        this.state.isLoggedIn ? 
          <HashRouter>
            <Home history={this.props.history} />
          </HashRouter>
        :
          <Login />
    )
  }
};