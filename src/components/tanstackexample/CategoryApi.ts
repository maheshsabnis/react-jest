import axios from "axios";
import { Category } from "../../models/category";

const READ_URL = "https://coreapiforreact-aed8a3azbaeba6ep.eastus-01.azurewebsites.net/api/CategoryRead";
const WRITE_URL = "https://coreapiforreact-aed8a3azbaeba6ep.eastus-01.azurewebsites.net/api/CategoryWrite";

export async function fetchCategories(): Promise<Category[]> {
  const resp = await axios.get(READ_URL);
  const data = resp.data;
  if (Array.isArray(data)) return data as Category[];
  // handle common wrappers
  if (Array.isArray(data?.data)) return data.data as Category[];
  if (Array.isArray(data?.categories)) return data.categories as Category[];
  if (Array.isArray(data?.Records)) return data.Records as Category[];
  // if API returns an object keyed by results or value
  if (Array.isArray(data?.results)) return data.results as Category[];
  // fallback: if it's a single object, wrap it
  if (data && typeof data === "object") {
    // try to detect single Category shape
    if (data.CategoryRecordId !== undefined) return [data as Category];
  }
  return [];
}

export async function createCategory(cat: Partial<Category>): Promise<any> {
  const resp = await axios.post(WRITE_URL, cat, {
    headers: { "Content-Type": "application/json" },
  });
  return resp.data;
}

export async function updateCategory(cat: Category): Promise<any> {
  // many APIs accept PUT to the same write URL
  const resp = await axios.put(WRITE_URL, cat, {
    headers: { "Content-Type": "application/json" },
  });
  return resp.data;
}

export async function deleteCategory(id: string): Promise<any> {
  // if API expects id in query or body; send as body with axios.delete
  const resp = await axios.delete(WRITE_URL, { data: { CategoryRecordId: id } });
  return resp.data;
}
