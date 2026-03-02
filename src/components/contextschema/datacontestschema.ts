import {createContext} from 'react';
import type { IGridPorps } from '../propstypes/gridpropstype';
 
// Define te Context Object

const DataContext  =createContext<IGridPorps>({
    dataSource:[],
    rowCick:(value:any)=>{}
});

export default DataContext