// import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Card from "../components/Card";

describe("Card component test suite", () => {
  test("renders child", () => {
    render(
      <Card className="fred">
        <h1>Heading</h1>
      </Card>,
    );
    const headingElement = screen.getByText("Heading");
    expect(headingElement).toBeInTheDocument();
  });
  test("className is passed on", () => {
    render(
      <Card className="fred">
        <h1>Heading</h1>
      </Card>,
    );
    const headingElement = screen.getByText("Heading");
    const divElement = headingElement.closest("div");
    expect(divElement).toBeInTheDocument();
    expect(divElement).toHaveClass("fred");
  });
});
