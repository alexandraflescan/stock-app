import { createStore } from 'redux';
import  {reducer} from '../Store/Reducers/reducer'
 

/* eslint-disable no-underscore-dangle */
export const store = createStore(reducer);
/* eslint-enable */