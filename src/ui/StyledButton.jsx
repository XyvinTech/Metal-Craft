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
    `}
  ${(props) =>
    props.variant === "filterPrimary" &&
    css`
      border: 1px solid rgba(4, 47, 97, 1);
      font-size: 14px;
      font-weight: 400;
      color: rgba(4, 47, 97, 1);
      min-width: 130px;
      background-color: #e8ebf0;
      border-radius: 120px;
    `}
     ${(props) =>
    props.variant === "filterSecondary" &&
    css`
      border: 1px solid rgba(0, 0, 0, 0.12);
      font-size: 14px;
      font-weight: 400;
      min-width: 130px;
      color: rgba(0, 0, 0, 0.12);

      background-color: #fff;
      border-radius: 120px;
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
