import { useShallow } from "zustand/shallow";
import type { MeasureConversionStore } from "./type";
import { useMeasureConversionStore } from "./store";

// Pattern 1
export const selectInput = ({ input }: MeasureConversionStore) => input
export const selectSetInput = ({ setInput }: MeasureConversionStore) => setInput

export const useInput = () => useMeasureConversionStore(useShallow(selectInput))
export const useSetInput = () => useMeasureConversionStore(useShallow(selectSetInput))

// Pattern 2
export const selectCombinedOutput = ({ output, setOutput }: MeasureConversionStore) => ({ output, setOutput })
export const useOutput = () => useMeasureConversionStore(useShallow(selectCombinedOutput))

export const selectIsDevMode = ({ isDevMode, setIsDevMode }: MeasureConversionStore) => ({ isDevMode, setIsDevMode })
export const useIsDevMode = () => useMeasureConversionStore(useShallow(selectIsDevMode))

// Pattern 3 – Switching
export const selectIsSwitching = ({ isSwitching, setIsSwitching }: MeasureConversionStore) => ({ isSwitching, setIsSwitching });

export const useIsSwitching = () => useMeasureConversionStore(useShallow(selectIsSwitching));