import moment from 'moment';
import { isNN, jsError, isNNObject } from './index';
import { DEFAULT_DATE_FORMAT, DEFAULT_DATE_TIME_FORMAT } from '../constants/index';

export function toDateString(_input: any, _format?: string) {
  try {
    if(isNNObject(_input)) {
      if (typeof _input != 'string') {
        _input.toString();
      }
      if (!isNN(_format)) {
       _format = DEFAULT_DATE_FORMAT;
      }
      return moment(_input).format(_format);
    } else {
      return '';
    }
  } catch (ex) {
    jsError(ex, 'convert.toDateString'); 
    return ''; 
  }
};

export function toDateTimeString(_input: any, _format?: string) {
  try {
    return toDateString(_input, DEFAULT_DATE_TIME_FORMAT);
  } catch (ex) {
    jsError(ex, 'convert.toDateTimeString'); 
    return ''; 
  }
};