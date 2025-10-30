import { type ChangeEvent } from "react"
import { CONVERSIONS } from "../../constants"
import { useInput, useOutput } from "../../store/hooks";
import { convertValue } from "../../helpers/convert_values";


export type MeasureFieldProps = {
    readOnly?: boolean;
}

export const MeasureField = ({ readOnly }: MeasureFieldProps) => {
    const { setInputValue, setInputUnit, inputUnit, inputValue  } = useInput()
    const { outputUnit, setOutputUnit, outputPrecision } = useOutput()
    
    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        if (value === '' && !readOnly) {
            setInputValue('')
            return
        }

        const parsed = Number(value)
        if (!isNaN(parsed) && !readOnly) {
            setInputValue(parsed)
        }
    }
    const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const unit = event.target.value
        if (readOnly) setOutputUnit(unit) 
        else setInputUnit(unit)
    }

    return <div className="flex p-5 w-[450px] justify-center align-center">
            <input 
              className="mx-5 border-2 border-black px-2 rounded-sm" 
              value={readOnly ? convertValue(inputValue, inputUnit, outputUnit, outputPrecision) : inputValue} 
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
              value={readOnly ? outputUnit : inputUnit}
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
                const category = Object.keys(CONVERSIONS).find(cat => inputUnit in CONVERSIONS[cat])
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