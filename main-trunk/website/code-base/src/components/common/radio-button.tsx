import * as React from 'react';
import { COLOR } from '../../constants';
import { isNN } from '../../util';

interface IProps {
  isActive : boolean,
  text: string,
  key: string,
  onPress: () => void
};

interface IState{
};

export default class RadioButton extends React.Component<IProps, IState> {
  static defaultProps: IProps = {
    isActive: false,
    text: '',
    key: '',
    onPress: () => {}
  }
  render() {
    return (
      <span style={styles.container}>
        <input type='radio' key={this.props.key} checked={this.props.isActive} onClick={this.props.onPress} />
        {
          isNN(this.props.text) &&
          <label style={styles.text}>{this.props.text}</label>
        }
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
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLOR.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLOR.PRIMARY
  },
  text: {
    marginLeft: 5
  }
};