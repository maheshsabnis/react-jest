import { useState,useEffect } from "react";
import { Category } from "../models/category";
import DataContext from "./contextschema/datacontestschema";
import TableGridContextComponent from "./resusablecomponents/tablegridcontextcomponent";
import { CategoryHttpService } from "../services/categoryhttpservice";
const CategoryStateHttpComponent=()=>{
    const [category, setCategory]  = useState<Category>(new Category(0,'','',0)); 
    const [categories, setCategories] = useState<Category[]>([]);

    const serv = new CategoryHttpService();

    // using useEffect, make async call to perform data fetch
    // This will be handling sideeffected and will make data available to DOM 
    // when the side-eefect execution is completed

    useEffect(()=>{
        // Actual Handling of Side-Effetcs and once it done the state is updated
        const responseData = async()=>{
            const resp = await serv.getCategories();
            const cats = resp.Records;
            cats.sort((a,b)=>a.CategoryRecordId - b.CategoryRecordId);
            setCategories(cats || []);
        }

        // Notify to UI
        responseData();
    },[]); //--> Dependency array that represents all states those are updated based on ueEffetc()


    const save=async ()=>{
        const response = await serv.postCategory(category);
        setCategory(response.Record);
        setCategories([...categories, response.Record]);
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
                value={category.CategoryRecordId} readOnly
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



export default CategoryStateHttpComponent;