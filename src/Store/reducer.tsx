import {Action} from "../Store/actions"

export interface CountState {
  count: number
}

const initialState = {
  count: 0
}

 export const reducer = (state:CountState = initialState, action: Action) => {

    switch (action.type) {
        case 'ADD_COUNT':
           state.count +=1;
           return state;
       
        case 'REMOVE_COUNT':
           state.count -=1;
           return state;

          default:
            return state
        }
      }

    
