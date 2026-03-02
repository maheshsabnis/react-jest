import React from "react";
import { Category } from "../../models/category";

type Props = {
  categories: Category[];
  onEdit: (c: Category) => void;
  onDelete: (id: number) => void;
};

export default function TanstackCategoryList({ categories, onEdit, onDelete }: Props) {
  const list = Array.isArray(categories) ? categories : [];
  return (
    <div>
      <h3>Categories</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>RecordId</th>
            <th>CategoryId</th>
            <th>Name</th>
            <th>BasePrice</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.CategoryRecordId}>
              <td>{c.CategoryRecordId}</td>
              <td>{c.CategoryId}</td>
              <td>{c.CategoryName}</td>
              <td>{c.BasePrice}</td>
              <td>
                <button onClick={() => onEdit(c)} style={{ marginRight: 8 }}>
                  Edit
                </button>
                <button onClick={() => onDelete(c.CategoryRecordId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
