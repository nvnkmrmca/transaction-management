import * as React from 'react';
import { View, TextInput, Picker, Text } from '../common/elements';
import Button from '../common/button';
import Spinner from '../common/spinner';
import { styles } from "../../styles/page";
import { styles as modelStyles } from "../../styles/model";
import {styles as CommonStyles} from '../../styles/common';
import { COLOR } from '../../constants';
import { isNN } from '../../util/index';
import Toast from  '../../util/toast';
import { IUser } from '../../models/user';
import { loadUsers, transfer } from '../../store/actions/user';
import RadioButton from '../common/radio-button';
import { Link } from 'react-router-dom';

interface IProps {
  history: any
};

interface IState{
  users: Array<IUser>,
  isLoading: boolean,
  currencyAmount: number,
	currencyType: string,
	sourceUserId: string,
	targetUserId: string,
};

export default class Transfer extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      currencyAmount: 0,
      currencyType: 'BITCOIN',
      sourceUserId: '',
      targetUserId: ''
    }
    this.onSave = this.onSave.bind(this);
  };

  componentDidMount() {
    let userId: string | null = sessionStorage.getItem('user_id');
    this.setState({
      sourceUserId: userId ? userId : ''
    });
    this.setState({
      isLoading: true
    });
    loadUsers((result: Array<IUser>, message: string) => {
      this.setState({
        isLoading: false,
        users: result
      });
    });
  };

  onSave = () => {
    if(isNN(this.state.currencyType) && this.state.currencyAmount > 0 && isNN(this.state.sourceUserId) && isNN(this.state.targetUserId) && this.state.sourceUserId !== this.state.targetUserId){
      let hasBalance: boolean = false;
      if(this.state.currencyType == 'BITCOIN'){
        let bitcoinbalance: string | null = sessionStorage.getItem('user_bitcoinbalance');
        hasBalance = (bitcoinbalance && parseInt(bitcoinbalance) >= this.state.currencyAmount) ? true : false;
      }else{
        let ethereumbalance: string | null = sessionStorage.getItem('user_ethereumbalance');
        hasBalance = (ethereumbalance && parseInt(ethereumbalance) >= this.state.currencyAmount) ? true : false;
      }
      if(hasBalance){
        this.setState({
          isLoading: true
        });
        transfer(this.state.currencyAmount, this.state.currencyType, this.state.sourceUserId, this.state.targetUserId, (result: boolean, message: string) => {
          this.setState({
            isLoading: false,
          });
          if(result === true){
            this.setState({
              currencyAmount: 0,
              currencyType: 'BITCOIN',
              sourceUserId: '',
              targetUserId: ''
            });
            // this.props.navigation.navigation.goBack(null)
            Toast.success('Transaction initiated successfully.');
          }else{
            Toast.fail(isNN(message) ? message : 'Failed to initiate transaction.');
          }
        });
      }else{
          Toast.warn('Insufficient balance in your ' + this.state.currencyType + ' account. Please update the balance and then transfer.');
      }
    }else{
      Toast.warn('Please fill all the required fields before Save.');
    }
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
          <View style={modelStyles.row}>
          <Picker
            className='form-control'
            value={this.state.targetUserId}
            style={modelStyles.ele}
            onChange={(event: any) => this.setState({ targetUserId: event.target.value})}>
              <option key={'block0'} value=''>Select a Person to Transfer</option>
              {this.state.users &&
                this.state.users.filter(d => d._id !== this.state.sourceUserId).map((d: IUser, i: number) => {
                  return(<option key={'block' + i} value={d._id}>{d.name}</option>);
                })
              }
            </Picker>
          </View>        
          <View style={modelStyles.row}>
            <RadioButton isActive={this.state.currencyType === 'BITCOIN'} text='Bitcoin' onPress={() => this.setState({currencyType: 'BITCOIN'})} />
            <RadioButton isActive={this.state.currencyType === 'ETHEREUM'} text='Ethereum' onPress={() => this.setState({currencyType: 'ETHEREUM'})} />
          </View>
          <View style={modelStyles.row}>
            <TextInput type='number' placeholder="Currency Amount" className='form-control' style={{...CommonStyles.textInput, ...modelStyles.ele}} value={this.state.currencyAmount > 0 ? this.state.currencyAmount : '' } onChange={(event: any) => this.setState({currencyAmount: +(event.target.value.replace(/[^0-9]/g, ''))})} />
          </View> 
          <View className='center' style={modelStyles.saveBtn}>
            <Button
            title="SUBMIT"
            onPress={this.onSave}
            />
          </View>
        </View>
        <Spinner visible={this.state.isLoading} />
      </main>
    );
  }
};