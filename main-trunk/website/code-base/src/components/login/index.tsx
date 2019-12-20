import * as React from 'react';
import { View, Text, TextInput, Image } from '../common/elements';
import Button from '../common/button';
import Spinner from '../common/spinner';
import Images from '../images';
import {styles as CommonStyles} from '../../styles/common';
import { COLOR } from '../../constants';
import { isNN } from '../../util';
import Toast from  '../../util/toast';
import { login, register } from '../../store/actions/user';

interface IProps {
}

interface IState{
    emailId: string,
    password: string,
    message: string,
    isLoading: boolean,
    isCreate: boolean,
    uName: string,
	uDescription: string,
	uEmailId: string,
	uPassword: string,
};

export default class Index extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            emailId: '',
            password: '',
            message: '',
            isLoading: false,
            isCreate: false,
            uName: '',
            uDescription: '',
            uEmailId: '',
            uPassword: ''
        };
        this.onLogin = this.onLogin.bind(this);
        this.onCreateAccount = this.onCreateAccount.bind(this);
        this.onRegister = this.onRegister.bind(this);
    };

    componentWillUnmount() {};

    onLogin = () =>{
        if(isNN(this.state.emailId) && isNN(this.state.password)){
            this.setState({
                message: '',
                isLoading: true
            });
            login(this.state.emailId, this.state.password, (result: boolean, message: string) => {
                if(result === true){                        
                    this.setState({
                        isLoading: false,
                        message: ''
                    });
                    document.location.reload(true);
                }else{
                    this.setState({
                        message: message,
                        isLoading: false
                    });
                }
            });
        }else{
            Toast.warn('Enter Email Id and Password to continue.');
        }
    };
    
    onCreateAccount = () =>{
        this.setState({
            isCreate: true,
            uName: '',
            uDescription: '',
            uEmailId: '',
            uPassword: '',
            message: ''
        });
    };

    onRegister = () => {
        if(isNN(this.state.uName) && isNN(this.state.uDescription) && isNN(this.state.uEmailId) && isNN(this.state.uPassword)){
            this.setState({
                message: '',
                isLoading: true
            });
            register(this.state.uName, this.state.uDescription, this.state.uEmailId.toLowerCase(), this.state.uPassword, (result: boolean, message: string) => {
                if(result === true){
                    Toast.success('Registered successfully now login with your email id and password.');
                    this.setState({
                        isLoading: false,
                        message: '',
                        isCreate: false,
                        password: '',
                        uName: '',
                        uDescription: '',
                        uEmailId: '',
                        uPassword: ''
                    });
                }else{
                    this.setState({
                        message: message,
                        isLoading: false
                    });
                }
            });
        }else{
            Toast.warn('Enter all the fields to continue.');
        }
    };

  render() {
    return (
            <View className='container' style={{backgroundColor: COLOR.INVERSE, maxWidth: '270px'}}>
                <View className='row' style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginBottom: 30, marginTop: 5}}>
                    <Image src={Images.logo} style={{width: 150, height: 150}}/>
                </View>
                {!this.state.isCreate ?
                <View className='row' style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                    <View className='col-12' style={styles.row}>
                        <Image className='absolute' src={Images.username} style={styles.txtIcon} />
                        <TextInput type='text' className='form-control' placeholder='Email Id' style={{...CommonStyles.textInput, ...styles.txt}} value={this.state.emailId} onChange={(event: any) => this.setState({emailId: event.target.value})} />
                    </View>
                    <View className='col-12' style={{...styles.row, marginBottom: 15}}>
                        <Image className='absolute' src={Images.password} style={styles.txtIcon} />
                        <TextInput type='password'  className='form-control' placeholder='Password' value={this.state.password} style={{...CommonStyles.textInput, ...styles.txt}} onChange={(event: any) => this.setState({password: event.target.value})} />
                    </View>
                    <Button
                    title={this.state.isLoading === false ? "LOGIN" : "Loading..."}
                    onPress={this.onLogin}
                    />
                    <Text className='col-12 center' style={{marginTop: 5, color: (this.state.isLoading ? COLOR.FONT_COLOR2 : COLOR.ERROR)}}>{this.state.message}</Text>

                    <View className='col-12 center' style={{marginTop: 15, alignItems: 'center', justifyContent:'center'}}>
                        <Text className='col-12' style={{marginBottom: 5, textAlign: 'center'}}>Dont have an account?</Text>
                        <View className='col' style={{float: 'left', alignItems: 'center', justifyContent:'center', borderWidth: 1, borderColor: '#000000', borderStyle: 'solid', borderRadius: 10}}>
                            <Text style={{textAlign: 'center', margin: '7px', cursor: 'pointer'}} onClick={this.onCreateAccount}>REGISTER HERE</Text>
                        </View>
                    </View>
                </View>
                :
                <View className='row' style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                    <View className='col-12' style={styles.row}>
                        <TextInput type='text' className='form-control' placeholder='Name' style={{...CommonStyles.textInput, ...styles.txtFull}} value={this.state.uName} onChange={(event: any) => this.setState({uName: event.target.value})} />
                    </View>
                    <View className='col-12' style={styles.row}>
                        <TextInput type='text' className='form-control' placeholder='Description' style={{...CommonStyles.textInput, ...styles.txtFull}} value={this.state.uDescription} onChange={(event: any) => this.setState({uDescription: event.target.value})} />
                    </View>
                    <View className='col-12' style={styles.row}>
                        <TextInput type='text' className='form-control' placeholder='Email Id' style={{...CommonStyles.textInput, ...styles.txtFull}} value={this.state.uEmailId} onChange={(event: any) => this.setState({uEmailId: event.target.value})} />
                    </View>
                    <View className='col-12' style={styles.row}>
                        <TextInput type='password' className='form-control' placeholder='Password' style={{...CommonStyles.textInput, ...styles.txtFull}} value={this.state.uPassword} onChange={(event: any) => this.setState({uPassword: event.target.value})} />
                    </View>
                    <Button
                    title={this.state.isLoading === false ? "Submit" : "Loading..."}
                    onPress={this.onRegister}
                    />
                    <Text className='col-12 center' style={{marginTop: 5, color: (this.state.isLoading ? COLOR.FONT_COLOR2 : COLOR.ERROR)}}>{this.state.message}</Text>

                    <View style={{marginTop: 15}}>
                        <Text className='pointer' onClick={() => { 
                            this.setState({
                                isCreate: false,
                                uName: "",
                                uDescription: "",
                                uEmailId: "",
                                uPassword: "",
                                message: ""
                            });
                         }} style={{marginBottom: 5, textAlign: 'center', color: COLOR.SECONDARY}}>Go back to Login.</Text>
                    </View>
                </View>
                }
                <Spinner visible={this.state.isLoading} text={""} />
            </View>
    );
  }
};

const styles = {
    row: {
        // flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        marginBottom: 25
    },     
    txtIcon: {
        marginLeft: 3,
        // marginRight: -15,
        height: 15,
        width: 15,
        resizeMode : 'stretch',
        alignItems: 'center',
        top: 11

    },
    txt: {
        flex: 1,
        paddingLeft: 20
    },
    txtFull: {
        flex: 1,
        paddingLeft: 20
    }
};