# npm create vite@latest -- --template react-ts 
# React Objetc Model
- react
  - Base object Model
    - The 'Component'
      - An Autonomous Object that has:
        - UI
          - Interatcion for Acceting ans SHowing Data
        - Data Properties
          - Used to show data to user on UI as well as accept data from user
        - Behavior
          - Methods
            - Data Processing
            - UI Behavioral Management
    - Its is used for UI reusability with Data, and Behavior
- react-dom
  - Object Model to manage HTML Rendering for the UI and Mounting it in Browser
    - Responsible to 'MOUNT' the component on Browser by creating a HTML element e.g. <div> as 'root'

# React features for Application Development
- Create a Component   
  - Stateless Component
    - No data properties, only UI
  - Stateful component
    - Used for Line-of-Business (LOB) Apps
    - Uses the state (data) for handling UI updates
- Component Object
  - It is Class (not recommended from 16.8 onwards)
````typescript
class MyComponent extends Component {
  constructor(p,s){
    super(p)
  }
  render() {
    return {
      <div></div>
    }
  }
}
````
  - It is Function that returns the HTML DOM
    - Has 'state'
    - Constant function expressions    
    - Funcational Component  
````typescript
function MyComponent(){
  function MyMethod(){}
  return {
    <div></div>
  }
}

OR
const MyComponent=()=>{
  const MyLogic=()=>{

  }
   return {
    <div></div>
  }
}
OR
const MyCompoonent=()=>(
  <div></div>
)


````
# React's Features for App Dev
- JSX / TSX
  - JavaScript XML / TypeScript XML extensions
    - Validate the HTML like XML Tag Rules
    - Each HTML element in funcational is Compiled post syntax validations and its Properties and events are processed for Data Binding and Method (functional) invokcations explicitily
- props
  - An immutable object that is used to communcate data adn events across components
  obj = [...obj, x]
  - This is live for all Components in a COmponent Tree of the Currenty mounted react applications
- state
  - A Component Specific Mutable object
  - USed within the component
  - Used for managing data based Rendering of the component's UI
  - When the component is unmounted, the state will be lost
- React uses a Virtual DOM(?)
  - Each DOM Element has a Unique Identifier
  - If the DOM is generated dynamically based on Collections, the each DOM MUST be allocated with a unique Key (why?) 


# React is a Library for Interactive UI  
- The Component
  - State
    - Component's own MUTABLE State, that is bound to UI for UI Rendering
    - The IMMUTABLE State that is received from Parent for Rendering
  - Behavior
    - Method for Processing and Causing State updates and Hence the rendering
  - UI
    - TneInteractive Segment of the C0mponent that bindes with state and behavior
- Uni-Directional Data Flow, means from State-to-UI, then Evenis is Raise on UI. UI-raise event-to-Behavior-to-State-to-UI    

# Statefull Component as Major Feature of React
- The concept of Hooks, 16.8+
  - Process of Linking 2 Objects
    - Object 1: UI Element and its Writable Property
      - value, hidden, disable, className, style, etc.
    - The State with 'Dispatch Action' that causes teh State Updates

- The Hook is the Function that will be invoked based on events, mounting (?), callback (?) for controlling Behavior of the Component.
  - This is always invoked at Component Level, cannot be invoked inside other function in the component
  - Except if we create the Custom Hook, the standard hok can be invoked in the custom Hook
- Basic Hooks
  - useState()
    - Declare state varioable and provide function aka dispatch action to update it
````typescript
  const [x,setX] = useState<Number>(0);
  // x: the state property
  // setX: the action that will be dispatched to update the state
  // Number: the Type of x
  // 0: The Initial value of x when the Compoen tis first rendered
````
  - useContext()
    - Used to define a state to share data across component when there exist parent child relationship across them
  - useEffect()
    - Hok to handle side effect that causes teh component to work flexibly w/o watign for long running complex logic to execute e.g. HTTP calls, DOM Updates, Global Events Subscription
- Additional Hooks
  - useReducer()
    - A Hook to manage the complex logic that causes state update and hence impact rendering.
  - useRef()
    - The hook that stores the state mutable values those constants across all rendering of the same component and hence thois does not need re--rendering (regenration of UI)
  - useCallback()
  - useMemo()
- Advanced Hooks
  - useTranstion()
  - useLayoutEffect()
  - useImperativeHandle()
  - useSyncExternalStore()
  - useInsertionEffect()
  - useId()

# Use of Components
- Basic Building Block for React
- Uses of components
  - Use for Composable UI
    - This can be used to use other Children components for Complex UI
  - Use the Component for Re-Usability  
    - Create Component once and use it inside other components as on needs
      - Plan the UI
      - Plan the Data
      - Plan for the Behavior
      - Plan for the Data Communication
        - Parent to Child
        - Child back to parent
# Use of the Context  
- React.Context
  - Mechanism of sharing state across all components usig the Globally define data properties
  - Eliminates need for the props  
