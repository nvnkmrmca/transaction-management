// import { AsyncStorage } from 'react-native';
import { API_PATH } from "../../constants";
import { isNNObject, json2Str, isNN } from "../../util/index";

export default class Api {
    private url: string = API_PATH;
     
    // private url: string =  "https://192.168.43.80:45456/api/";
    // private url: string =  "http://192.168.43.80:45455/api/";

    /**
    * HTTP GET operation
    * @ param url
    * @ param callback
    */
    public get = (url: string, callback: Function) => {
        this.fetch(url, 'GET', callback);
    };

    /**
    * HTTP POST operation
    * @ param url
    * @ param callback
    */
    public post = (url: string, callback: Function, data?: {}) => {
        this.fetch(url, 'POST', callback, data);
    };

    /**
    * HTTP DELETE operation
    * @ param url
    * @ param callback
    */
    public delete = (url: string, callback: Function, data?: {}) => {
        this.fetch(url, 'DELETE', callback, data);
    };

    /**
    * HTTP PATCH operation
    * @ param url
    * @ param callback
    * @ param data
    */
    public patch = (url: string, callback: Function, data?: {}) => {
        this.fetch(url, 'PATCH', callback, data);
    };

    /**
    * HTTP PUT operation
    * @ param url
    * @ param callback
    * @ param data
    */
    public put = (url: string, callback: Function, data?: {}) => {
        this.fetch(url, 'PUT', callback, data);
    };

    public upload = async(url: string, callback: Function, data?: any) => {
        let token = await this.getAS('auth_token');
        let clientId = await this.getAS('client_id');
        let userId = await this.getAS('user_id');
        
        var formData = new FormData();
        formData.append('file', data.file, data.name);
        formData.append('name', data.name);

        fetch(this.url + url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    'x-access-token': (isNN(token) ? 'Bearer ' + token : ''),
                    'client-id': (isNN(clientId) ? '' + clientId : ''),
                    'user-id': (isNN(userId) ? '' + userId : '')
                },
                body: formData,
            }).then(response => {
                return response.json(); 
            }).then((response: any) => {
                if(isNNObject(response)){
                    if(isNNObject(response.data)){
                        this.callback(callback, response, 'Some problem occurs. Please contact administrator.');
                    }else{
                        this.callback(callback, null, response.message);
                    }

                    //   if(response.ok == true && response.status == 200){
                    //     this.callback(callback, response.data, "Some problem occurs. Please contact administrator.");
                    //   }else if (response.status == 401){
                    //     this.callback(callback, null, "Unauthorized request.");
                    //   }
                    //   else{
                    //     this.callback(callback, null, response.data.message);
                    //   }
                }else{
                    this.callback(callback, null, 'Some problem occurs. Please contact administrator.');
                }
            }).catch((error: any) => {
                console.log('err', error);
                this.callback(callback, null, error.toString());
            });
    };


/*
    private fetch = (url: string, method: string, callback: Function, data?: any) => {
        AsyncStorage.getItem('auth_token').then((token) => {
            AsyncStorage.getItem('user_id').then((userId) => {
                this.next(url, 'PUT', token, userId, callback, data);
            }).catch(ex => {
                this.next(url, 'PUT', token, '', callback, data);
            }); 
        }).catch(ex => {
            this.next(url, 'PUT', '', '', callback, data);
        });
    };
    */

    private getAS = async (key: string) => {
        try {
            // return await AsyncStorage.getItem(key);
            return await sessionStorage.getItem(key);
        } catch (error) {
            return '';
        }
    };
    
    private fetch = async(url: string, method: string, callback: Function, data?: any) => {
        let token = await this.getAS('auth_token');
        let clientId = await this.getAS('client_id');
        let userId = await this.getAS('user_id');
        fetch(this.url + url, 
            {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': (isNN(token) ? 'Bearer ' + token : ''),
                    'client-id': (isNN(clientId) ? '' + clientId : ''),
                    'user-id': (isNN(userId) ? '' + userId : '')
                },
                body: isNNObject(data) ? json2Str(data) : null,
            }).then(response => {
                return response.json(); 
            }).then((response: any) => {
                if(isNNObject(response)){
                    if(isNNObject(response.data)){
                        this.callback(callback, response, 'Some problem occurs. Please contact administrator.');
                    }else{
                        this.callback(callback, null, response.message);
                    }

                    //   if(response.ok == true && response.status == 200){
                    //     this.callback(callback, response.data, "Some problem occurs. Please contact administrator.");
                    //   }else if (response.status == 401){
                    //     this.callback(callback, null, "Unauthorized request.");
                    //   }
                    //   else{
                    //     this.callback(callback, null, response.data.message);
                    //   }
                }else{
                    this.callback(callback, null, 'Some problem occurs. Please contact administrator.');
                }
            }).catch((error: any) => {
                console.log('err', error);
                this.callback(callback, null, error.toString());
            });
    };

    private callback = (callback: Function, data: any, message: any) => {
        // console.log('message: '+ message);
        if(isNNObject(callback) && typeof callback == "function"){
            callback(data, message);
        }
    };

    /*
        private handleResult = (data: any) => {
        if (data) {
            if (data.message) {
                return null;
            } else {
                return data;
            }
        } else {
            return null;
        }
    };

    private onBadRequest = () => {
       
    };
    
    private onError = () => {
        
        // alert('error occured on parsing the request ' + config.baseURL + this.url + errorMessage);
        // console.error('error occured on parsing the request ' + config.baseURL + this.url + errorMessage);
         
    };
    
    private onUnAuthorized = () => {
        // alert('UnAuthorized Request');
                 
    };
    */
};