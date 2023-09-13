import React, { createContext, useMemo, useState } from "react";
import Toaster from "./Toaster";

export const ToasterContext = createContext();

export const ToasterProvider = (props) => {
  const [toaster, setToaster] = useState({
    title: "",
    show: false,
    message: "",
    type: "",
  });

  const showToast = (title, message, type) => {
    setToaster({
      title,
      message,
      type,
      show: true,
    });
  };

  const hideToast = () => {
    setToaster((prevToaster) => ({
      ...prevToaster,
      show: false,
    }));
  };

  const value = useMemo(() => ({ showToast, hideToast }), []);

  return (
    <ToasterContext.Provider value={value}>
      {props.children}
      <Toaster
        title={toaster.title}
        message={toaster.message}
        type={toaster.type}
        showToast={toaster.show}
        onClose={hideToast}
      />
    </ToasterContext.Provider>
  );
};