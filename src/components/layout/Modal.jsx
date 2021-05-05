import React from "react";
import { useAppContext } from "../../context/app/appContext";
import AriaModal from "react-aria-modal";
import LoginView from "../pages/LoginView";

const Modal = () => {
  const { deactivateLogin } = useAppContext();

  return (
    <AriaModal
      titleText="loginModal"
      verticallyCenter={true}
      initialFocus="#email"
      underlayStyle={{ paddingTop: "2em" }}
      onExit={deactivateLogin}
    >
      <LoginView />
    </AriaModal>
  );
};

export default Modal;
