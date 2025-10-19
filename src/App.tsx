import { useState, type ChangeEvent } from "react"

function App() {
  const [input, setInput] = useState<number>(0)
  const [output, setOutput] = useState<number>(0)
  const [inputUnit, setInputUnit] = useState<string>("ml")
  const [outputUnit, setOutputUnit] = useState<string>("fl_oz")
  

  const volume_conversion: { [key: string]: number } = {
    fl_oz: 1,
    gal: 128,
    ml: 0.0338140227,
    qt: 32,
  }

  const convert_volume = () => {
    const inputInFlOz = volume_conversion[inputUnit] * input
    const output = inputInFlOz / volume_conversion[outputUnit]
    setOutput(output)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(Number(event.target.value))
  }

  const handleInputUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setInputUnit(event.target.value)
  }
  const handleOutputUnitChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setOutputUnit(event.target.value)
  }

  return (
    <>
      <label>
        Entrada
        <input value={input} onChange={handleInputChange} type='number'/>
      </label>

      <select id="entrada-dropdown" name="entrada" onChange={handleInputUnitChange}>
        <option value="ml">mL</option>
        <option value="fl_oz">fl Oz</option>
        <option value="gal">gal</option>
        <option value="qt">qt</option>
      </select>

      <br />
      <br />
      <label>
        Conversão
        <input value={output} type='number' readOnly/>
      </label>

      <select id="saida-dropdown" name="saida" onChange={handleOutputUnitChange}>
        <option value="ml">mL</option>
        <option value="fl_oz" selected>fl Oz</option>
        <option value="gal">gal</option>
        <option value="qt">qt</option>
      </select>

      <br />
      <br />
      <button onClick={convert_volume}>Converter</button>

    </>
  )
}

export default App
