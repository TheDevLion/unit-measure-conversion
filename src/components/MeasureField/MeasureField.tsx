import { useMemo, type ChangeEvent } from "react"
import { useInput, useOutput, useSetInput } from "../../store/hooks";
import { convertValue } from "../../helpers/convert_values";
import { Autocomplete, TextField } from "@mui/material";
import { CONVERSIONS_V2 } from "../../constants";


export type MeasureFieldProps = {
    readOnly?: boolean;
}

type Option = {
  title: string;
  abbv: string;
  category: string;
};

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
    const handleUnitChange = (_: React.SyntheticEvent<Element, Event>, value: Option | null) => {
        if (!value) return

        const unit = value.abbv

        if (readOnly) {
          outputHook.setOutput({ unit });
        } else {
          setInput({ unit });
        }
    }

    const buildAutocompleteOptions = (): Option[] => {
      let units = CONVERSIONS_V2

      if (readOnly) {
        const inputUnitObj = CONVERSIONS_V2.find(c => c.abbv === input.unit)
        units = units.filter(u => u.category === inputUnitObj?.category) 
      }

      return units.map(unit => ({
          title: `(${unit.abbv.replace("_", " ")}) - ${unit.name}`,
          abbv: unit.abbv,
          category: unit.category
        }));
    }

    const options = useMemo(() => buildAutocompleteOptions(), [input.unit, outputHook.output.unit]);
    const selectedUnitOption = options.find(o => !readOnly ? o.abbv === input.unit : o.abbv === outputHook.output.unit) || null;


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
    
            <Autocomplete
              onChange={handleUnitChange}
              options={options}
              groupBy={(option: Option) => option.category}
              getOptionLabel={(option) => option.title}
              value={selectedUnitOption}
              renderInput={(params) => <TextField {...params} label="Unit" />}
              renderOption={(props, option) => {
                let { key, ...rest } = props;
                return <li 
                  key={option.abbv} 
                  {...rest} 
                  className={`px-3 py-2 text-xs cursor-pointer hover:bg-gray-200`}>
                    {option.title}
                </li>;
              }}
              className="w-[350px]"
              ListboxProps={{
                sx: {
                  "& .MuiAutocomplete-groupLabel": {
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    fontSize: "0.875rem",
                    px: 1,
                    py: 1,
                  },
                },
              }}
            />
            
        </div>
}