import * as React from 'react';
import { COLOR } from '../../constants';

interface IProps {
  isActive : boolean,
  text: string,
  key: string,
  className: string,
  onPress: () => void
};

interface IState{
};

export default class Checkbox extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    isActive: false,
    text: '',
    key: '',
    className: '',
    onPress: () => {}
  }
  render() {
    return (
      <span className={this.props.className} style={styles.container}>
        <input type='checkbox' key={this.props.key} checked={this.props.isActive} onClick={this.props.onPress} />
        <label style={styles.text}>{this.props.text}</label>
      </span>
    );
  }
}

const styles = {
  container: {
    // flexDirection: 'row',
    marginRight: 10
  },
  circle: {
    height: 24,
    width: 24,
    // borderRadius: 12,
    borderWidth: 2,
    borderColor: COLOR.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    height: 12,
    width: 12,
    // borderRadius: 6,
    backgroundColor: COLOR.PRIMARY
  },
  text: {
    marginLeft: 5
  }
};