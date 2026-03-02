import { useEffect,useReducer } from "react";
import TableGridComponent from "../resusablecomponents/tablegridcomponent";
import {initialState, reducer} from './stateandreducerfunction';
const ReducerComponent=()=>{
    // tell component that the reducer will be used to listen to dispatched actions  

    const [state, dispatch] = useReducer(reducer, initialState);


    // we will displatch events to fecth data based on the Component Mounting
    useEffect(()=>{
        const fetchData = async()=> {
            dispatch({type:'DATA_FETCH_STARTED'});
            try {
                 const response = await fetch("https://coreapiforreact-aed8a3azbaeba6ep.eastus-01.azurewebsites.net/api/CategoryRead")  ;
                 if(!response.ok) {
                    throw new Error("HTTP CALL IS FAILED");
                 } 
                 const result = await response.json();
                 dispatch({type:'DATA_FETCH_SUCCESS', payload:result});
            }catch(error:any){
                dispatch({type:'DATA_FETCH_FAILED', payload: `Error Occured: ${error.message}`});    
            }
        }
        fetchData();
    },[]);

    // Let's render based on the State
    if(state.loading) 
        return (
        <div>
             <p><strong> {state.loading}</strong> </p> 
             <div>
            <h3>The Comoponent that demonstrates the state updates using the 'useReducer'</h3>
            <TableGridComponent dataSource={state.data}></TableGridComponent>
        </div>
        </div>)
       
    if(state.errorMessage) return <p><strong> {state.errorMessage} </strong></p> 
  
}
export default ReducerComponent;    