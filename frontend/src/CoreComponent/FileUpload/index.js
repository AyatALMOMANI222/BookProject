import React, { useState, useRef, useEffect } from "react";
import SVG from "react-inlinesvg";
import { linkIcon, deleteIcon } from "../../icons";
import "./style.scss";

const FileUpload = ({
  label = "Upload File",
  allowedExtensions = [], // Allowed file extensions, e.g., ['jpg', 'png']
  required = true,
  inputValue, // Current file value
  setInputValue, // Function to set file value
}) => {
  const fileInputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // Update the image URL when inputValue changes
    if (inputValue) {
      const url = URL.createObjectURL(inputValue);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url); // Clean up URL object when component unmounts or inputValue changes
    } else {
      setImageUrl(null);
    }
  }, [inputValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (
        allowedExtensions.length === 0 ||
        allowedExtensions.includes(fileExtension)
      ) {
        setInputValue(file); // Save the file in the parent state
      } else {
        alert(
          `Invalid file type. Allowed extensions: ${allowedExtensions.join(
            ", "
          )}`
        );
        resetFileInput();
      }
    }
  };

  const resetFileInput = () => {
    setInputValue(null); // Reset the file in the parent state
    fileInputRef.current.value = null; // Reset file input element
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="file-upload-container">
      <label className="file-upload-label">
        {label} {required && <span className="required-star">*</span>}
      </label>
      <input
        ref={fileInputRef}
        type="file"
        className="file-upload-input"
        accept={
          allowedExtensions.length
            ? allowedExtensions.map((ext) => `.${ext}`).join(",")
            : "*"
        }
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div className="file-upload-area" onClick={handleClick}>
        {inputValue ? (
          <span className="file-name">{inputValue.name}</span>
        ) : (
          <span className="file-placeholder">Choose a file</span>
        )}
      </div>
      {imageUrl && (
        <div className="image-preview-container">
          <img src={imageUrl} alt="Preview" className="image-preview" />
          <SVG
            className="delete-icon"
            src={deleteIcon}
            onClick={resetFileInput}
            height={20}
            width={20}
            aria-label="Delete File"
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
