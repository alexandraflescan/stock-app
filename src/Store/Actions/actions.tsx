export interface Action {
  type: string,
  payload: any
}

export const addCount = () => ({
  type: 'ADD_COUNT'
});

export const removeCount = () => ({
  type: 'REMOVE_COUNT'
});


//start company lookup details
export const addCompany = (payload:any) => ({
  type: 'ADD_COMPANY',
  payload: payload
});

export const updatePeriod = (payload:any) => ({
  type: 'UPDATE_PERIOD',
  payload: payload
});

export const addDataType = (payload:any) => ({
  type: 'ADD_DATATYPE',
  payload: payload
});


//end company lookup details