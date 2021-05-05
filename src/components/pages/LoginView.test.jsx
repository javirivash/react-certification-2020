import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppContext from "../../context/app/appContext";
import LoginView from "./LoginView";

describe("LoginView", () => {
  const deactivateLogin = jest.fn();
  const signUpUser = jest.fn();
  const logInUser = jest.fn();

  const renderComponent = (contextValue = {}) => {
    render(
      <AppContext.Provider
        value={{
          deactivateLogin,
          signUpUser,
          logInUser,
          ...contextValue,
        }}
      >
        <LoginView />
      </AppContext.Provider>
    );
  };

  describe("Sign up form", () => {
    it("initially renders Sign up form for new users", () => {
      renderComponent();
      const signUpHeading = screen.getByRole("heading", {
        name: /Enter a new email and password/i,
      });
      expect(signUpHeading).toBeInTheDocument();
    });

    it("calls signUpUser with email and password values", () => {
      renderComponent();
      const someEmail = "someemail@example.com";
      const somePassword = "S4fePassw0rd.";
      userEvent.type(screen.getByPlaceholderText("Email"), someEmail);
      userEvent.type(screen.getByPlaceholderText("Password"), somePassword);
      userEvent.click(screen.getByRole("button", { name: /Sign up/i }));
      expect(signUpUser).toHaveBeenCalledWith(someEmail, somePassword);
    });

    it("switches to the Log in form by clicking the toggle", () => {
      renderComponent();
      userEvent.click(screen.getByRole("button", { name: /Log in/i }));
      const logInHeading = screen.getByRole("heading", {
        name: /Enter your email and password/i,
      });
      expect(logInHeading).toBeInTheDocument();
    });

    it("calls deactivateLogin when clicking the close button", () => {
      renderComponent();
      userEvent.click(screen.getByRole("button", { name: /close/i }));
      expect(deactivateLogin).toHaveBeenCalled();
    });
  });

  describe("Log in form", () => {
    it("calls logInUser with email and password values", () => {
      renderComponent();
      const email = "knownemail@example.com";
      const password = "S4f3RP4ssw0rd$";
      userEvent.click(screen.getByRole("button", { name: /Log in/i }));
      userEvent.type(screen.getByPlaceholderText("Email"), email);
      userEvent.type(screen.getByPlaceholderText("Password"), password);
      userEvent.click(screen.getByRole("button", { name: /Log in/i }));
      expect(logInUser).toHaveBeenCalled();
    });

    it("switches back to the Sign up form by clicking the toggle", () => {
      renderComponent();
      userEvent.click(screen.getByRole("button", { name: /Log in/i }));
      userEvent.click(screen.getByRole("button", { name: /Sign up/i }));
      const signUpHeading = screen.getByRole("heading", {
        name: /Enter a new email and password/i,
      });
      expect(signUpHeading).toBeInTheDocument();
    });
  });
});
