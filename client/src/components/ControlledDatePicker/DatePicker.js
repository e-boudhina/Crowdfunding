/* eslint-disable react-hooks/exhaustive-deps */
import "react-dates/initialize";
import React, { useEffect, useState } from "react";
import { SingleDatePicker } from "react-dates";

const DatePicker = ({
  name,
  label,
  errors,
  value: initialValue,
  onChange,
  placeholder,
  withFullScreenPortal = false,
}) => {
  const [date, setDate] = useState(initialValue || new Date());

  useEffect(() => {
    onChange(date);

    return () => onChange(undefined);
  }, []);
  useEffect(() => {
    if (errors) {
      document.getElementById(name).classList.add("form-control");
      document.getElementById(name).classList.add("is-invalid");
    }
  }, [errors]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onChange(newDate);
  };
  const isOutsideRange = () => false;
  const id = name;
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`form-group ${errors ? "is-invalid" : ""}`}>
      <label className="form-label" htmlFor={id}>
        <span className="d-flex justify-content-between align-items-center">
          {label}
        </span>
      </label>

      <SingleDatePicker
        placeholder={placeholder}
        date={date}
        onDateChange={handleDateChange}
        focused={isActive}
        onFocusChange={({ focused }) => setIsActive(focused)}
        withFullScreenPortal={withFullScreenPortal}
        numberOfMonths={1}
        hideKeyboardShortcutsPanel
        isOutsideRange={isOutsideRange}
        customCloseIcon={<div>DONE</div>}
        id={id}
      />
      {errors && (
        <div className="invalid-feedback" style={{ display: "block" }}>
          {errors.message}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
