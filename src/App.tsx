import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { microOperation, OPERATION_ENUM } from "./helpers/micro_operations"

function App() {
  const [input, setInput] = useState<number | string>('')
  const [output, setOutput] = useState<number | string>('')
  const [inputUnit, setInputUnit] = useState<string>("ml")
  const [outputUnit, setOutputUnit] = useState<string>("fl_oz")

  const inputFieldRef = useRef<HTMLInputElement | null>(null)
  
  useEffect(() => {
    convert_volume()
  }, [input, inputUnit, outputUnit])

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

  const handleResetForm = () => {
    setInput('')
    inputFieldRef?.current?.focus()
  }

  return (
    <div className="flex items-center justify-center flex-col p-10">

      <div className="flex p-5 rounded-sm min-w-[450px] justify-center">
        <input 
          className="mx-5 border-2 border-black px-2 rounded-sm" 
          value={input ?? ''} 
          onChange={handleInputChange} 
          type='number'
          placeholder="Valor a ser convertido"
          ref={inputFieldRef}
        />

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
      </div>

      <button   
        className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-300 transition-colors"
        onClick={handleResetForm}
      >
        Limpar
      </button>

      <div className="flex p-5 rounded-sm min-w-[450px] justify-center" >
          <input 
            className="mx-5 border-2 border-black px-2 rounded-sm" 
            value={output ?? ''} 
            type='number' 
            readOnly
            placeholder="Resultado"
          />
        

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
    </div>
  )
}

export default App
