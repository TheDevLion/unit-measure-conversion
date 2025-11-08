import { useRef } from "react"
import { MeasureField } from "./components/MeasureField/MeasureField"
import { useInput, useOutput, useSetInput } from "./store/hooks"
import { convertValue } from "./helpers/convert_values"
import { CONVERSIONS_V2 } from "./constants"

function App() {
  const inputFieldRef = useRef<HTMLInputElement | null>(null)

  const input = useInput()
  const setInput = useSetInput()

  const outputHook = useOutput()
  
  const handleResetForm = () => {
    setInput({ value: ''})
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
    outputHook.setOutput({ precision: outputHook.output.precision - 1})
  }

  return (
    <div className="flex items-center justify-center flex-col p-10">

      {window.location.href.includes("localhost") && <h1 className="font-bold text-4xl">DEV MODE</h1>}
      
      <MeasureField />

      <div className="flex gap-5">
        <button className="text-3xl" onClick={handleSwitch}>&#x21D5;</button>

        <button   
          className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-300 transition-colors"
          onClick={handleResetForm}
        >
          Limpar
        </button>
      </div>


      <div className="relative">
        <MeasureField readOnly />
        <div className="absolute top-20 left-[40px]">
          <button onClick={removeDecimals}>&larr;</button>
          <button onClick={addDecimals}>&rarr;</button>
        </div>
      </div>  

      
    </div>
  )
}

export default App
