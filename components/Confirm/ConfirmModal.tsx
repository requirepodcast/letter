import React from "react";
import styled from "styled-components";
import { Option, OptionType } from "./ConfirmProvider";

const ModalWrapper = styled.div`
  height: 100vh;
  background-color: #000000dd;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Modal = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.bg.dark};
  border-radius: 10px;
  margin: 5px;
  border: 2px solid ${({ theme }) => theme.red};
  max-width: 400px;
  font-size: 14px;
`;

const Button = styled.button`
  cursor: pointer;
  font-size: 12px;
  padding: 5px 10px;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 4px;
  background: ${({ theme, light }) => (light ? theme.bg.light : theme.bg.medium)};
  appearance: none;
  --webkit-appearance: none;
  color: ${({ theme }) => theme.fg};
  font-family: inherit;
  border: none;
  box-shadow: none;
  transition: box-shadow 0.3s ease;
  outline: none;

  &:hover {
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.red};
  }

  &:focus {
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.red};
  }
`;

type ConfirmModalProps = {
  message: string;
  options: Option[];
  onConfirm: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, options, onConfirm }) => {
  return (
    <ModalWrapper>
      <Modal>
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
        <div style={{ textAlign: "right" }}>
          {options.map(option => (
            <Button
              light={option.type === OptionType.Positive}
              onClick={() => {
                onConfirm();
                option.handler();
              }}
              key={option.label}>
              {option.label}
            </Button>
          ))}
        </div>
      </Modal>
    </ModalWrapper>
  );
};

export default ConfirmModal;
