import { COLOR } from '../constants';

export const styles = {
    container: {
    },
    head: {
      flexDirection: 'row',
      alignContent: 'flex-start',
      backgroundColor: COLOR.PRIMARY,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      paddingBottom: 5
    },
    title: {
      flex: 15,
      alignSelf: 'flex-start',
      width: 'auto',
      'font-weight': 'bold',
      fontSize: 20,
      color: COLOR.FONT_COLOR3
    },
    close: {
      flex: 1,
      alignSelf: 'flex-end',
      marginBottom: 5
    },
    row: {
      // flexDirection: 'row',
      marginTop: 3,
      marginBottom: 3,
      paddingTop: 5,
      paddingBottom: 5
    },
    ele: {
      flex: 1,
      width: '100%'
    },
    radio: {
      borderColor: COLOR.HR_COLOR,
      borderWidth: 1,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 5,
      paddingRight: 5,
      display: 'inline'
    },
    radioText: {
      // 'font-weight': 'bold',
      // color: COLOR.HR_COLOR
    },
    radioActive: {
      backgroundColor: COLOR.PRIMARY,
      borderColor: COLOR.PRIMARY,
      borderWidth: 1,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 5,
      paddingRight: 5,
      display: 'inline'
    },
    radioActiveText: {
      // 'font-weight': 'bold',
      color: COLOR.FONT_COLOR3
    },
    saveBtn: {
      marginTop: 5,
      marginBottom: 3,
      paddingTop: 5,
      paddingBottom: 5
    }
  };