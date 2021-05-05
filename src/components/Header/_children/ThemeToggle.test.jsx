import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AppContext from "../../../context/app/appContext";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  const toggleTheme = jest.fn();
  const renderComponent = (contextValue = {}) => {
    render(
      <AppContext.Provider
        value={{
          toggleTheme,
          ...contextValue,
        }}
      >
        <ThemeToggle />
      </AppContext.Provider>
    );
  };

  it("toggles the theme every time it's clicked", () => {
    renderComponent();
    userEvent.click(screen.getByRole("button"));
    userEvent.click(screen.getByRole("button"));
    userEvent.click(screen.getByRole("button"));
    userEvent.click(screen.getByRole("button"));
    expect(toggleTheme).toHaveBeenCalledTimes(4);
  });
});