- React.createContext()
  - build in API in React
    - Define the Schema for state globally and then let the component decide to which component the data is to be sent
    - User Stories
        - We want to sahe a common theme across compnents based on the decision of the parent
        - We want to make sute that the authentication ifnromation is to be shared to a specific set of components
    - useContext() hook, this is used by the Consumer component to Subscribe to the Context to read the data
````typescript
const context = React.CreateContext<IType>();

`````
  - the IType, is te Schema that has the DataMember and the Behaviour for data communciation
  - context
    - Provider
      - the 'value' property
        - A complex Object tha is used by the Provider compoent i.e. ParentComponent to pass data to specific Child 
    - Consumer
      - Implicitly used by using the 'useContext()' hook by the Child Component to read data from the Context

# Controlling the Lifecycle of the Component
- the 'useEffect()' hook
  - A function object that is responsible to perform the following:
    - Handles an execution of the Long-Running Side Effect Code, that causes the DOM Rendering Delay
      - HTTP Calls
      - Any code that causes the State Update delay
        - Reading Data from Local Browser's Storage
        - Reading data from the State Management Enginees e.g. Redux Store
    - USes to Subscibe to the Global Events
    - Provides facility to perform an execution of Clean Up Code
      - Unsubscribe the Events Handlers
      - Release the Promise Objects
````typescript
 useEffect(()=>{
  // Execute the Logic that has Side-Effect
  return ()=>{
    // The Logic That performs Clean-Up Operations
  }
 },[DEPENDENCY-ARRAY]);

`````
  - DEPENDENCY-ARRAY, state properties those are monitored for Update so that the UI will receive the latest state data for rendering and hence the useEffect() will complete its execution
  - useEffect()
    - componentDidMount()
    - componentWillUnMount()
- useEffect() + axios for Data Fetch and Performing Read/Write Opertaions
  - Interaction to Server for Each Request
- TanStackQuery
  - Managing the Server State
  - Fetching, Caching, Synchronization as well as the Update the data
    - Fetch Object, a Pure ES 6 Object for HTTP Calls, Promise based


- useReducer()
  - Where useState() is an easy way foir updating local state on UI, the useRedeucer() is recommendated to be used when the data is to be processed before updating in the state and notified to UI for rendering     
- Comparision

- state updates
  - useState()
    - const [state, setState] = useState(initialState)
  - useReducer()
    - const [state, dispatch] = useReducer(reducer, intialState)
      - dispatch, a JS / TS dispatcher object, that is used to listen to an event and accoringly dispatch/execute the reducer function   
      - reducer function, a JS PURE FUNCTION
        - Input and output are same
        - Function with 2 Parameters
            - Parameter 1: the Initial State
            - Parameter 2: The action, the event that is raised
              - action has two return values
                - Value 1: the action 'type'
                    - e.g. CALL_INITIATED, CALL_IN_PROGRESS, CALL_SUCCCES
                - Value 2: The 'payload'
                    - The data that is returned / generated when the action is dispatched    
        - The Predicatble data is always generated
          - The Complex Logic is easy to Test Before the state ia actually updated (unit test)  

- Create a Custom Hook          
  - A reusable hook that encapsulate hight-complex time bound logic that is needed across multiple components
  - A JavaScript / TypeScript function
    - start with word 'useXXXXX()'

- useReducer() Implementation    
  - Define the Initial State
    - A Complex object that has one-or-more proeprties those represents the state
    - This state is notify to the Component for rendering of the UI

- The 'reducer fucntion'
  - A Pure JavaScript Function with 2 Parameters
    - Parameter 1: The 'state', this will be updated based on the action that is dispatched
    - Parameter 2: The 'action', this will decide how the start will be updated based on the action received from the UI
    
- The Component
  - The UI that uses the 'useReducer()' and then pass the dispatched action to the reducer    

- What if the Complex State updates with the useReducer() is needed by multiple  components?
  - Create a Custom Hook and decouple the Component from dispatching actions directly

# The useCallback() hook
- When the parent pass the props to child, the child is rendered but even when the parent is not passing props to child, the child will be re-rendered when the state in parent is mutated
  - solution: 
    - use the 'useCallback()' hook, that uses the 'Rect.memo()' that prevents teh re-rendering of the child if the props are 'shallowly equal' (means no changes in props object) even when the parent has any event raised that mutate its own state  

# useMemo()
  - React.memo(), deals with the component's re-rendering based on the state-changes, received from the parent or the local statre changes.
    - React.memo() will cach the previous rendering of the component and this will be invalidated only when the state changes are received. This is impact the performance on improvisation.
  - useMemo()
    - Memoized the computed value to avoid expensive recalculation on the complex data
      - E.g.
        - AN array with 50 records
        - The FIltering on COllection is an expensive operation(why?)
          - in JS techinoologies
            - we use, filter(), map(), foreach() method for data extration from collection
            - We may need separete method from above for data extraction
            - but using the useMemo(), we can Memoize the previous calculated data(i.e. Result) and delivered to DOM, here DOM will re-render, if the collection does change the Memoized data will also remain unchanges and hence the DOM won't be re-ender because it is still using the memoized value 
