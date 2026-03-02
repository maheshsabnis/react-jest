import { useState } from "react";
import { Category } from "../models/category";
import DataContext from "./contextschema/datacontestschema";
import TableGridContextComponent from "./resusablecomponents/tablegridcontextcomponent";
//import TableGridComponent from "./resusablecomponents/tablegridcomponent";
const CategoryStateComponent=()=>{
    const [category, setCategory]  = useState<Category>(new Category(0,'','',0)); 
    const [categories, setCategories] = useState<Category[]>([]);

    const save=()=>{
        setCategories([...categories, category])        
    }
    const clear=()=>{
        setCategory(new Category(0,'','',0));
    }
 

    return (
        <div>
            <h2>Category Form Object</h2>
            <div>
                <label htmlFor="">Category Record Id</label>  
                <input placeholder="Enter Category record is" type="number"
                value={category.CategoryRecordId}
                onChange={(evt)=>setCategory({...category, CategoryRecordId:parseInt(evt.target.value)})}
                />
            </div>
             <div>
                <label htmlFor="">Category  Id</label>  
                <input placeholder="Enter  record is" type="text"
                value={category.CategoryId}
                onChange={(evt)=>setCategory({...category, CategoryId:evt.target.value})}
                />
            </div>
             <div>
                <label htmlFor="">Category Name</label>  
                <input placeholder="Enter Category Name" type="text"
                value={category.CategoryName}
                onChange={(evt)=>setCategory({...category, CategoryName:evt.target.value})}
                />
            </div>
             <div>
                <label htmlFor="">Base Price</label>  
                <input placeholder="Enter Category record is" type="number"
                 value={category.BasePrice}
                onChange={(evt)=>setCategory({...category, BasePrice:parseInt(evt.target.value)})}
                />
            </div>
            <div>
                <button onClick={save}>Add</button>
                <button onClick={clear}>Clear</button>
            </div>
            <br /> 
            {/* <TableGridComponent dataSource={categories} rowCick={setCategory}
             canDelete={true}
            /> */}
            <DataContext.Provider value={{dataSource:categories, rowCick:setCategory}}>
                <TableGridContextComponent/>
            </DataContext.Provider>
             
        </div>
    );

};



export default CategoryStateComponent;