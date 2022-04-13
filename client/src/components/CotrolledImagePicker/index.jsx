import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { get } from "lodash";
import MediaPicker from "./MediaPicker";

const ControlledMediaPicker = ({ name, validate, ...imagePickerProps }) => {
  const formContext = useFormContext();

  const fieldError = get(formContext?.formState.errors, name);
  return (
    <Controller
      rules={validate}
      name={name}
      defaultValue={[]}
      control={formContext.control}
      render={({ field: { onChange, value } }) => (
        <MediaPicker
          name={name}
          {...imagePickerProps}
          value={value}
          onChange={onChange}
          errors={fieldError}
        />
      )}
    />
  );
};

export default ControlledMediaPicker;
