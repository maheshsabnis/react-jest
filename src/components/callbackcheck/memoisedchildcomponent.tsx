import React from "react";

interface IProps {
    addNewTask?:()=>void;
}

const ChildWithCallBackComponent=(props:IProps)=>{
    console.log(`Child Conponent is rendered`);
    return <button onClick={props.addNewTask}>Add New Task</button>
};

// Using React.memo to memoise the Child Component
// 
export default React.memo(ChildWithCallBackComponent);