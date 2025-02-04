import React from "react";
import Select from "react-select";
import Box from "@mui/material/Box";

const StyledSelectField = ({
  placeholder,
  isDisabled,
  options,
  onChange,
  value,
  isMulti,
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      height: "auto",
      padding: "3px",
      border: "1px solid rgba(0, 0, 0, 0.2)",
      borderRadius: "6px",
      backgroundColor: "#ffffff",
      color: "#000000",
      boxShadow: state.isFocused ? "0 0 0 2px #fff" : "none",
      cursor: "pointer",
      "&:hover": {
        borderColor: "rgba(0, 0, 0, 0.2)",
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#042F61" : "transparent",
      color: state.isFocused ? "#ffffff" : "#000000",
      cursor: "pointer",
      ":active": {
        backgroundColor: "#042F61",
      },
    }),
    menu: (provided) => ({
      ...provided,
      position: "absolute",
      backgroundColor: "#ffffff",
      color: "#B5B8C5",
      fontSize: "12px",

      zIndex: 1000,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDisabled ? "#a0a0a0" : "#000000",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#8E8E8E",
      fontSize: "12px",
    }),
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Select
        placeholder={placeholder}
        options={options}
        onChange={onChange}
        value={value}
        isMulti={isMulti}
        isDisabled={isDisabled}
        styles={customStyles}
      />
    </Box>
  );
};

export default StyledSelectField;
