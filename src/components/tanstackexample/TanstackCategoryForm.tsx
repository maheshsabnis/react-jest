import React, { useEffect, useState } from "react";
import { Category } from "../../models/category";

type Props = {
  selected?: Category | null;
  onCancel?: () => void;
  onSubmit: (cat: Partial<Category>) => void;
};

export default function TanstackCategoryForm({ selected, onCancel, onSubmit }: Props) {
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [basePrice, setBasePrice] = useState<number>(0);

  useEffect(() => {
    if (selected) {
      setCategoryId(selected.CategoryId);
      setCategoryName(selected.CategoryName);
      setBasePrice(selected.BasePrice);
    } else {
      setCategoryId("");
      setCategoryName("");
      setBasePrice(0);
    }
  }, [selected]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const payload: Partial<Category> = {
      CategoryRecordId: selected?.CategoryRecordId || 0,
      CategoryId: categoryId,
      CategoryName: categoryName,
      BasePrice: basePrice,
    };
    onSubmit(payload);
  }

  return (
    <form onSubmit={submit} style={{ marginTop: 12 }}>
      <div>
        <label>CategoryId</label>
        <input value={categoryId} onChange={(e) => setCategoryId(e.target.value)} />
      </div>
      <div>
        <label>CategoryName</label>
        <input value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
      </div>
      <div>
        <label>BasePrice</label>
        <input
          type="number"
          value={basePrice}
          onChange={(e) => setBasePrice(Number(e.target.value))}
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit">Save</button>
        {onCancel && (
          <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
