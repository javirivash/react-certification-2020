import React from "react";
import { render, screen } from "@testing-library/react";
import AppContext from "../../context/app/appContext";
import { currentUser } from "../../utils/testMocks";
import { MemoryRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

describe("PrivateRoute", () => {
  const MockComponent = () => {
    return <h1>Renders Alright!</h1>;
  };
  const renderComponent = (contextValue = {}) => {
    render(
      <AppContext.Provider
        value={{
          currentUser,
          ...contextValue,
        }}
      >
        <MemoryRouter>
          <PrivateRoute component={MockComponent} />
        </MemoryRouter>
      </AppContext.Provider>
    );
  };

  it("renders component when there is an user logged in", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: /Renders Alright!/i })
    ).toBeInTheDocument();
  });

  it("does not render the component when there is no user logged in", () => {
    renderComponent({ currentUser: {} });
    expect(
      screen.queryByRole("heading", { name: /Renders Alright!/i })
    ).not.toBeInTheDocument();
  });
});
