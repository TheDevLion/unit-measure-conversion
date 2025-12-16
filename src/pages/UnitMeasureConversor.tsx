import { useRef } from "react"
import { MeasureField } from "../components/MeasureField/MeasureField"
import { useInput, useIsSwitching,useOutput, useSetInput } from "../store/hooks"

export const UnitMeasureConversor = () => {
  const inputFieldRef = useRef<HTMLInputElement | null>(null)

  const input = useInput()
  const setInput = useSetInput()

  const outputHook = useOutput()
  
  const {setIsSwitching} = useIsSwitching()
  
  const handleResetForm = () => {
    setInput({ value: '', unit: ''})
    inputFieldRef?.current?.focus()
  }


const handleSwitch = () => {
    setIsSwitching(true); 

    const prevInput = { ...input };
    const prevOutput = { ...outputHook.output };

    setInput({
        value: prevOutput.value,
        unit: prevOutput.unit,
    });

    outputHook.setOutput({
        value: prevInput.value, 
        unit: prevInput.unit,
        precision: prevOutput.precision, 
    });

    requestAnimationFrame(() => {
        setIsSwitching(false); 
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

return (
  <div className="flex flex-col items-center justify-center p-10 gap-6">

    {/* 1. CAMPO DE ENTRADA (Input + Unit Select) */}
    {/* Envolve o MeasureField para limitar a largura da linha superior */}
    <div className="w-[450px]">
      <MeasureField />
    </div>

    {/* 2. BOTÕES DE AÇÃO (Trocar e Limpar) */}
    <div className="flex items-center gap-5">
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

    {/* 3. CAMPO DE RESULTADO (Result + Unit Select) */}
    {/* Envolve o MeasureField para limitar a largura da linha inferior */}
    <div className="w-[450px]">
      <MeasureField readOnly />
      
      {/* Botões de Decimais, reposicionados para baixo do campo de Resultado */}
      <div className="flex gap-3 mt-2 ml-1"> {/* Ajuste a margem se necessário */}
        <button onClick={removeDecimals}>&larr;</button>
        <button onClick={addDecimals}>&rarr;</button>
      </div>
    </div>
  </div>
);

}


