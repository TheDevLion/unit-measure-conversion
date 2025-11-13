import { create } from "zustand";
import { useShallow } from "zustand/shallow";

//----------------      Basic Types
export type TechnicalDatasheetRecord = {
    id: string,
    name: string
}


//----------------      Store Types
export type TechnicalDatasheetState = {
    selectedSheet?: string;
    datasheets: TechnicalDatasheetRecord[];
}

export type TechnicalDatasheetActions = {
    setSelectedSheet: (sheetId?: Partial<TechnicalDatasheetState['selectedSheet']> ) => void;
    setDatasheets: (datasheets: TechnicalDatasheetRecord[]) => void;
}

export type TechnicalDatasheetStore = TechnicalDatasheetState & TechnicalDatasheetActions;


//----------------      Store
export const initialStore: TechnicalDatasheetState = {
    selectedSheet: undefined,
    datasheets: []
}

export const useTechnicalDatasheetStore = create<TechnicalDatasheetStore>()((set) => ({
    ...initialStore,
    setSelectedSheet: (sheetId?: string) => set((state) => ({...state, selectedSheet: sheetId})),
    setDatasheets: (datasheets: TechnicalDatasheetRecord[]) => set((state) => ({...state, datasheets }))
}));



//----------------      Selectors and Hooks
export const selectSelectedSheet = ({ selectedSheet, setSelectedSheet }: TechnicalDatasheetStore) => ({ selectedSheet, setSelectedSheet })
export const useSelectedSheet = () => useTechnicalDatasheetStore(useShallow(selectSelectedSheet))

export const selectDatasheets = ({ datasheets, setDatasheets }: TechnicalDatasheetStore) => ({datasheets, setDatasheets})
export const useDatasheets = () => useTechnicalDatasheetStore(useShallow(selectDatasheets))