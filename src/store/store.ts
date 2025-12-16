import { create } from "zustand";
import type { MeasureConversionState, MeasureConversionStore } from "./type";

export const initialStore: MeasureConversionState = {
    input: {
        value: '',
        unit: '',
    },
    output: {
        value: '',
        unit: '',
        precision: 3,
    },
    isDevMode: false,
    isSwitching: false,
};

export const useMeasureConversionStore = create<MeasureConversionStore>()((set) => ({
    ...initialStore,
    setInput: (inputUpdate) => set((state) => ({ input: { ...state.input, ...inputUpdate } })),
    setOutput: (outputUpdate) => set((state) => ({ output: { ...state.output, ...outputUpdate } })),
    setIsDevMode: (isDevMode) => set({ isDevMode }),
    setIsSwitching: (value) => set({ isSwitching: value }),
}));
