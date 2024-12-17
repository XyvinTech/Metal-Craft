import React, { useRef, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Icon from "@mdi/react";
import { mdiUpload } from "@mdi/js";

const FileUpload = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onFileSelect) onFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      if (onFileSelect) onFileSelect(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <Box
      sx={{
        border: "2px dashed #1849D6",
        borderRadius: "8px",
        backgroundColor: isDragging ? "#F5F9FF" : "#ffffff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px",

        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#F5F9FF",
        },
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerFileInput}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Stack
        spacing={1}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Icon path={mdiUpload} size={1} />
        <Typography variant="h5" textAlign={"center"}>
          Browse your files
        </Typography>
        <Typography variant="h6" color="textTertiary">
          {fileName || "Upload Master files of the project"}
        </Typography>
      </Stack>
    </Box>
  );
};

export default FileUpload;
