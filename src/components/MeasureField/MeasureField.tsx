import { type ChangeEvent } from "react"
import { CONVERSIONS } from "../../constants"


export type MeasureFieldProps = {
    readOnly?: boolean;
    valueState: string | number;
    setValueState: React.Dispatch<React.SetStateAction<string | number>>;
    unitState: string;
    setUnitState: React.Dispatch<React.SetStateAction<string>>;
    handleDecimals?: (value: string | number) => string;
    desiredUnitInput?: string; // Needed for find proper conversion category (filter output units)
}

export const MeasureField = ({ 
    readOnly, 
    valueState, 
    setValueState, 
    unitState, 
    setUnitState,
    handleDecimals,
    desiredUnitInput
}: MeasureFieldProps) => {
    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target

        if (value === '') {
        setValueState('')
        return
        }

        const parsed = Number(value)
        if (!isNaN(parsed)) {
        setValueState(parsed)
        }
    }
    const handleUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setUnitState(event.target.value)
    }

    return <div className="flex p-5 w-[450px] justify-center align-center">
            <input 
              className="mx-5 border-2 border-black px-2 rounded-sm" 
              value={readOnly && handleDecimals ? handleDecimals(valueState) : valueState ?? ''} 
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
              value={unitState}
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

              {readOnly && desiredUnitInput && (() => {
                const category = Object.keys(CONVERSIONS).find(cat => desiredUnitInput in CONVERSIONS[cat])
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