import axios from "axios";
import type { ResponseObject } from "../models/responseobject";
import type { Category } from "../models/category";
export class CategoryHttpService {
    private readUrl:string  = "https://coreapiforreact-aed8a3azbaeba6ep.eastus-01.azurewebsites.net/api/CategoryRead";
    private writeUrl:string = "https://coreapiforreact-aed8a3azbaeba6ep.eastus-01.azurewebsites.net/api/CategoryWrite";


    async getCategories():Promise<ResponseObject<Category>>{
        const response = await axios.get<ResponseObject<Category>>(this.readUrl);
        return response.data;
    }

    async getCategoryById(id:string):Promise<ResponseObject<Category>>{
        const response = await axios.get<ResponseObject<Category>>(`${this.readUrl}/${id}`);
        return response.data;
    }
    async postCategory(category:Category):Promise<ResponseObject<Category>> {
        const response = await axios.post<ResponseObject<Category>>(this.writeUrl, category, {
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response.data;
    }
    async putCategory(category:Category):Promise<ResponseObject<Category>> {
        const response = await axios.put<ResponseObject<Category>>(`${this.writeUrl}/${category.CategoryId}`, category, {
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response.data;
    }

      async deleteCategoryById(id:string):Promise<ResponseObject<Category>>{
        const response = await axios.delete<ResponseObject<Category>>(`${this.readUrl}/${id}`);
        return response.data;
    }

}