import * as React from 'react';
import { View, Image } from '../common/elements';
import { COLOR } from '../../constants';
import Images from '../images';

interface IProps {
  visible: boolean,
  text?: string
};

interface IState{
};

export default class Spinner extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    visible: false,
    text: 'Loading...'
  }
  render() {
    return (
      this.props.visible &&
      <View>
        <View className='loader-overlay'></View>
        <View className='loader'>
          <Image className='' src={Images.loading} style={{width: '50px', height: '50px'}} />
          <View style={{color: COLOR.SECONDARY, fontWeight: 'bold', marginTop: 5}}>{this.props.text}</View>
        </View>
      </View>
    );
  }
}

// <AppSpinner visible={this.props.visible} textContent={this.props.text} textStyle={{color: COLOR.SECONDARY}} />
