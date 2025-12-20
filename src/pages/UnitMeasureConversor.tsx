import { useRef } from "react";
import { MeasureField } from "../components/MeasureField/MeasureField";

import {
  useConverter,
  useSetConverterInput,
  useConverterOutput,
  useSetConverterOutput,
  useSetConverterPosition,
  useRemoveConverter,
} from "../store/hooks";

import { convertValue } from "../helpers/convert_values";
import { CONVERSIONS_V2 } from "../constants";

import Draggable from "react-draggable";
import { Card, CardContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  id: string;
};

export const UnitMeasureConversor = ({ id }: Props) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const converter = useConverter(id);
  const setInput = useSetConverterInput();
  const output = useConverterOutput(id);
  const setOutput = useSetConverterOutput();
  const setPosition = useSetConverterPosition();
  const removeConverter = useRemoveConverter();

  if (!converter) return null;
  
  const handleResetForm = () => {
    setInput(id, { value: "", unit: "" });
  };

  const handleSwitch = () => {
    const inputUnitObj = CONVERSIONS_V2.find((u) => u.abbv === converter.input.unit);
    if (!inputUnitObj) return;

    const outputUnitObj = CONVERSIONS_V2.find((u) => u.abbv === output.unit);
    if (!outputUnitObj) return;

    const newInputValue = convertValue(
      converter.input.value,
      converter.input.unit,
      outputUnitObj.abbv,
      output.precision
    );

    if (newInputValue === "" || isNaN(Number(newInputValue))) return;

    setInput(id, {
      unit: outputUnitObj.abbv,
      value: Number(newInputValue),
    });

    setOutput(id, {
      unit: converter.input.unit,
    });
  };

  const addDecimals = () => {
    setOutput(id, { precision: output.precision + 1 });
  };

  const removeDecimals = () => {
    if (output.precision > 1) setOutput(id, { precision: output.precision - 1 });
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      bounds="body"
      defaultPosition={converter.position}
      onStop={(_, data) => {
        setPosition(id, { x: data.x, y: data.y });
      }}
    >
      <Card
        ref={nodeRef}
        sx={{
          position: "fixed",
          padding: .5,
          minWidth: 420,
          borderRadius: 3,
          boxShadow: 4,
          cursor: "move",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
          <IconButton size="small" onClick={() => removeConverter(id)}>
            <CloseIcon />
          </IconButton>
        </div>

        <CardContent sx={{ padding: 0 }} >
          <MeasureField converterId={id} />

          <div className="flex gap-5 items-center justify-center">
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
            <MeasureField readOnly converterId={id} />

            <div className="absolute top-20 left-[40px] flex gap-2">
              <button onClick={removeDecimals}>&larr;</button>
              <button onClick={addDecimals}>&rarr;</button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Draggable>
  );
};
