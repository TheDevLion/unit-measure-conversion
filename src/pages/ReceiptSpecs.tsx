import { Add, Delete, ExpandMore, ExpandLess } from "@mui/icons-material";
import { useState } from "react";

type SubRow = {
  id: string;
  description: string;
  value: number;
  unit: string;
};

type Product = {
  id: string;
  name: string;
  amount: number;
  unit: string;
  subRows: SubRow[];
  selectedSubRowId?: string;
  isExpanded: boolean;
};

export const ReceiptSpecs = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddNewProduct = () => {
    setProducts((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        amount: 0,
        unit: "",
        subRows: [],
        isExpanded: true,
      },
    ]);
  };

  const handleToggleExpand = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isExpanded: !p.isExpanded } : p
      )
    );
  };

  const handleAddSubRow = (productId: string) => {
    const newSubRow: SubRow = {
      id: crypto.randomUUID(),
      description: "",
      value: 0,
      unit: "",
    };
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, subRows: [...p.subRows, newSubRow] } : p
      )
    );
  };

  const handleProductChange = (id: string, field: keyof Product, value: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSubRowChange = (
    productId: string,
    subRowId: string,
    field: keyof SubRow,
    value: number
  ) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              subRows: p.subRows.map((s) =>
                s.id === subRowId ? { ...s, [field]: value } : s
              ),
            }
          : p
      )
    );
  };

  const handleSelectSubRow = (productId: string, subRowId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, selectedSubRowId: subRowId } : p
      )
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleDeleteSubRow = (productId: string, subRowId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, subRows: p.subRows.filter((s) => s.id !== subRowId) }
          : p
      )
    );
  };

  const calculateConvertedValue = (product: Product) => {
    const selected = product.subRows.find(
      (s) => s.id === product.selectedSubRowId
    );
    if (!selected) return 0;
    return selected.value * product.amount; // ajuste sua conversão aqui
  };

  return (
    <div className="relative p-6 space-y-6">
      <h1 className="font-bold text-4xl text-center">Receipt Specs</h1>

      <div className="flex justify-end">
        <button
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded p-2 shadow-md transition-colors"
          onClick={handleAddNewProduct}
        >
          <Add />
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded shadow-sm p-4 bg-white"
          >
            {/* Header row */}
            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Product"
                  value={product.name}
                  onChange={(e) =>
                    handleProductChange(product.id, "name", Number(e.target.value))
                  }
                  className="border p-1 flex-1 rounded"
                />
                <input
                  type="number"
                  placeholder="Amount"
                  value={product.amount}
                  onChange={(e) =>
                    handleProductChange(product.id, "amount", Number(e.target.value))
                  }
                  className="border p-1 w-20 rounded"
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={product.unit}
                  onChange={(e) =>
                    handleProductChange(product.id, "unit", Number(e.target.value))
                  }
                  className="border p-1 w-20 rounded"
                />
                <div className="flex items-center gap-1">
                  <span className="font-medium">
                    Converted: {calculateConvertedValue(product)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleExpand(product.id)}
                  className="p-1 rounded hover:bg-gray-200 transition-colors"
                >
                  {product.isExpanded ? <ExpandLess /> : <ExpandMore />}
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-1 rounded hover:bg-red-100 text-red-600"
                >
                  <Delete />
                </button>
              </div>
            </div>

            {/* Subrows */}
            {product.isExpanded && (
              <div className="space-y-2 border-t pt-2">
                {product.subRows.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center gap-2 bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="radio"
                      name={`selected-${product.id}`}
                      checked={product.selectedSubRowId === s.id}
                      onChange={() => handleSelectSubRow(product.id, s.id)}
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={s.description}
                      onChange={(e) =>
                        handleSubRowChange(product.id, s.id, "description", Number(e.target.value))
                      }
                      className="border p-1 w-32 rounded"
                    />
                    <input
                      type="number"
                      placeholder="Value"
                      value={s.value}
                      onChange={(e) =>
                        handleSubRowChange(product.id, s.id, "value", Number(e.target.value))
                      }
                      className="border p-1 w-20 rounded"
                    />
                    <input
                      type="text"
                      placeholder="Unit"
                      value={s.unit}
                      onChange={(e) =>
                        handleSubRowChange(product.id, s.id, "unit", Number(e.target.value))
                      }
                      className="border p-1 w-20 rounded"
                    />
                    <button
                      onClick={() => handleDeleteSubRow(product.id, s.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded"
                    >
                      <Delete />
                    </button>
                  </div>
                ))}

                <button
                  className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                  onClick={() => handleAddSubRow(product.id)}
                >
                  <Add /> Add SubRow
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
