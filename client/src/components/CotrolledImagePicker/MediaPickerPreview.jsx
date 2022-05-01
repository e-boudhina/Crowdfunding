import React from "react";

const MediaPickerPreview = ({
  file: { name, preview, size },
  deleteFile,
  index,
}) => {
  const handlePictureClick = (event, index, fn) => {
    event.stopPropagation();
    fn(index);
  };
  const caluclateFileSize = (fileSize) => {
    if (fileSize < 1024) return `${fileSize} B`;
    if (fileSize < 1024 * 1024) return `${(fileSize / 1024).toFixed(2)} KB`;
    if (fileSize < 1024 * 1024 * 1024)
      return `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;

    return `${(fileSize / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };
  return (
    <div className="col h-100 mb-5" data-testid="imagePickerPreviewTestId">
      <div className="dz-preview dz-file-preview">
        <span
          tabIndex={index}
          role="button"
          onClick={(event) => handlePictureClick(event, index, deleteFile)}
          onKeyDown={(event) => handlePictureClick(event, index, deleteFile)}
          className="d-flex justify-content-end dz-close-icon"
        >
          <small className="fa fa-times" />
        </span>

        <div className="dz-details media">
          <div className="dz-img">
            <img className="img-fluid" alt="upload" src={preview} />
          </div>
          <div className="media-body dz-file-wrapper">
            <h6 className="dz-filename">
              <span className="dz-title">{name}</span>
            </h6>
            <div className="dz-size">{caluclateFileSize(size)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPickerPreview;
