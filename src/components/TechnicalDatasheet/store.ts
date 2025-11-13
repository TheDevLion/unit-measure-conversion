import { create } from "zustand";
import { useShallow } from "zustand/shallow";

//----------------      Basic Types
export type TechnicalDatasheetRecord = {
    id: string,
    name: string
}

export type Product = {
  id: string;
  name: string;
  quantity: number | "";
  unit: string;
  prices: ProductPrice[];
};

export type ProductPrice = {
    id: string;
    description: string;
    value: number | "";
}


//----------------      Store Types
export type TechnicalDatasheetState = {
    selectedSheet?: string;
    datasheets: TechnicalDatasheetRecord[];
    products: Product[];
}

export type TechnicalDatasheetActions = {
    setSelectedSheet: (sheetId?: Partial<TechnicalDatasheetState['selectedSheet']> ) => void;
    setDatasheets: (datasheets: TechnicalDatasheetRecord[]) => void;
    setProducts: (products: Product[]) => void;
}

export type TechnicalDatasheetStore = TechnicalDatasheetState & TechnicalDatasheetActions;


//----------------      Store
export const initialStore: TechnicalDatasheetState = {
    selectedSheet: undefined,
    datasheets: [],
    products: [],
}

export const useTechnicalDatasheetStore = create<TechnicalDatasheetStore>()((set) => ({
    ...initialStore,
    setSelectedSheet: (sheetId?: string) => set((state) => ({...state, selectedSheet: sheetId})),
    setDatasheets: (datasheets: TechnicalDatasheetRecord[]) => set((state) => ({...state, datasheets })),
    setProducts: (products: Product[]) => set((state) => ({...state, products }))
}));



//----------------      Selectors and Hooks
export const selectSelectedSheet = ({ selectedSheet, setSelectedSheet }: TechnicalDatasheetStore) => ({ selectedSheet, setSelectedSheet })
export const useSelectedSheet = () => useTechnicalDatasheetStore(useShallow(selectSelectedSheet))

export const selectDatasheets = ({ datasheets, setDatasheets }: TechnicalDatasheetStore) => ({datasheets, setDatasheets})
export const useDatasheets = () => useTechnicalDatasheetStore(useShallow(selectDatasheets))

export const selectProducts = ({ products, setProducts }: TechnicalDatasheetStore) => ({products, setProducts})
export const useProducts = () => useTechnicalDatasheetStore(useShallow(selectProducts))