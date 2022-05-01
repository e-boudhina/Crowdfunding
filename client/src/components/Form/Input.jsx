import * as React from "react";
import { get } from "lodash";
import { useFormContext } from "react-hook-form";

const Input = ({
  id,
  name,
  label,
  labelColor,
  type,
  forgotPasswordLink,
  rightIcon,
  leftIcon,
  forgotPasswordMessage,
  validate,
  noMarginBot,
  inputClassName,
  readOnly,
  ...props
}) => {
  const formContext = useFormContext();

  const fieldError = get(formContext?.formState.errors, name);

  return (
    <div
      data-testid="inputFormGroup"
      className={`${!noMarginBot ? "form-group" : ""} ${
        fieldError ? "u-has-error" : ""
      }`}
    >
      {label && (
        <label className={`form-label text-${labelColor}`} htmlFor={id}>
          <span className="d-flex justify-content-between align-items-center">
            {label}
          </span>
        </label>
      )}

      <div className="input-group">
        {leftIcon && (
          <div className="input-group-prepend">
            <span
              className={`input-group-text 
            ${fieldError ? "border-danger" : ""}
            `}
              id="basic-addon2"
            >
              {leftIcon}
            </span>
          </div>
        )}
        {type === "textarea" ? (
          <textarea
            {...props}
            {...formContext.register(name, validate)}
            name={name}
            className={`form-control ${fieldError ? "is-invalid" : ""}`}
          />
        ) : (
          <input
            readOnly={readOnly}
            name={name}
            {...props}
            {...formContext.register(name, validate)}
            className={`form-control ${inputClassName || ""} ${
              fieldError ? "is-invalid" : ""
            }`}
          />
        )}
        {rightIcon && (
          <div className="input-group-append">
            <span
              className={`input-group-text 
            ${fieldError ? "border-danger" : ""}
            `}
              id="basic-addon2"
            >
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      {fieldError && (
        <div
          data-testid="inputError"
          className="invalid-feedback"
          style={{ display: "block" }}
        >
          {fieldError.message}
        </div>
      )}
    </div>
  );
};

export default Input;
