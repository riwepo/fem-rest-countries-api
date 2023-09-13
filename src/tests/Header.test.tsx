// import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "../components/Header";

describe("Header component test suite", () => {
  test("renders title, img and dark mode text", () => {
    render(<Header />);
    const h1Element = screen.getByText("Where in the world?");
    expect(h1Element).toBeInTheDocument();
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    const pElement = screen.getByText("Dark mode");
    expect(pElement).toBeInTheDocument();
  });
});
