import { useState } from "react";

interface IProps {
    addNewTask?:()=>void;
}


const ParentComponent=()=>{
  const [tasks, setTasks] = useState<Array<string>>([]); // State used in Parent but its value will be receivced from Child
  const [counter, setCounter] = useState<number>(0); // State used with the Parent
  // The Parent Function that will be dispatced by the child
  const addTask =()=>{
    setTasks([...tasks, `New Task ${tasks.length + 1}`]);
  }

  return (
    <div>
        <h3>Adding Tasks with Current Length as {tasks.length}</h3>
        <button onClick={()=>setCounter(counter + 1)}>Increament Counter</button>
         <ul>
        {
                tasks.map((t,i)=>(
                    <li key={i}>{t}</li>
                ))
           
        }
         </ul>
        <ChildComponent addNewTask={addTask}></ChildComponent>
    </div>
  );
};


const ChildComponent=(props:IProps)=>{
    console.log(`Child Conponent is rendered`);
    return <button onClick={props.addNewTask}>Add New Task</button>
};



export default ParentComponent;