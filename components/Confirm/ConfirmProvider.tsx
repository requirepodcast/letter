import React, { useContext, useState } from "react";
import ConfirmModal from "./ConfirmModal";

const ConfirmContext = React.createContext<{
  confirm?: (message: string, options: Option[]) => void;
}>({});

export enum OptionType {
  Positive,
  Negative,
}

export type Option = {
  label: string;
  handler: () => void;
  type?: OptionType;
};

const ConfirmProvider: React.FC = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [options, setOptions] = useState<Option[]>([]);

  function confirm(message: string, options: Option[]) {
    setMessage(message);
    setOptions(options);
    setShow(true);
  }

  function onConfirm() {
    setShow(false);
    setMessage("");
    setOptions([]);
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {show && <ConfirmModal options={options} message={message} onConfirm={onConfirm} />}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => useContext(ConfirmContext);

export default ConfirmProvider;
