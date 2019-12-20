import * as React from 'react';
import { styles as cardStyles } from '../../styles/card';
import { View, TouchableHighlight, Image, Text } from '../common/elements';
import Images from '../images';
import { COLOR } from '../../constants';
import { loadUsers } from '../../store/actions/user';

interface IProps {
  history: any
};

interface IState {
};

export default class Dashboard extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  };

  componentWillUnmount() {};
  
  render() {
    return(
      <main style={styles.content}>
        <View className='fl' style={cardStyles.container}>
            <View style={cardStyles.row}>
                <View className='fl pointer' style={{...cardStyles.inner, textAlign: 'center'}} onClick={() => this.props.history.push('account')}>
                  <Image src={Images.members} style={cardStyles.img} />
                  <View className='pointer' style={cardStyles.txt}>
                    Account Info
                  </View>
                </View>
                <View className='fl pointer' style={{...cardStyles.inner, textAlign: 'center'}} onClick={() => this.props.history.push('transfer')}>
                  <Image src={Images.vehicle} style={cardStyles.img} />
                  <View className='pointer' style={cardStyles.txt}>
                    Make Transfer
                  </View>
                </View>
                <View className='fl pointer' style={{...cardStyles.inner, textAlign: 'center'}} onClick={() => this.props.history.push('history')}>
                  <Image src={Images.servent} style={cardStyles.img} />
                  <View className='pointer' style={cardStyles.txt}>
                  View History
                  </View>
                </View>
              </View>
        </View>
      </main>
    );
  }
};


const styles = {
  content: {
    flex: 1,
    // backgroundColor: 'transparent',
    width: '100%',
  },
  tab: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center'
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: COLOR.PRIMARY,
    'border-bottom-style': 'solid',
    color: COLOR.PRIMARY
  }
};