import type { Category } from "../../models/category";

// 1. Define the initialState schema
export interface IApplicationState {
    data?: Category[]; // the data that woill be displayed in the grid
    loading:boolean; // flag to notify if the data is still loading
    errorMessage?: string; // the error message if any error occurs during data fetch
}

// 1.a. provide an inital values to state
export const initialState:IApplicationState = {
    data: new Array<Category>(),
    loading : false,
    errorMessage: ''
}


// 2. The Reducer Function
// the reducer function read the 'type' that is retuirned by the action
// what is type: A Constant that represents which action is dispatched from UI
// based on the type the state will be updated by reducer
export const reducer=(state:IApplicationState, actions:any)=>{
    switch(actions.type) {
        case 'DATA_FETCH_STARTED': //<-- No change in the state
            return {...state, loading:'call initialted', errorMessage:''};
        case 'DATA_FETCH_SUCCESS': // <-- State will be changed based on the 'payload' returned by action
            actions.payload.Records.sort((a:any,b:any)=>a.CategoryRecordId-b.CategoryRecordId);
            return {...state, data:actions.payload.Records, loading:'data is fetched successfully', errorMessage:''} ;
        case 'DATA_FETCH_FAILED': // <-- State won't be changed by the errorMessage will have value as payload from the action
            return {...state, loading:'call is failed', errorMessage: actions.payload};
        default:
            return {...state};        
    }
};