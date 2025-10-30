import { useRef } from "react"
import { MeasureField } from "./components/MeasureField/MeasureField"
import { useInput, useOutput } from "./store/hooks"
import { convertValue } from "./helpers/convert_values"

function App() {
  const inputFieldRef = useRef<HTMLInputElement | null>(null)

  const { setInputValue, setInputUnit, inputUnit, inputValue  } = useInput()
  const { outputUnit, setOutputUnit, setOutputPrecision, outputPrecision } = useOutput()
  
  const handleResetForm = () => {
    setInputValue('')
    inputFieldRef?.current?.focus()
  }

  const handleSwitch = () => {
    const inputUnitTemp = inputUnit.toString()
    setInputUnit(outputUnit)
    setOutputUnit(inputUnitTemp)

    setInputValue(convertValue(inputValue, inputUnit, outputUnit, outputPrecision))
  }

  const addDecimals = () => {
      setOutputPrecision(outputPrecision + 1)
  }

  const removeDecimals = () => {
      setOutputPrecision(outputPrecision - 1)
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
