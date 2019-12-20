import * as React from 'react';
import { View, TextInput, Picker, Text } from '../common/elements';
import Button from '../common/button';
import Spinner from '../common/spinner';
import { styles } from "../../styles/page";
import { styles as modelStyles } from "../../styles/model";
import { COLOR } from '../../constants';
import { isNN } from '../../util/index';
import { loadTransfers } from '../../store/actions/user';
import { toDateTimeString } from '../../util/convert';
import { Link } from 'react-router-dom';

interface IProps {
  history: any
};

interface IState{
  data: Array<any>,
  userId: string,
  isLoading: boolean
};

export default class History extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      userId: '',
      isLoading: false
    }
  };

  componentDidMount() {
    let userId: string | null = sessionStorage.getItem('user_id');
    this.setState({
      userId: userId ? userId : ''
    });
    this.setState({
      isLoading: true
    });
    loadTransfers(userId ? userId : '', (result: Array<any>, message: string) => {
      this.setState({
        isLoading: false,
        data: result.filter(d => d.sourceUserId === this.state.userId || d.targetUserId === this.state.userId)
      });
    });
  };

  render() {
    return(
      <main style={{...styles.content, flex: 1, backgroundColor: COLOR.INVERSE}}>
        <View style={modelStyles.container}>
        <View style={{...modelStyles.row, marginBottom: 25, borderBottom: '1px solid ' + COLOR.HR_COLOR}}>
          <Link to='' className='pointer m10'>
            Home
          </Link>
          <Link to='account' className='pointer m10'>
            Account Info
          </Link>
          <Link to='transfer' className='pointer m10'>
            Make Transfer
          </Link>
          <Link to='history' className='pointer m10'>
            View History
          </Link>
        </View>
        {
          isNN(this.state.data) ?
          this.state.data.map((d: any, i: number) => {
            return(
              <View key={i} style={{flex: 1, borderBottomWidth: 1, borderBottomColor: COLOR.HR_COLOR, borderBottomStyle: 'solid', paddingBottom: 3}}>
                 <View>
                   <Text style={{flex: 1, fontWeight: 'bold', color: this.state.userId === d.sourceUserId ? COLOR.ERROR : COLOR.SUCCESS}}>{this.state.userId === d.sourceUserId ? 'SEND' : 'RECEIVED'}</Text>
                </View>
                <View>
                  Amount: <Text style={{flex: 1, fontWeight: 'bold'}}>{d.currencyAmount}</Text>
                </View>
                <View>
                  Currency Type: <Text style={{flex: 1, fontWeight: 'bold'}}>{d.currencyType}</Text>
                </View>
                {this.state.userId === d.sourceUserId && 
                <View>
                  To: <Text style={{flex: 1, fontWeight: 'bold'}}>{d.targetUserId}</Text>
                </View>
                }
                {this.state.userId === d.targetUserId && 
                <View>
                  From: <Text style={{flex: 1, fontWeight: 'bold'}}>{d.sourceUserId}</Text>
                </View>
                }
                <View>
                  On: <Text style={{flex: 1, fontWeight: 'bold'}}>{toDateTimeString(d.createdAt)}</Text>
                </View>
                {d.state &&
                <View>
                  Status: <Text style={{flex: 1, fontWeight: 'bold'}}>{d.state}</Text>
                </View>
                }
              </View>
            )
          })
          :
          <Text>No Transactions found!!!</Text>   
        }
        </View>
        <Spinner visible={this.state.isLoading} />
      </main>
    );
  }
};