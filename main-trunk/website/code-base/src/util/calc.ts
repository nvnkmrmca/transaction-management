import { jsError } from "./index";

export function percentage(_partialValue: number, _totalValue: number) {
    try{
        if(_totalValue > 0){
            return (100 * _partialValue) / _totalValue;
        }else{
            return 0;
        }
    } catch (ex) {
    jsError(ex, 'calc.percentage'); 
    return 0; 
  }
 };