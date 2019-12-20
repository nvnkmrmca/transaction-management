import * as React from 'react';
import { Text, View } from '../common/elements';
import { COLOR } from '../../constants';
import { isNN } from '../../util/index';

interface IProps {
  data: Array<object>,
  message: string
};

interface IState{
};

export default class CustomList extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
    }
  };

  componentWillUnmount() {};
  
  render() {
      return(
        isNN(this.props.data) ?
        this.props.data.map((d: any, i: number) => {
          return(
            <View style={{flex: 1, borderBottomWidth: 1, borderBottomColor: COLOR.HR_COLOR, borderBottomStyle: 'solid', paddingBottom: 3}}>
              <View>
                <Text key={i} style={{flex: 1, fontWeight: 'bold'}}>
                  {d.title}
                </Text>
              </View>
              <View>
                <Text key={i} style={{flex: 1}}>
                  {d.description}
                </Text>
              </View>
            </View>
          )
        })
        :
        <Text>{this.props.message}</Text>          
      );
  }
};