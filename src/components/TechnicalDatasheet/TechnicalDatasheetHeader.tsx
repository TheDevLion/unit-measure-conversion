import { Add, Delete, Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDatasheets, useSelectedSheet } from "./store";
import Inventory2 from "@mui/icons-material/Inventory2";
import { ProductsModal } from "./ProductModal";
import { ShareButton } from "../../design_system/ShareButton";


export const TechnicalDatasheetHeader = () => {
  const {selectedSheet, setSelectedSheet} = useSelectedSheet()
  const {datasheets, setDatasheets} = useDatasheets()
  
  const [showProductsModal, setShowProductsModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("receipts");
    if (saved) setDatasheets(JSON.parse(saved));
  }, []);

  const handleAddReceipt = () => {
    const name = prompt("Enter new receipt name:");
    if (!name) return;

    const newReceipt = { id: Date.now().toString(), name };
    const newReceiptsState = [...datasheets, newReceipt]

    setDatasheets(newReceiptsState);
    setSelectedSheet(newReceipt.id)
    
    localStorage.setItem("receipts", JSON.stringify(newReceiptsState));
  };

  const handleRename = () => {
    if (!selectedSheet) return;

    const currentDatasheetObj = datasheets.find(d => d.id === selectedSheet)
    if (!currentDatasheetObj) return;

    const newName = prompt("Rename receipt:", currentDatasheetObj?.name);
    if (!newName) return;

    currentDatasheetObj.name = newName
    const updatedDatasheets = datasheets.filter(d => d.id !== currentDatasheetObj?.id)
    updatedDatasheets.push(currentDatasheetObj)

    localStorage.setItem("receipts", JSON.stringify(updatedDatasheets));
    setDatasheets(updatedDatasheets);
  };

  const handleDelete = () => {
    if (!selectedSheet) return;

    const currentDatasheetObj = datasheets.find(d => d.id === selectedSheet)
    if (!currentDatasheetObj) return;

    if (!confirm("Are you sure you want to delete this receipt?")) return;

    const updatedDatasheets = datasheets.filter(d => d.id !== currentDatasheetObj?.id)
    localStorage.setItem("receipts", JSON.stringify(updatedDatasheets));
    setDatasheets(updatedDatasheets);
  };

  const handleSelect = (id: string) => {
    if (id) setSelectedSheet(id);
  };


  return (
    <header className="relative flex flex-col items-center justify-center py-2 border-b border-gray-300 bg-white shadow-sm">
      <div className="absolute top-1 right-1">
        <ShareButton />
      </div>

      <h1 className="font-bold text-3xl mb-3">Technical Datasheet</h1>

      <div className="flex items-center gap-3">
        <select
          value={selectedSheet ?? ""}
          onChange={(e) => handleSelect(e.target.value)}
          className="border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Select Receipt --</option>
          {datasheets.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        {selectedSheet && (
          <>
            <button
              className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded transition"
              onClick={handleRename}
            >
              <Edit fontSize="small" />
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded transition"
              onClick={handleDelete}
            >
              <Delete fontSize="small" />
            </button>
          </>
        )}

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded shadow transition"
          onClick={handleAddReceipt}
        >
          <Add />
        </button>

      </div>

      <button
        className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded shadow transition m-2"
        onClick={() => setShowProductsModal(true)}
      >
        <Inventory2 fontSize="small" /> Manage Products
      </button>

      {showProductsModal && (
        <ProductsModal onClose={() => setShowProductsModal(false)} />
      )}
    </header>
  );
};
