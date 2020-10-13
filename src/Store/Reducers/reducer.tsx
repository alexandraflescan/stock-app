import { RangeModifier } from "react-day-picker";
import {Action} from "../Actions/actions";
//import { createReducer } from '@reduxjs/toolkit'


export interface CountState {
  count: number
}

export interface IAppState {
  lookUpDetails: {
    companyList: [],
    timeRange: RangeModifier,
    dataTypesList: []
  }
  //...
}
// const [chart, setChart] = useState([] as any);
// const [period, setPeriod] = useState(getInitialState());
// const [dataType, setDataType] = useState([] as any);
const initialState:IAppState = {
  lookUpDetails: {
    companyList: [],
    timeRange: getInitialState(),
    dataTypesList: []
  }
}

 export const reducer = (state:IAppState=initialState, action: Action) => {

    switch (action.type) {
      //start chart lookup details
        case "ADD_COMPANY":
        return{
          ...state,
          lookUpDetails: {
            ...state.lookUpDetails,
            companyList: action.payload
         
          }
        }
         
         //return  state.lookUpDetails.companyList = action.payload
        case "UPDATE_PERIOD":
          return {
            ...state,
            lookUpDetails: {
              ...state.lookUpDetails,
               timeRange: action.payload 
          }
          }
        case "ADD_DATATYPE":
          return{
            ...state,
            lookUpDetails: {
              ...state.lookUpDetails,
              dataTypesList: action.payload
            }
          }
          

      //end chart lookup details
          default:
            return state
        }
      }

    


      function getInitialState() {
        return {
          from: new Date(),
          to: new Date()
        };
      }
      