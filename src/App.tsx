import { useEffect, useState, type ChangeEvent } from "react"
import { microOperation, OPERATION_ENUM } from "./helpers/micro_operations"

function App() {
  const [input, setInput] = useState<number | string>('')
  const [output, setOutput] = useState<number | string>('')
  const [inputUnit, setInputUnit] = useState<string>("ml")
  const [outputUnit, setOutputUnit] = useState<string>("fl_oz")
  
  useEffect(() => {
    convert_volume()
  }, [input])

  const volume_conversion: { [key: string]: number } = {
    fl_oz: 1,
    gal: 128,
    ml: 0.0338140227,
    qt: 32,
  }

  const convert_volume = () => {
    if (input === '' || isNaN(Number(input))){
      setOutput('')
      return
    }

    const inputInFlOz = microOperation(volume_conversion[inputUnit], Number(input), OPERATION_ENUM.TIMES)
    const output = microOperation(inputInFlOz ?? 0, volume_conversion[outputUnit], OPERATION_ENUM.DIVIDE)
    setOutput(output ?? 0)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (value === '') {
      setInput('')
      return
    }

    const parsed = Number(value)
    if (!isNaN(parsed)) {
      setInput(parsed)
    }
  }

  const handleInputUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputUnit(event.target.value)
  }
  const handleOutputUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOutputUnit(event.target.value)
  }

  return (
    <div>
      <label className="text-blue-500">
        Entrada
        <input value={input ?? ''} onChange={handleInputChange} type='number'/>
      </label>

      <select 
        id="entrada-dropdown" 
        name="entrada"
        value={inputUnit}
        onChange={handleInputUnitChange}
      >
        <option value="ml">mL</option>
        <option value="fl_oz">fl Oz</option>
        <option value="gal">gal</option>
        <option value="qt">qt</option>
      </select>

      <br />
      <br />
      <label>
        Conversão
        <input value={output ?? ''} type='number' readOnly/>
      </label>

      <select 
        id="saida-dropdown" 
        name="saida" 
        value={outputUnit}
        onChange={handleOutputUnitChange}
      >
        <option value="ml">mL</option>
        <option value="fl_oz">fl Oz</option>
        <option value="gal">gal</option>
        <option value="qt">qt</option>
      </select>
    </div>
  )
}

export default App
