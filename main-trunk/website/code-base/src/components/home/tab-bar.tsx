import * as React from 'react';
import { View } from '../common/elements';
import { COLOR } from '../../constants';

interface IProps {
};

interface IState{ 
};

export default class TabBar extends React.Component<IProps, IState> {
  componentWillUnmount() {};
  
  render() {
    return (
      <footer style={styles.tabBar}>
        <View className='center'>© Transaction Management Protal</View>
      </footer>
    );
  }
};

const styles = {  
  tabBar: {
    flex: 1,
    // backgroundColor: COLOR.HR_COLOR,
    borderTopColor: COLOR.HR_COLOR,
    borderTopWidth: 1,
    'border-top-style': 'solid',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    width: '100%',
    // flexDirection: 'row',
    // position: 'absolute',
    marginTop: 25,
    paddingTop: 15,
    paddingBottom: 15
  },
  tab: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center'
  },
  tabImage: {
    width: 20,
    height: 20
  },
  activeTab: {
    backgroundColor: COLOR.INVERSE
  }
};