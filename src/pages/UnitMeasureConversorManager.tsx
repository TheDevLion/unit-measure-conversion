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
          color="primary"
          aria-label="adicionar"
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
          onClick={() => addConverter()}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
};
