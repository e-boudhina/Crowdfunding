import { isEqual } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { initializeImagePicker } from "../../helpers/initializeImagePicker";

export const useImagePicker = ({ value, maxFiles, onChange }) => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFiles((prev) => [
        ...prev,
        ...acceptedFiles
          .filter((_file, index) => prev.length + index + 1 <= maxFiles)
          .map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
      ]);
    },
    [maxFiles]
  );

  useEffect(() => {
    if (isEqual(files, value)) return;
    const initImagePicker = async () => {
      const _value = typeof value === "string" ? [value] : value;

      if (!_value) return;

      const initialFiles = await initializeImagePicker(
        _value.filter((el) => typeof el === "string")
      );

      setFiles(initialFiles);
    };

    initImagePicker();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (isEqual(files, value)) return;

    onChange?.(files);
  }, [files, onChange, value]);

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept: "image/jpeg, image/png,pdf",
  });

  const deleteFile = (index) => {
    setFiles((prev) => prev.filter((_file, i) => index !== i));
  };

  return { getRootProps, getInputProps, isDragActive, deleteFile, files };
};
