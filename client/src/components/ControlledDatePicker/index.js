import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { get } from "lodash";
import DatePicker from "./DatePicker";
import "./style.scss";

const ControlledDatePicker = ({
  label,
  name,
  validate,
  placeholder,
  ...dateTimePickerProps
}) => {
  const formContext = useFormContext();

  const fieldError = get(formContext?.formState.errors, name);
  return (
    <Controller
      rules={validate}
      name={name}
      control={formContext.control}
      defaultValue=""
      render={({ field: { onChange, value } }) => {
        return (
          <DatePicker
            placeholder={placeholder}
            withFullScreenPortal
            label={label}
            name={name}
            {...dateTimePickerProps}
            onChange={onChange}
            value={value}
            errors={fieldError}
          />
        );
      }}
    />
  );
};

export default ControlledDatePicker;
