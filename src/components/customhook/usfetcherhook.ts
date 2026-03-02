import { useEffect,useReducer } from "react";
import { initialState, reducer } from "../usereducercomponent/stateandreducerfunction";

// create a custom hook
export const useFetcher =(url:string)=>{
    const [finalState,dispatch] = useReducer(reducer, initialState);
     useEffect(()=>{
        const fetchData = async()=> {
            dispatch({type:'DATA_FETCH_STARTED'});
            try {
                 const response = await fetch(url)  ;
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

    return finalState;
}