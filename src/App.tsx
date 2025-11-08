import { useRef } from "react"
import { MeasureField } from "./components/MeasureField/MeasureField"
import { useInput, useOutput, useSetInput } from "./store/hooks"
import { convertValue } from "./helpers/convert_values"

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
    const inputUnitTemp = input.unit.toString()
    setInput({unit: outputHook.output.unit})
    outputHook.setOutput({unit: inputUnitTemp})

    setInput({ value: convertValue(input.value, input.unit, outputHook.output.unit, outputHook.output.precision)})
  }

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
        <div className="absolute top-12 left-[86px]">
          <button onClick={removeDecimals}>&larr;</button>
          <button onClick={addDecimals}>&rarr;</button>
        </div>
      </div>  

      
    </div>
  )
}

export default App
