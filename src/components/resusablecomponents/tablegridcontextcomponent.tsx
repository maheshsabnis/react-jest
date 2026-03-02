import {useContext} from 'react';
import DataContext from '../contextschema/datacontestschema';
const TableGridContextComponent = () => {
    // Subscribe to the DataContext Object to read data from it
    const context = useContext(DataContext); 
    // Extract Properties and Behavior from the Context
    const dataSource = context.dataSource;
    const rowClick = context.rowCick;


    //1. Validate the Props type, espicially the property that 
    // Causes the Rendering
    if (dataSource === null || dataSource?.length === 0)
        return (
            <div>No records</div>
        );

    const columns = Object.keys(dataSource?.[0]);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {
                            columns.map((col, idx) => (
                                <th key={idx}>{col}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        dataSource?.map((record, i) => (
                            <tr key={i} onClick={()=>rowClick?.(record)}>
                                {
                                    columns.map((col, idx) => (
                                        <td key={idx}>{record[col]}</td>
                                    ))
                                }
                                 
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableGridContextComponent;