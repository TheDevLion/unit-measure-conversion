import { type ChangeEvent } from "react"
import { CONVERSIONS } from "../../constants"
import { useInput, useOutput, useSetInput } from "../../store/hooks";
import { convertValue } from "../../helpers/convert_values";


export type MeasureFieldProps = {
    readOnly?: boolean;
}

export const MeasureField = ({ readOnly }: MeasureFieldProps) => {
    const input = useInput()
    const setInput = useSetInput()

    const outputHook = useOutput()
    
    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        if (value === '' && !readOnly) {
            setInput({ value: ''} )
            return
        }

        const parsed = Number(value)
        if (!isNaN(parsed) && !readOnly) {
            setInput({ value: parsed} )
        }
    }
    const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const unit = event.target.value
        if (readOnly) outputHook.setOutput({ unit })

        else setInput({ unit })
    }

    return <div className="flex p-5 w-[450px] justify-center align-center">
            <input 
              className="mx-5 border-2 border-black px-2 rounded-sm" 
              value={readOnly ? convertValue(input.value, input.unit, outputHook.output.unit, outputHook.output.precision) : input.value} 
              onChange={handleValueChange} 
              type='number'
              placeholder={!readOnly ? "Valor a ser convertido" : "Result"}
              readOnly={readOnly}
              // FIXME: auto focus when open, clear and switch actions
              // ref={inputFieldRef}
              //    const inputFieldRef = useRef<HTMLInputElement | null>(null)
              //    inputFieldRef?.current?.focus()
            />
    
            <select
              value={readOnly ? outputHook.output.unit : input.unit}
              onChange={handleUnitChange}
              className="w-[80px]"
            >
              {!readOnly && Object.entries(CONVERSIONS).map(([category, units]) => (
                <optgroup 
                  key={category} 
                  label={category.replace("_conversion", "").toUpperCase()}
                >
                  {Object.keys(units).map((unit) => (
                    <option key={unit} value={unit}>
                      {unit.replace("_", " ")}
                    </option>
                  ))}
                </optgroup>
              ))}

              {readOnly && (() => {
                const category = Object.keys(CONVERSIONS).find(cat => input.unit in CONVERSIONS[cat])
                if (!category) return null

                return Object.keys(CONVERSIONS[category]).map((unit) => (
                    <option key={unit} value={unit}>
                    {unit.replace("_", " ")}
                    </option>
                ))
                })()}
            </select>
        </div>
}