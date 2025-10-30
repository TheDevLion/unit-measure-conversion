import { useShallow } from "zustand/shallow";
import type { MeasureConversionStore } from "./type";
import { useMeasureConversionStore } from "./store";

export const useInput = () => {
  const { input, setInput } = useMeasureConversionStore(useShallow(
    (state: MeasureConversionStore) => ({ input: state.input, setInput: state.setInput }))
  )

  const setInputValue = (value: number | string) => setInput({ value })
  const setInputUnit = (unit: string) => setInput({ unit })

  return {
    inputValue: input.value,
    inputUnit: input.unit,
    setInputValue,
    setInputUnit,
  }
}

export const useOutput = () => {
    const { output, setOutput } = useMeasureConversionStore(useShallow(
        (state: MeasureConversionStore) => ({ output: state.output, setOutput: state.setOutput})
    ))

    const setOutputUnit = (unit: string) => setOutput({ unit })
    const setOutputPrecision = (precision: number) => setOutput({ precision })

    return {
        outputUnit: output.unit,
        outputPrecision: output.precision,
        setOutputUnit: setOutputUnit,
        setOutputPrecision: setOutputPrecision
    }

}
