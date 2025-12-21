import { useMemo, type ChangeEvent } from "react";
import {
  useConverterInput,
  useSetConverterInput,
  useConverterOutput,
  useSetConverterOutput,
} from "../../store/hooks";
import { convertValue } from "../../helpers/convert_values";
import { Autocomplete, TextField } from "@mui/material";
import { CONVERSIONS_V2 } from "../../constants";
import type { Option } from "../../core/UnitPicker";

export type MeasureFieldProps = {
  readOnly?: boolean;
  converterId: string;
};

export const MeasureField = ({ readOnly, converterId }: MeasureFieldProps) => {
  const input = useConverterInput(converterId);
  const output = useConverterOutput(converterId);

  const setInput = useSetConverterInput();
  const setOutput = useSetConverterOutput();

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === "" && !readOnly) {
      setInput(converterId, { value: "" });
      return;
    }

    const parsed = Number(value);
    if (!isNaN(parsed) && !readOnly) {
      setInput(converterId, { value: parsed });
    }
  };

  const handleUnitChange = (_: React.SyntheticEvent, value: Option | null) => {
    if (!value) return;

    const unit = value.abbv;

    if (readOnly) {
      setOutput(converterId, { unit });
    } else {
      setInput(converterId, { unit });
    }
  };

  const buildAutocompleteOptions = (): Option[] => {
    let units = CONVERSIONS_V2;

    if (readOnly) {
      const inputUnitObj = CONVERSIONS_V2.find((c) => c.abbv === input.unit);
      units = units.filter((u) => u.category === inputUnitObj?.category);
    }

    return units
      .filter((unit) => unit.category !== "random")
      .map((unit) => ({
        title: `(${unit.abbv.replace("_", " ")}) - ${unit.name}`,
        abbv: unit.abbv,
        category: unit.category,
      }));
  };

  const options = useMemo(() => buildAutocompleteOptions(), [input.unit, output.unit]);
  const selectedUnitOption =
    options.find((o) => (!readOnly ? o.abbv === input.unit : o.abbv === output.unit)) || null;

  return (
    <div className="flex p-5 w-[450px] justify-center align-center">
      <input
        className="mx-1 border-2 border-black px-2 rounded-sm"
        value={
          readOnly
            ? convertValue(input.value, input.unit, output.unit, output.precision)
            : input.value
        }
        onChange={handleValueChange}
        type="number"
        placeholder={!readOnly ? "Value to be converted" : "Result"}
        readOnly={readOnly}
      />

      <Autocomplete
        onChange={handleUnitChange}
        options={options}
        groupBy={(option: Option) => option.category}
        getOptionLabel={(option) => option.title}
        value={selectedUnitOption}
        renderInput={(params) => <TextField {...params} label="Unit" />}
        renderOption={(props, option) => (
          <li {...props} className="px-3 py-2 text-xs cursor-pointer hover:bg-gray-200">
            {option.title}
          </li>
        )}
        className="w-[350px]"
        ListboxProps={{
          sx: {
            "& .MuiAutocomplete-groupLabel": {
              fontWeight: "bold",
              textTransform: "capitalize",
              fontSize: "0.875rem",
              px: 1,
              py: 1,
            },
          },
        }}
      />
    </div>
  );
};
