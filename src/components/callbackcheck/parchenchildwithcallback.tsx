import { useCallback, useState } from "react";
import ChildWithCallBackComponent from './memoisedchildcomponent';
 

const ParentWithCallBackComponent=()=>{
  const [tasks, setTasks] = useState<Array<string>>([]); // State used in Parent but its value will be receivced from Child
  const [counter, setCounter] = useState<number>(0); // State used with the Parent
  // The Parent Function that will be dispatced by the child
  const addTask = useCallback(()=>{
    // prevTasks , is the memoized value, if this change then only the parent cild will be re-rendered
      setTasks((prevTasks)=>[...prevTasks, `New Task is Added: ${tasks.length + 1}`]);
  },[tasks]);

  return (
    <div>
        <h3>Adding Tasks with Current Length as {tasks.length}</h3>
        <button onClick={()=>setCounter(counter + 1)}>Increament Counter</button>
        <strong>
           Latest Counter Value: {counter}
        </strong>
         <ul>
        {
                tasks.map((t,i)=>(
                    <li key={i}>{t}</li>
                ))
           
        }
         </ul>
        <ChildWithCallBackComponent addNewTask={addTask}></ChildWithCallBackComponent>
    </div>
  );
};

 
export default ParentWithCallBackComponent;