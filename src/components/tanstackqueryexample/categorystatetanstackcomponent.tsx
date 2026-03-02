import { useState } from "react";
// 1. Import TanStackQuery hooks
import {useQuery, useMutation, useQueryClient, QueryClient} from '@tanstack/react-query';
import { CategoryHttpService } from "../../services/categoryhttpservice";
import { Category } from "../../models/category";
import TableGridComponent from "../resusablecomponents/tablegridcomponent";
const CategoryStateTanstackQueryComponent=()=>{
    const [category, setCategory]  = useState<Category>(new Category(0,'','',0)); 
    const [categories, setCategories] = useState<Category[]>([]);

    const serv  =new CategoryHttpService();

    // 2. KickStart with TanStack Query
    const queryClient = new QueryClient();
    // 2.1. Let's Query and Cache
    const {data, error, isLoading} = useQuery({
        queryKey:['categories'], // cache Key
        queryFn: ()=>serv.getCategories()    // actual fetch operations, (Auto-Subscrition to Async Operation) 
    }); 

    // 3. The Mutation
    // Process for Mutating data with 2 ways
    // 3.1. New Entry, post data to server, and then invalidate the cache
    const mutateAddNew = useMutation({
        mutationFn:(newCategory:Category)=>serv.postCategory(newCategory),
        onSuccess: ()=>{
            // invalidate the cache
            queryClient.invalidateQueries({queryKey:["categories"]});
        }
    });
    // 3.2. Update or Delete, Write data to Server, and if success, then invalidate the part of the cache to update the UI 
    const mutateUpdate=useMutation({
        mutationFn: (catToUpdate:Category)=>serv.putCategory(catToUpdate),
        // Mutate the cache by seraching the record that is to be updated
        onMutate:()=>{
            // Logic for invalidating the cache by mutating the record to be updated
        },
        onError:()=>{
            // UI update to notify the failure
        }
    }); 

    const mutateDelete = useMutation({
        mutationFn: (catToDelete:Category)=>serv.deleteCategoryById(catToDelete.CategoryId),
        //Mutate the Cache by search the category to be deleted
        onMutate: ()=>{
            //Logic for thr cache Invalidation by mutating the record to be deleted
        },
        onError:()=>{
                // UI update to notify the failure
        }

    })

    const save=()=>{
         // 3.1.1. Use the Mutation for make new entry
         mutateAddNew.mutate(category); 
         clear();    
    }
    const clear=()=>{
        setCategory(new Category(0,'','',0));
    }
 
    // 2.2. If isloading, return the loading state
    if(isLoading) return <p><strong>Loading......</strong></p> 
    // 2.2.1 If Eror Show error Message
    if(error) return <p><strong>Error in Loading data ...... {error.message}</strong></p>

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
                <button onClick={save}>Save</button>
                <button onClick={clear}>Clear</button>
            </div>
            <br /> 
            <TableGridComponent dataSource={data?.Records} rowCick={setCategory}
             canDelete={true}
            />
            
             
        </div>
    );

};



export default CategoryStateTanstackQueryComponent;