# useRef()
  - 
# The TansStack Query (Formaly known as the Rect-Query)
- Powerful asynchronous state management, server-state utilities and data fetching engine, thet perform the following:
  - Maintain the State of the received data from the server and perform following operations on it
    - Direct Query
    - Mutation based on server's response (Write Operation dtaa update)
    - Data Cache Invalidation
    - Fast Refresh of the UI when the cache is re-freshed / invalidated   
    - We can use it will JS/TS Libs and frameworks that needs effecting Asyc Data Handling from the server
      - Angular
      - React
      - Vue
      - and many more......

  - npm install @tanstack/react-query
  - THis is usefule for apps
    - Time bound data updates
    - App those needs effective - UX for handling data updates e.g. Change the Table /  List whene the data is changes
  - QueryClient
    -  Class used to make the React App, or specific component in React App as the Cleint where the data will be cached
  - QueryClientPovider
    - AN Instruction to React's DOM that the Application is useing the Cached data that will be used for DOM Refresh   
  - useQuery()
    - A Hook for Managing the Query using ghe following properties:
      - data
        - The data that is received from the server as a response form the query
      - error
        - The Error Object if the query failed
      - isLoading
        - Indicator stating that the execution is taking place
      - isError
        - An error that is occured, a boolean value, an action to be taken when the isError is true
    - eventProperties
      - queryKey
        - The Cache Key
        - All the data will be identifed based on the Cache Key
      - queryFn
        - The async operation that is initiated to make HTTP calls i.e. async calls
      - staleTime
        - The Lifetime for the Cache, once this is elapsed the cache is invalidated
  - useMutation()
    - A hook used for Write Operations
    - event Properties
      - mutation: Initialte the async operation for Write
      - onMutate
        - A callback function that is used to handle the sliding expiration for a perticular record in cache when the single record to be invalidated in cache
      - onSuccess
        - Invalidate complete Cache
      - onFailed

# Forms
- Validations
  - Standard Validaiton, HTML 5
    - requeried, pattern, min, max, minlenght, maxlength, etc.
- Libs / Frwk
  - Form is a Unit that has Model and State
    - Create a Binding between Form UI and Form Data aka Model
    - Decouple the Model Validation from UI Validation
- React Validation Libraries
  - react-hook-form (Fast for Performance)
    - useForm() hook, that accepts a Model State and provide decoupled validation on UI
    - Uses the Standard HTML UI Elements and extend it for data validations
  - Formik (Uses Custom Component, it has Redering time, so slow compare to react-hook-form )
    - Separate Library for Validations
    - Components
      - Formik
      - Form
      - UI Element Components
    - useFormik() Hook
      - Use the Standard HTML Element for Model Validations
  - Yup
    - Library for Defining Valudation Rules on Models
  - Zod
    - Library for Defining Validation Rules on Models

- Industry Standard Validations
  - mandatoiry entry
  - regular expression
  - range of values
  - min and max length
  - Data Type Inferance for Valdiations
    - Form Model
      - Read the propeties and understand its data type
      - based on the data type the validations rules are applied
        - new FormControl(person.PersonName, Validations.validate[])
      - The Type is detected and validations e.g. Async, custom, value-based vallidations must be defined (set) and applied (executed)   
  - Formik + Yup
    - Formik for Components with Data Validation  Capacilities
      - Custom components for valdiation takes a toll on performance
    - Yup, a library for defining Data Validation Rules on Formik (as well as react forms)
      - Lightweight
      - No type inferance
        - Manually set types for model properties and then apply validations
        - No suport for default validation messages
  - react-hook-form    
    - Lightweight
    - Especially designed for React Forms
    - The Input-state isolation for invalidations that minimize the re-rendering, cause for performance
    - Works with Native HTML elements, no custom components like Formik
    - Build-Invalidation(HTML) as well as external library support for validation as well as resolvers for the data valdiations
    - Reduced Bundle size, no add-on overhead for React Apps 
    - the 'useForm()' hook
      - register
        - register model properties on UI elements for validation purpose
      - handleSubmit
        - handle submit event
      - formState
        - error and isValid
      - mode:'onBlur' | 'onChange'
      - reValidateMode: 'onBlur' | 'onChange'
      - resolver: Use the bridge for third-party library tahtbhas validation rules
  - zod
    - TypeScript-First schema validation library
    - It has its own schema definition to define rules on data types like:
        - string, number, object, array, etc.
    - The DataType of objects's properties will be automatically inferred (understood + mapped)
    - Validation and Parsing on values of properties when data is entred in it and returns stringly type result as valdiations
      - e.g. Email must be valid expression
    - The native support for Async valdiations where the API call is required 
  - @hookform/resolvers
    - Bridge between react-hook-form and external data validation libreries e.g. zod   