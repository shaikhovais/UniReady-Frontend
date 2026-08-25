import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  TextField,
  type TextFieldProps,
} from "@mui/material";

interface NumberInputFieldProps
  extends Omit<
    TextFieldProps,
    "value" | "onChange" | "type"
  > {
  value: number;
  onValueChange?: (value: number) => void;
  onBlurValueChange?: (value: number) => void;
  emptyValue?: number;
  allowDecimal?: boolean;
  startAdornment?: ReactNode;
}

const NumberInputField = ({
  value,
  onValueChange,
  onBlurValueChange,
  emptyValue = 0,
  allowDecimal = true,
  slotProps,
  startAdornment,
  ...props
}: NumberInputFieldProps) => {
  const [inputValue, setInputValue] = useState(
    value === 0 ? "" : String(value),
  );

  useEffect(() => {
    setInputValue(
      value === 0 ? "" : String(value),
    );
  }, [value]);

  const handleChange = (nextValue: string) => {
    if (allowDecimal) {
      if (!/^\d*\.?\d*$/.test(nextValue)) {
        return;
      }
    } else {
      if (!/^\d*$/.test(nextValue)) {
        return;
      }
    }

    setInputValue(nextValue);

    onValueChange?.(
      nextValue === ""
        ? emptyValue
        : Number(nextValue),
    );
  };

  const handleBlur = () => {
    const parsedValue =
      inputValue === ""
        ? emptyValue
        : Number(inputValue);

    onBlurValueChange?.(parsedValue);
  };

  return (
    <TextField
      {...props}
      type="text"
      value={inputValue}
      onChange={(event) =>
        handleChange(event.target.value)
      }
      onBlur={handleBlur}
      slotProps={{
        ...slotProps,
        input: {
          ...(slotProps?.input ?? {}),
          inputMode: allowDecimal
            ? "decimal"
            : "numeric",
          startAdornment,
        },
      }}
    />
  );
};

export default NumberInputField;