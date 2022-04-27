import React from "react";
import MediaPickerPreview from "./MediaPickerPreview";
import { useImagePicker } from "./useImagePicker";

const MediaPicker = ({ name, label, onChange, errors, value }) => {
  const { getInputProps, getRootProps, isDragActive, deleteFile, files } =
    useImagePicker({
      value,
      maxFiles: 1,
      onChange,
    });

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        <span className="d-flex justify-content-between align-items-center">
          {label}
        </span>
      </label>
      <div
        {...getRootProps()}
        className={`u-dropzone flex-column ${errors ? `border-danger` : ""}`}
      >
        <input {...getInputProps()} id={name} />
        <div className="d-flex align-items-center">
          <span className="text-center">Click here to upload your image</span>
          <i class="fa fa-upload pl-2" aria-hidden="true" />
        </div>
        {files.length > 0 && (
          <div className="row mt-5">
            {files.map((file, index) => (
              <MediaPickerPreview
                key={file.preview || file.name + index}
                {...{ file, index, deleteFile }}
              />
            ))}
          </div>
        )}
      </div>
      {errors && (
        <div
          data-testid="inputError"
          className="invalid-feedback"
          style={{ display: "block" }}
        >
          {errors.message}
        </div>
      )}
    </div>
  );
};

export default MediaPicker;
