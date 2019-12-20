import * as React from 'react';
import { View, Text } from '../common/elements';
import { COLOR } from '../../constants';

interface IProps {
}

interface IState{
};

export default class Index extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    };

    componentWillUnmount() {};

    render() {
    return (
            <View style={{flex: 1, backgroundColor: COLOR.INVERSE, padding: 40}}>
                <Text>Page not found!!!</Text>
            </View>
    );
  }
};