import { COLOR } from '../constants';

export const styles = {
  container: {
    flex: 1, 
    // flexDirection: 'column',
    width: '100%',
    // backgroundColor: "#CCCCCC",
    padding: 10,
    marginBottom: 10,
    borderBottomColor: COLOR.HR_COLOR,
    borderBottomWidth: 1,
    'border-bottom-style': 'solid'
  }, 
  row: {
    flex: 1,
    // flexDirection: 'row'
  }, 
  card: {
    flex: 1, 
    // flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#DDDDDD', 
    borderRadius: 10,
    padding: 5,
    margin: 7
  },
  inner: {
    // flex: 1, 
    // flexDirection: 'column', 
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
    // width: '150px',
    margin: 5,
    padding: '0px 10px'
    // float: 'left'
  },
  txt:{
    flex: 1, 
    // justifyContent: 'center', 
    // textAlign: 'center', 
    paddingTop: 7,
    paddingBottom: 5,
    fontSize: 14
  },
  img:{
    width: 25,
    height: 25,
    margin: 5
  }
};
  