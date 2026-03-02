import {useState,useEffect, type MouseEvent} from 'react';

const MouseMoveComponent=()=>{
  const [x,setX] = useState<number>(0);
  const [y,setY] = useState<number>(0);

  const mouseMoveHandler=(event:MouseEvent)=>{
    setX(event.clientX);
    setY(event.clientY);
    console.log(`X-position: ${x} and Y-Position: ${y}`);
  }

  useEffect(()=>{
    // register the global event
     window.addEventListener('mousemove', mouseMoveHandler);
     return()=>{
        window.removeEventListener('mousemove', mouseMoveHandler);
     }
  },[]);



  return(
    <div>
        <h4>The Component with Mouse Move Event</h4>
        <div style={{height:'200px', width:'300px', border:'2px solid black'}}>
            <h5>Mouse Positions:</h5>
            <p>
                <strong>
                    x: {x}
                </strong>
            </p>
            <p>
                <strong>
                    y: {y}
                </strong>
            </p>
        </div>
    </div>
  );
};


export default MouseMoveComponent;