import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { View } from '../common/elements';
import TitleBar from './title-bar';
import TabBar from './tab-bar';
import { COLOR } from '../../constants';
import Dashboard from './dashboard';
import Account from './account';
import Transfer from './transfer';
import History from './history';
import NotFound from '../../components/not-found';

interface IProps {
  history: any
};

interface IState{
};

export default class Index extends React.Component<IProps, IState> {

  render() {
    return (
      <View style={styles.container}>
        <TitleBar history={this.props.history} />
          <Switch>
            <Route path={'/'} exact component={Dashboard} />
            <Route path={'/account'} exact component={Account} />
            <Route path={'/transfer'} exact component={Transfer} />
            <Route path={'/history'} exact component={History} />     
            <Route component={NotFound} />
          </Switch>
        <TabBar />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: COLOR.INVERSE,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
};