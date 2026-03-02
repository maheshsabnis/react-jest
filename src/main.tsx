import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import  ProductSearchWithoutMemo from './components/usememocheck/usememocomponent'
// import ParentWithCallBackComponent from './components/callbackcheck/parchenchildwithcallback'
//import ProductSearchWithoutMemo from './components/usememocheck/usememocomponent'
// import ProductSearchWithUseMemo from './components/usememocheck/withusememocomponent'
//import ParentComponent from './components/callbackcheck/parchenchildwithoutcallback'
//import CustomHookComponent from './components/customhook/customhookcomponent'
//import ReducerComponent from './components/usereducercomponent/reducercomponent'
//import CategoryStateHttpComponent from './components/categirystatehttpcomponent'
  // import ToggleComponent from './components/lifecycle/togglecomponent'
//import { TanstackCategoryCrud } from './components/tanstackexample'
// import MouseMoveComponent from './components/lifecycle/mousemovecomponent'
//import CategoryStateComponent from './components/categirystatecomponent'
// import App from './App.tsx'

import CustomerFormComponent from './components/usefromhookvalidations/customformcomponent'

// import CategoryStateTanstackQueryComponent from './components/tanstackqueryexample/categorystatetanstackcomponent'

// import { QueryClient,QueryClientProvider } from '@tanstack/react-query'


// 1. Define the QueryClient object
// IN the current scope of the react application, this object
// will look for the cache data using 'useQuery()' as well as the
// mutation using 'useMutation()' and based on the cacheKey
// the dtaa will be provided to React Component

// const queryClient = new QueryClient();

// import StateComponent from './components/statecomponent'
// Locate a HTML element from index.html that is having 'id' as
// 'root' and in that HTMl element MOUNT the App component
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App data={"Hello from main.tsx"} /> */}
    {/* <StateComponent/> */}
    {/* <CategoryStateComponent/> */}
    {/* <MouseMoveComponent/> */}
    {/* <TanstackCategoryCrud /> */}
     {/* keep ToggleComponent available for testing: */}
      {/* <ToggleComponent/>  */}
      {/* <CategoryStateHttpComponent/> */}
      {/* <ReducerComponent/> */}
      {/* <CustomHookComponent/> */}
      {/* <ParentComponent/> */}
    {/* <ParentWithCallBackComponent/> */}
    {/* <ProductSearchWithoutMemo/> */}
    {/* <ProductSearchWithUseMemo/> */}
    {/* The TanStackQuery Object Model, that will take the State from Cache and provide to
      the Component
    */}
    {/* <QueryClientProvider  client={queryClient}>
       <CategoryStateTanstackQueryComponent/>
    </QueryClientProvider> */}
    <CustomerFormComponent/>
  </StrictMode>,
)
