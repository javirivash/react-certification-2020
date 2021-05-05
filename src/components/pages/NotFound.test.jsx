import React from "react";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
jest.mock("react-router-dom", () => ({
  useLocation: () => ({ pathname: "/badroute" }),
}));

describe("NotFound", () => {
  it("renders Not Found title", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { name: /smart_display Page Not Found/i })
    ).toBeInTheDocument();
  });

  it("renders description including the pathname not found", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", {
        name: /No page matches the route \/badroute/i,
      })
    ).toBeInTheDocument();
  });
});
