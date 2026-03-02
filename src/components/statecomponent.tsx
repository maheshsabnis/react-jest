import { useState } from "react";

const StateComponent=()=>{
    // 1. Define State, setX, setY, setResult are dispatch actions to mutate the state
    const [x, setX] = useState<number>(0);
    const [y, setY] = useState<number>(0);
    const [result, setResult] = useState<number>(0);
    const [selData, setSelData] = useState<{name:string, agency:string}>({name:"", agency:""});

    const data = ["James Bond", "Jack Reacher", "Jack Ryan", "Indiana Jones", "Simon Templer", "Ethan Hunt", "Jason Bourn"];

    const agents = [
        {name:"James Bond", agency:"MI-16"},
        {name:"Jack Reacher", agency:"Military Police"},
        {name:"Jack Ryan", agency:"CIA"},
        {name:"Indiana Jones", agency:"CIA"},
        {name:"Simon Templer", agency:"Crime Detection"},
        {name:"Ethan Hunt", agency:"IMF"},
        {name:"Jason Bourn", agency:"CIA Black-Ops"} 
    ];
    const columns = Object.keys(agents[0]);
    // 2. The Component Specific Behavior function
    const add=()=>{
        setResult(x + y);
    }
    const clear=()=>{
        setX(0);
        setY(0);
        setResult(0);
    }

    const selectedRow=(agent:any)=>{
        setSelData(agent);
    }

    // 3. Define UI and bind the state, and also subscribe to UI events to
    // perform State Mutation
    // Syntax:
    // event={(event_object)=> DISPATCH_ACTION(event_object.target.value) }
    return  (
        <div>
            <h2>The State Component</h2>
            <div>
                <label htmlFor="x">Enter X</label>
                <input type="text" placeholder="Enter Value" value={x}
                 onChange={(evt)=>setX(parseInt(evt.target.value))}
                />
            </div>
            <div>
                <label htmlFor="">Enter Y</label>
                <input type="text" placeholder="Enter Value" value={y}
                onChange={(evt)=>setY(parseInt(evt.target.value))}
                />
            </div>
            <div>
                <label htmlFor="">Result</label>
                <input type="text" placeholder="The Result" value={result} readOnly/>
            </div>
            <div>
               <button onClick={add}>Add</button>
               <button onClick={clear}>Clear</button>
            </div>
            <br/>
            <div>
                <strong>List of Agents</strong>
                <ul>
                    {
                        data.map((agent,index)=>(
                            <li key={index}>
                                <strong>{agent}</strong>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <br/>
            <div>
                <strong>Dynamic Table</strong>
                <div>
                    <strong>
                        Selected Agent: {selData.name} and {selData.agency}
                    </strong>
                </div>
                <table>
                   <thead>
                       <tr>
                         {
                            columns.map((col,idx)=>(
                                <th key={idx}>{col}</th>
                            ))
                         }
                       </tr> 
                   </thead>
                   <tbody>
                    {
                         agents.map((spy, i)=>(
                            <tr key={i} onClick={()=>selectedRow(spy)}>
                                {
                                    columns.map((col,idx)=>(
                                        <td key={idx}>{spy[col]}</td>
                                    )) 
                                }
                            </tr>
                         ))
                    }
                   </tbody>
                </table>        
            </div>
          
        </div>
    )
};


export default StateComponent;