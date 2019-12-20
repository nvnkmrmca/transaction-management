import Api from '../api/api';
import { isNNObject, isNN } from '../../util/index';
import { IUser } from '../../models/user';

let controller: string = 'user';

export const login = (emailId: string, password: string, callback: (result: boolean, message: string) => void) => {
    new Api().post(controller + '/' + 'login', (result: any, message: string) => {
      if(isNNObject(result) && isNNObject(result.data) && isNN(result.data.token) && isNNObject(result.data.user))
      {
        try {
          sessionStorage.setItem('auth_token', result.data.token);
          sessionStorage.setItem('user', result.data.user);
          sessionStorage.setItem('user_id', result.data.user._id);
          sessionStorage.setItem('user_name', result.data.user.name);
          sessionStorage.setItem('user_bitcoinbalance', result.data.user.bitcoinWalletBalance);
          sessionStorage.setItem('user_ethereumbalance', result.data.user.ethereumWalletBalance);
        } catch (error) {
        }
        callback(true, '');
      }else{
        callback(false, message);
      }
    }, {
      emailId: emailId,
      password: password
    });
};

export const register = (name: string, description: string, emailId: string, password: string, callback: (result: boolean, message: string) => void) => {
  new Api().post(controller + '/', (result: any, message: string) => {
    if(isNNObject(result) && isNN(result.data))
    {
      callback(true, '');
    }else{
      callback(false, message);
    }
  }, {
    name: name,
    description: description,
    emailId: emailId,
    password: password
  });
};

export const updateAccountInfo = (userId: string, bitcoinWalletId: string, bitcoinWalletBalance: number, ethereumWalletId: string, ethereumWalletBalance: number, maxAmountAllowed: number, callback: (result: boolean, message: string) => void) => {
  new Api().put(controller + '/account/' + userId, (result: any, message: string) => {
    if(isNNObject(result) && isNN(result.data))
    {
      callback(true, '');
    }else{
      callback(false, message);
    }
  }, {
    bitcoinWalletId: bitcoinWalletId,
    bitcoinWalletBalance: bitcoinWalletBalance,
    ethereumWalletId: ethereumWalletId,
    ethereumWalletBalance: ethereumWalletBalance,
    maxAmountAllowed: maxAmountAllowed
  });
};

export const transfer = (currencyAmount: number, currencyType: string, sourceUserId: string, targetUserId: string, callback: (result: boolean, message: string) => void) => {
  new Api().post('transaction/', (result: any, message: string) => {
    if(isNNObject(result) && isNN(result.data))
    {
      callback(true, '');
    }else{
      callback(false, message);
    }
  }, {
    currencyAmount: currencyAmount,
    currencyType: currencyType,
    sourceUserId: sourceUserId,
    targetUserId: targetUserId
  });
};

export const loadTransfers = (userId: string, callback: (result: Array<any>, message: string) => void) => {
  new Api().get('transactions/' + userId, (result: any, message: string) => {
    if(isNNObject(result) && isNN(result.data))
    {
      callback(result.data as Array<any>, '');
    }else{
      callback([], message);
    }
  });
};

export const loadUsers = (callback: (result: Array<IUser>, message: string) => void) => {
  new Api().get(controller + 's/', (result: any, message: string) => {
    if(isNNObject(result) && isNN(result.data))
    {
      callback(result.data as Array<IUser>, '');
    }else{
      callback([], message);
    }
  });
};

export const loadUser = (id: string, callback: (result: IUser | null, message: string) => void) => {
  new Api().get(controller + '/' + id, (result: any, message: string) => {
    if(isNNObject(result) && isNNObject(result.data))
    {
      callback(result.data as IUser, '');
    }else{
      callback(null, message);
    }
  });
};

export const logout = (callback: (result: boolean) => void) => {
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('user_bitcoinbalance');
    sessionStorage.removeItem('user_ethereumbalance');
    callback(true);
};
