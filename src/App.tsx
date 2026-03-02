
interface IProps {
  data:string;
}

// The React Compiler for the current component does need the IProps
function App(props:IProps) {
  
  return (
     <div>
        <h1>The First Component</h1>
        <div>
          <strong>
             {props.data}
          </strong>
        </div>
     </div>
  )
}

export default App
