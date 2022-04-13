import Axios from "axios";
import getImageUrl from "./getImageUrl";

const acceptedExtensions = ["jpg", "jpeg", "png"];

export const initializeImagePicker = async (newFiles) => {
  const promiseArray = newFiles.map(async (el, index) => {
    try {
      const response = (
        await Axios.get(getImageUrl(el), { responseType: "blob" })
      ).data;
      const mimeType = response.type;
      const extension = mimeType.split("/")[1];

      if (!acceptedExtensions.includes(extension))
        throw new Error("File is not accepted");
      const file = new File(
        [response],
        `${new Date().getTime() + index}.${extension}`,
        {
          type: mimeType,
        }
      );

      return Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    } catch (error) {
      return null;
    }
  });

  return (await Promise.all(promiseArray)).filter((file) => file !== null);
};
