import * as React from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { Text, Image } from '../common/elements';
import Images from '../images';
import { COLOR } from '../../constants';
import Toast from  '../../util/toast';
import { logout } from '../../store/actions/user';

interface IProps {
  history: any
};

interface IState{ 
};

export default class TitleBar extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
    };
    this.logout = this.logout.bind(this);
  }
  
  componentWillUnmount() {};
  
  logout = () => {
    confirmAlert({
      title: 'Confirm to logout',
      message: 'Are you sure you wish to logout?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            logout((result: boolean) => {
              if(result === true){
                Toast.success('Logout Success!');
                document.location.reload(true);
              }else{
                Toast.fail('Failed to logout!');
              }
            });
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  render() { 
    let userName = sessionStorage.getItem('user_name');
    return (
      <header className='center' style={styles.titleBar}>
        <Link className='fl' to=''>
          <Image src={Images.logo} className='' style={{ width: 22, height: 22}} />
        </Link>
          <Text className='fl' style={{marginLeft: '10px'}}>Transaction Management Portal</Text>
          <Text style={styles.titleText}>{'Hi ' + userName + ' welcome!!!'}</Text>
          <span className='fr pointer' onClick={this.logout} style={{flex: 1,}}>
            <Image src={Images.logout} style={{ width: 20, height: 20}}  />
          </span>
      </header>
    );
  }
};

const styles = {
  titleBar: {
    backgroundColor: COLOR.PRIMARY,
    color: COLOR.FONT_COLOR3,
    width: '100%',
    padding: 7
  },
  titleText: {
    flex: 15, 
    fontSize: 15
  }
};