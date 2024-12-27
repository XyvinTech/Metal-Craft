import React from "react";
import styled, { css } from "styled-components";

const buttonVariants = css`
  ${(props) =>
    props.variant === "primary" &&
    css`
      border: none;
      font-size: 14px;
      font-weight: 400;
      color: #f8f8f8;
      background-color: #042f61;
      border-radius: 6px;
      min-width: 160px;
    `} ${(props) =>
    props.variant === "pdf" &&
    css`
      border: none;
      font-size: 14px;
      font-weight: 400;
      color: #f8f8f8;
      background-color: #00b6a9;
      border-radius: 6px;
      min-width: 120px;
    `}
      ${(props) =>
    props.variant === "download" &&
    css`
      border: none;
      font-size: 14px;
      font-weight: 400;
      color: #f8f8f8;
      background-color: #5580d4;
      border-radius: 6px;
      min-width: 120px;
    `}
  ${(props) =>
    props.variant === "secondary" &&
    css`
      border: 1px solid #e2e8f0;
      font-size: 14px;
      font-weight: 400;
      color: #1e293b;
      background-color: #fff;
      border-radius: 6px;
      min-width: 160px;
    `}
    ${(props) =>
      props.variant === "danger" &&
      css`
        border: none;
        font-size: 14px;
        font-weight: 400;
        color: #f8f8f8;
        background-color:#B3261E;
        border-radius: 6px;
        min-width: 160px;
      `}
`;

const disabledStyles = css`
  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

const ButtonContainer = styled.button`
  padding: 10px 20px;
  text-align: center;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ${buttonVariants}
  ${disabledStyles}
`;

export const StyledButton = ({ name, variant, color, onClick, disabled }) => {
  return (
    <ButtonContainer
      variant={variant}
      color={color}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </ButtonContainer>
  );
};
