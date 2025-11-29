import { useMemo, useRef, type ChangeEvent } from "react"
import { useInput, useIsSwitching, useOutput, useSetInput } from "../../store/hooks";
import { convertValue } from "../../helpers/convert_values";
import { Autocomplete, TextField } from "@mui/material";
import { CONVERSIONS_V2 } from "../../constants";
import type { Option } from "../../core/UnitPicker";
import {useEffect} from "react";


export type MeasureFieldProps = {
    readOnly?: boolean;
}

export const MeasureField = ({ readOnly }: MeasureFieldProps) => {
    const input = useInput()
    const setInput = useSetInput()

    const outputHook = useOutput()

    const justSwitchedRef = useRef(false);
  
    const {isSwitching} = useIsSwitching()

  useEffect(() => {
      if (!isSwitching && justSwitchedRef.current) {
          if (readOnly) {
              justSwitchedRef.current = true;
              return; 
          }
      }
      
    justSwitchedRef.current = isSwitching; 

  }, [isSwitching, readOnly]);


    useEffect(() => {
        if (!readOnly) return;
        
        if (isSwitching || input.value === '') return;
        
        if (justSwitchedRef.current) {
            justSwitchedRef.current = false;
            return; 
        }

        const result = convertValue(
            input.value,
            input.unit,
            outputHook.output.unit,
            outputHook.output.precision
        );

        outputHook.setOutput({ value: result });

    }, [
        readOnly, 
        input.value,
        input.unit,
        outputHook.output.unit,
        outputHook.output.precision,
        isSwitching
    ]);

    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target

      if (value === '' && !readOnly) {
          setInput({ value: ''} )
          return
      }

      const parsed = Number(value)

      if (!isNaN(parsed)) {
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

      return units
      .filter(unit => unit.category !== "random")
      .map(unit => ({
          title: `(${unit.abbv.replace("_", " ")}) - ${unit.name}`,
          abbv: unit.abbv,
          category: unit.category
        }));
    }

    const options = useMemo(() => buildAutocompleteOptions(), [input.unit, outputHook.output.unit]);
    const selectedUnitOption = options.find(o => !readOnly ? o.abbv === input.unit : o.abbv === outputHook.output.unit) || null;

return (
  // Ocupa a largura total e alinha os itens (input e unit select)
  <div className="flex w-full items-center gap-4">

    {/* INPUT PRINCIPAL / RESULTADO */}
    {/* Use flex-1 para garantir que o input preencha o espaço restante */}
    <input
      // Aplica a borda e o padding
      className="border-2 border-black px-2 rounded-sm flex-1 h-[56px]" 
      // O valor exibido depende se está em modo de leitura ou não
      value={readOnly ? outputHook.output.value : input.value}
      // O handler de mudança só é ativo se NÃO for readOnly
      onChange={readOnly ? () => {} : handleInputChange}
      readOnly={readOnly}
      type="number"
      // O placeholder é "Result" quando readOnly é true
      placeholder={readOnly ? "Result" : "Valor a ser convertido"}
    />

    {/* UNIT SELECT (O Autocomplete) */}
    {/* Note: Autocomplete do Material-UI (TextField) geralmente já tem altura padronizada. */}
    <Autocomplete
      onChange={handleUnitChange}
      options={options}
      groupBy={(option) => option.category}
      getOptionLabel={(option) => option.title}
      value={selectedUnitOption}
      // Ajustei a largura para combinar com a imagem, mantendo a label padrão.
      renderInput={(params) => <TextField {...params} label="Unit" />}
      className="w-[180px]" // Ajuste de largura (era 200px)
      renderOption={(props, option) => (
        <li
          {...props}
          className="px-3 py-2 text-xs cursor-pointer hover:bg-gray-200"
        >
          {option.title}
        </li>
      )}
    />
  </div>
);
}
