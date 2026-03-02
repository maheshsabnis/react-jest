import { useState } from "react";
import MouseMoveComponent from "./mousemovecomponent";
const ToggleComponent=()=>{
    const [canShow, setShow] = useState(true);

    const toggle=()=>{
        setShow(!canShow);
    }

    return (
        <div>
            <h1>
                Toggle With COmponent
            </h1>
            <button onClick={toggle}>
                {canShow? 'Hide': 'Show'}
            </button>
            {
            canShow && <MouseMoveComponent/>
            }
        </div>
    );
};

export default ToggleComponent;