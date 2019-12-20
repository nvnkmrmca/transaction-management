import { COLOR } from '../constants';

export const styles = {
  mListCnr: {
    borderColor: COLOR.SECONDARY, 
    borderWidth: 1,
    height: '50%'
  },
  mListActiveRow: {
    padding: 3,
    backgroundColor: COLOR.SECONDARY,
    color: COLOR.FONT_COLOR3,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.HR_COLOR,
    'border-bottom-style': 'solid',
    width: '100%',
    marginBottom: '1px'
  },
  mListRow: {
    padding: 3,
    borderBottomWidth: 1,
    borderBottomColor: COLOR.HR_COLOR,
    'border-bottom-style': 'solid',
    width: '100%',
    marginBottom: '1px'
  }
};