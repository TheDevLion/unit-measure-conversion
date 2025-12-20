
import { create } from "zustand";
import type { MeasureConversionState, MeasureConversionStore } from "./type";

export const initialState: MeasureConversionState = {
    input: {
        value: '',
        unit: '',
    },
    output: {
        unit: '',
        precision: 3,
    },
    isDevMode: false,
}

export const useMeasureConversionStore = create<MeasureConversionStore>()((set) => ({
    ...initialState,
    setInput: (inputUpdate) => set((state) => ({ input: { ...state.input, ...inputUpdate } })),
    setOutput: (outputUpdate) => set((state) => ({ output: { ...state.output, ...outputUpdate } })),
    setIsDevMode: (isDevMode: boolean) => set((state) => ({...state, isDevMode}))
}));