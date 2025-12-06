import { useRef } from "react"
import { MeasureField } from "../components/MeasureField/MeasureField"
import { useInput, useOutput, useSetInput } from "../store/hooks"
import { convertValue } from "../helpers/convert_values"
import { CONVERSIONS_V2 } from "../constants"
import Draggable from "react-draggable"
import { Card, CardContent, IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import Fab from '@mui/material/Fab'; 
import AddIcon from '@mui/icons-material/Add'; 
import Tooltip from '@mui/material/Tooltip';


export const UnitMeasureConversor = () => {
  const inputFieldRef = useRef<HTMLInputElement | null>(null)

  const input = useInput()
  const setInput = useSetInput()

  const outputHook = useOutput()
  
  const handleResetForm = () => {
    setInput({ value: '', unit: ''})
    inputFieldRef?.current?.focus()
  }

  const handleSwitch = () => {
    const inputUnitObj = CONVERSIONS_V2.find(u => u.abbv === input.unit);
    if (!inputUnitObj) return;

    const outputUnitObj = CONVERSIONS_V2.find(u =>  u.abbv === outputHook.output.unit);
    if (!outputUnitObj) return;

    const newInputValue = convertValue(
      input.value,
      input.unit,
      outputUnitObj.abbv,
      outputHook.output.precision
    );

    if (newInputValue === "" || isNaN(Number(newInputValue))) return;

    setInput({
      unit: outputUnitObj.abbv,
      value: Number(newInputValue),
    });

    outputHook.setOutput({
      unit: input.unit,
    });
  };

  const addDecimals = () => {
    outputHook.setOutput({ precision: outputHook.output.precision + 1})
  }

  const removeDecimals = () => {
    const currentPrecision = outputHook.output.precision;

    if (currentPrecision > 1) {
      outputHook.setOutput({ precision: currentPrecision - 1})
    }
  }

  const nodeRef = useRef<HTMLDivElement | null>(null);

  return (
    <>       
      <Draggable nodeRef={nodeRef} bounds="body" defaultPosition={{ x: 100, y: 100 }}>
        <Card
          ref={nodeRef}
          sx={{
            position: "fixed",
            padding: 2,
            minWidth: 420,
            borderRadius: 3,
            boxShadow: 4,
            cursor: "move",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 8,
            }}
          >
            <IconButton size="small">
              <CloseIcon />
            </IconButton>
          </div>

          <CardContent>
            <MeasureField />

            <div className="flex gap-5 my-3 items-center justify-center">
              <button className="text-3xl" onClick={handleSwitch}>
                &#x21D5;
              </button>

              <button
                className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-300 transition-colors"
                onClick={handleResetForm}
              >
                Limpar
              </button>
            </div>

            <div className="relative">
              <MeasureField readOnly />

              <div className="absolute top-20 left-[40px] flex gap-2">
                <button onClick={removeDecimals}>&larr;</button>
                <button onClick={addDecimals}>&rarr;</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Draggable>
      
      <Tooltip title="Adicionar um novo card de conversão"> 
        <Fab
          color="primary"
          aria-label="adicionar"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={() => console.log('A lógica de adicionar card virá aqui!')} 
        >
          <AddIcon />
        </Fab>
      </Tooltip> {/* <--- FIM DO TOOLTIP */}
    </>
  );
}
