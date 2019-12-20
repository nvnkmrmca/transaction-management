import * as React from 'react';
import { View, TextInput, Text } from '../common/elements';
import Button from '../common/button';
import Spinner from '../common/spinner';
import { styles } from "../../styles/page";
import { styles as modelStyles } from "../../styles/model";
import {styles as CommonStyles} from '../../styles/common';
import { COLOR } from '../../constants';
import { isNN, isNNObject } from '../../util/index';
import Toast from  '../../util/toast';
import { IUser } from '../../models/user';
import { loadUser, updateAccountInfo } from '../../store/actions/user';
import { Link } from 'react-router-dom';

interface IProps {
  history: any
};

interface IState{
  isLoading: boolean,
  userId: string,
  bitcoinWalletId: string,
	bitcoinWalletBalance: number,
	ethereumWalletId: string,
	ethereumWalletBalance: number,
	maxAmountAllowed: number
};

export default class Account extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
      userId: '',
      bitcoinWalletId: '',
      bitcoinWalletBalance: 0,
      ethereumWalletId: '',
      ethereumWalletBalance: 0,
      maxAmountAllowed: 0
    }
    this.onSave = this.onSave.bind(this);
  };

  componentDidMount() {
    let userId: string | null = sessionStorage.getItem('user_id');
    this.setState({
      userId: userId ? userId : ''
    });
    this.setState({
      isLoading: true
    });
    loadUser(userId ? userId : '', (result: IUser| null, message: string) => {
      if(result !== null) {
        this.setState({
          isLoading: false,
          bitcoinWalletId: result.bitcoinWalletId,
          bitcoinWalletBalance: result.bitcoinWalletBalance,
          ethereumWalletId: result.bitcoinWalletId,
          ethereumWalletBalance: result.ethereumWalletBalance,
          maxAmountAllowed: result.maxAmountAllowed
        });
      }
    });
  };

  onSave = () => {
    if(isNN(this.state.userId) && this.state.bitcoinWalletBalance > 0 && isNN(this.state.bitcoinWalletId) && isNN(this.state.ethereumWalletId) && this.state.ethereumWalletBalance > 0 && this.state.maxAmountAllowed > 0){
        this.setState({
          isLoading: true
        });
        updateAccountInfo(this.state.userId, this.state.bitcoinWalletId, this.state.bitcoinWalletBalance, this.state.ethereumWalletId, this.state.ethereumWalletBalance, this.state.maxAmountAllowed, (result: boolean, message: string) => {
          this.setState({
            isLoading: false,
          });
          if(result === true){
            Toast.success('Transaction initiated successfully.');
          }else{
            Toast.fail(isNN(message) ? message : 'Failed to initiate transaction.');
          }
        });
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
            <Text>Bitcoin Wallet Id</Text>
            <TextInput type='text' placeholder="Bitcoin Wallet Id" className='form-control' style={{...CommonStyles.textInput, ...modelStyles.ele}} value={this.state.bitcoinWalletId} onChange={(event: any) => this.setState({bitcoinWalletId: event.target.value})} />
          </View>         
          <View style={modelStyles.row}>
            <Text>Bitcoin Wallet Balance</Text>
            <TextInput type='number' placeholder="Bitcoin Wallet Balance" className='form-control' style={{...CommonStyles.textInput, ...modelStyles.ele}} value={this.state.bitcoinWalletBalance > 0 ? this.state.bitcoinWalletBalance : ''} onChange={(event: any) => this.setState({bitcoinWalletBalance: +(event.target.value.replace(/[^0-9]/g, ''))})} />
          </View>
          <View style={modelStyles.row}>
            <Text>Ethereum Wallet Id</Text>
            <TextInput type='text' placeholder="Ethereum Wallet Id" className='form-control' style={{...CommonStyles.textInput, ...modelStyles.ele}} value={this.state.ethereumWalletId} onChange={(event: any) => this.setState({ethereumWalletId: event.target.value})} />
          </View>         
          <View style={modelStyles.row}>
            <Text>Ethereum Wallet Balance</Text>
            <TextInput type='number' placeholder="Ethereum Wallet Balance" className='form-control' style={{...CommonStyles.textInput, ...modelStyles.ele}} value={this.state.ethereumWalletBalance > 0 ? this.state.ethereumWalletBalance : ''} onChange={(event: any) => this.setState({ethereumWalletBalance: +(event.target.value.replace(/[^0-9]/g, ''))})} />
          </View>
          <View style={modelStyles.row}>
            <Text>Max Amount Allowed</Text>
            <TextInput type='number' placeholder="Max Amount Allowed" className='form-control' style={{...CommonStyles.textInput, ...modelStyles.ele}} value={this.state.maxAmountAllowed > 0 ? this.state.maxAmountAllowed : ''} onChange={(event: any) => this.setState({maxAmountAllowed: +(event.target.value.replace(/[^0-9]/g, ''))})} />
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