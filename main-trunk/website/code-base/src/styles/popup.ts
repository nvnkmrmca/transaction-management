import { COLOR } from '../constants';

export const styles = {
    container: {
      // backgroundColor: COLOR.MODAL_BG,
      height: '80%',
      marginTop: 30,
      marginBottom: 25,
      marginLeft: 15,
      marginRight: 15
    },
    head: {
      // padding: 7,
      // flexDirection: 'row'
      alignContent: 'center'
    },
    title: {
      flex: 1,
      // flexDirection: 'row',
      alignContent: 'center',
      color: COLOR.FONT_COLOR2
    },
    close: {
      width: 20,
      flex: 1,
      // flexDirection: 'row',
      justifyContent: 'flex-end',
      alignContent: 'flex-end',
      alignSelf: 'flex-end'
    },
    content: {
      // padding: 15
    }
  };