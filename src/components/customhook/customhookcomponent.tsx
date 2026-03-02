import { useFetcher } from "./usfetcherhook";

const CustomHookComponent=()=>{
    const finalState = useFetcher("https://coreapiforreact-aed8a3azbaeba6ep.eastus-01.azurewebsites.net/api/CategoryRead");    

    return (
        <div>
            <h1>Using The Custom Hook</h1>
            {
                JSON.stringify(finalState)
            }
        </div>
    );
};



export default CustomHookComponent;