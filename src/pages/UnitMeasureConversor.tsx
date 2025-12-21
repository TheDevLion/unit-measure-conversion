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
          minWidth: 420,
          borderRadius: 4,
          padding: 1,
          cursor: "move",
          zIndex: 40,
          background: "linear-gradient(135deg, #A78BFA, #C4B5FD)",
          border: "1px solid rgba(124, 58, 237, 0.45)",
          boxShadow: "0 25px 50px rgba(124, 58, 237, 0.35)",
        }}
      >
        <div className="flex justify-end mb-2">
          <IconButton
            size="small"
            onClick={() => removeConverter(id)}
            sx={{
              color: "#4C1D95",
              "&:hover": {
                color: "#6D28D9",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        <CardContent sx={{ padding: 0 }}>
          <MeasureField converterId={id} />

          <div className="flex gap-5 items-center justify-center my-3">
            <button
              onClick={handleSwitch}
              className="
                text-3xl
                text-[#4C1D95]
                hover:text-[#6D28D9]
                transition-colors
              "
            >
              &#x21D5;
            </button>

            <button
              onClick={handleResetForm}
              className="
                bg-[#7C3AED]
                text-white
                font-semibold
                py-2 px-4
                rounded
                hover:bg-[#6D28D9]
                transition-colors
              "
            >
              Limpar
            </button>
          </div>

          <div className="relative">
            <MeasureField readOnly converterId={id} />

            <div
              className="
                absolute
                top-20 left-[40px]
                flex gap-3
                text-[#4C1D95]
              "
            >
              <button
                onClick={removeDecimals}
                className="hover:text-[#6D28D9] transition-colors"
              >
                &larr;
              </button>

              <button
                onClick={addDecimals}
                className="hover:text-[#6D28D9] transition-colors"
              >
                &rarr;
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Draggable>
  );
};
