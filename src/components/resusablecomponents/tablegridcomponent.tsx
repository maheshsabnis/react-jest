import type { IGridPorps } from "../propstypes/gridpropstype";

const TableGridComponent = (props: IGridPorps) => {
    //1. Validate the Props type, espicially the property that 
    // Causes the Rendering
    if (props.dataSource === null || props.dataSource?.length === 0 || props.dataSource === undefined)
        return (
            <div>No records</div>
        );

    const columns = Object.keys(props.dataSource?.[0]);
     
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
                        props.dataSource?.map((record, i) => (
                            <tr key={i} onClick={()=>props.rowCick?.(record)}>
                                {
                                    columns.map((col, idx) => (
                                        <td key={idx}>{record[col]}</td>
                                    ))
                                }
                                <td hidden={!props.canDelete}>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableGridComponent;