import { useEffect, useRef, useState } from "react"
import { microOperation, OPERATION_ENUM } from "./helpers/micro_operations"
import { CONVERSIONS } from "./constants"
import { MeasureField } from "./components/MeasureField/MeasureField"

function App() {
  const [input, setInput] = useState<number | string>('')
  const [output, setOutput] = useState<number | string>('')
  const [inputUnit, setInputUnit] = useState<string>("ml")
  const [outputUnit, setOutputUnit] = useState<string>("fl_oz")
  const [decimals, setDecimals] = useState(3)

  const inputFieldRef = useRef<HTMLInputElement | null>(null)
  
  useEffect(() => {
    convert_unit()
  }, [input, inputUnit, outputUnit])

  
  const convert_unit = () => {
    if (input === '' || isNaN(Number(input))){
      setOutput('')
      return
    }

    const category = Object.keys(CONVERSIONS).find(cat => inputUnit in CONVERSIONS[cat])
    if (!category) return null

    const inputInFlOz = microOperation(CONVERSIONS[category][inputUnit], Number(input), OPERATION_ENUM.TIMES)
    const output = microOperation(inputInFlOz ?? 0, CONVERSIONS[category][outputUnit], OPERATION_ENUM.DIVIDE)
    setOutput(output ?? 0)
  }

  const handleResetForm = () => {
    setInput('')
    inputFieldRef?.current?.focus()
  }

  const handleDecimals = (value: number | string) => {
    if (!value) return ''

    const v = Number(value)
    return v.toFixed(decimals)
  }

  const addDecimals = () => {
    setDecimals(decimals + 1)
  }

  const removeDecimals = () => {
    setDecimals(decimals - 1)
  }

  const handleSwitch = () => {
    const inputUnitTemp = inputUnit.toString()
    setInputUnit(outputUnit)
    setOutputUnit(inputUnitTemp)

    const inputTemp = input
    setInput(output)
    setOutput(inputTemp)
  }

  return (
    <div className="flex items-center justify-center flex-col p-10">

      {window.location.href.includes("localhost") && <h1 className="font-bold text-4xl">DEV MODE</h1>}
      
      <MeasureField valueState={input} setValueState={setInput} unitState={inputUnit} setUnitState={setInputUnit} />

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
        <MeasureField readOnly valueState={output} setValueState={setOutput} unitState={outputUnit} setUnitState={setOutputUnit} handleDecimals={handleDecimals} desiredUnitInput={inputUnit.toString()}/>
        <div className="absolute top-12 left-[86px]">
          <button onClick={removeDecimals}>&larr;</button>
          <button onClick={addDecimals}>&rarr;</button>
        </div>
      </div>  

      
    </div>
  )
}

export default App
