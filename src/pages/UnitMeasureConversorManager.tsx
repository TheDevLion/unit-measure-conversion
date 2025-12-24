import { useConverters, useAddConverter } from "../store/hooks";
import { UnitMeasureConversor } from "./UnitMeasureConversor";

import type { ConverterState } from "../store/type";

import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export const UnitMeasureConversorManager = () => {
  const converters = useConverters();
  const addConverter = useAddConverter();

  return (
  <>
    {converters.map((c: ConverterState) => (
      <UnitMeasureConversor key={c.id} id={c.id} />
    ))}

    <Tooltip title="Adicionar um novo card de conversão">
      <Fab
        aria-label="adicionar"
        onClick={() => addConverter()}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,

          background: "linear-gradient(135deg, #7C3AED, #A78BFA)",
          color: "#FFFFFF",

          boxShadow: "0 12px 30px rgba(124, 58, 237, 0.45)",

          "&:hover": {
            background: "linear-gradient(135deg, #6D28D9, #8B5CF6)",
          },
        }}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  </>
);
}