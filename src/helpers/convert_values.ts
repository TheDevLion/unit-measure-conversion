import { CONVERSIONS } from "../constants"
import { microOperation, OPERATION_ENUM } from "./micro_operations"

export const convertValue = (inputValue: number | string, inputUnit: string, outputUnit: string, outputPrecision: number) => {
    if (inputValue === '' || isNaN(Number(inputValue))){
        return ''
    }

    const category = Object.keys(CONVERSIONS).find(cat => inputUnit in CONVERSIONS[cat])
    if (!category) return ''

    const inputInFlOz = microOperation(CONVERSIONS[category][inputUnit], Number(inputValue), OPERATION_ENUM.TIMES)
    const output = microOperation(inputInFlOz ?? 0, CONVERSIONS[category][outputUnit], OPERATION_ENUM.DIVIDE)

    return output ? output.toFixed(outputPrecision) : 0
}