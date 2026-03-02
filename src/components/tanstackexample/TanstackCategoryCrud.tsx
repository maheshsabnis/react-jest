import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCategories, createCategory, updateCategory, deleteCategory } from "./CategoryApi";
import TanstackCategoryList from "./TanstackCategoryList";
import TanstackCategoryForm from "./TanstackCategoryForm";
import { Category } from "../../models/category";

const queryClient = new QueryClient();

function Inner() {
  const [selected, setSelected] = useState<Category | null>(null);
  const qc = useQueryClient();

  const { data, isLoading, isError, error, status } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  const createMut = useMutation({
    mutationFn: (cat: Partial<Category>) => createCategory(cat),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });

  const updateMut = useMutation({
    mutationFn: (cat: Category) => updateCategory(cat),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      setSelected(null);
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["categories"] }),
  });

  function handleSubmit(cat: Partial<Category>) {
    if (cat.CategoryRecordId && cat.CategoryRecordId > 0) {
      updateMut.mutate(cat as Category);
    } else {
      createMut.mutate(cat);
    }
  }

  function handleDelete(id: number) {
    if (confirm("Delete this category?")) {
      deleteMut.mutate(id);
    }
  }

  return (
    <div>
      <h2>TanStack Query Category CRUD</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}>
            <strong>Query status:</strong> {String(status)} {isError && <span style={{ color: "red" }}> Error</span>}
            {isError && <div style={{ color: "red" }}>{String((error as any)?.message || error)}</div>}
          </div>
          <div style={{ marginBottom: 12 }}>
            <strong>Raw data:</strong>
            <pre style={{ maxHeight: 200, overflow: "auto", background: "#f6f6f6", padding: 8 }}>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
          <TanstackCategoryList
            categories={data || []}
            onEdit={(c) => setSelected(c)}
            onDelete={handleDelete}
          />
        </>
      )}

      <TanstackCategoryForm
        selected={selected}
        onCancel={() => setSelected(null)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default function TanstackCategoryCrudWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Inner />
    </QueryClientProvider>
  );
}
