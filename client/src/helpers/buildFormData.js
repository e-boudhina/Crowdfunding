const buildFormData = (
  formData,
  data,
  parentKey,
) => {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach(key => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key,
      );
    });
  } else if (data instanceof File) {
    formData.append((parentKey).split('[')[0], data);
  } else {
    let value;

    if (data == null) value = '';
    else if (data instanceof Date) value = data.toString();
    else value = data;
    formData.append(parentKey, value);
  }
};

export default buildFormData;
