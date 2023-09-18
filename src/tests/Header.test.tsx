// import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "../components/Header";

describe("Header component test suite", () => {
  test("renders title, svg and dark mode text", () => {
    render(
      <Header
        progressMessage="hello"
        useDarkMode={false}
        onDarkModeChange={() => {}}
      />,
    );
    const h1Element = screen.getByText("Where in the world?");
    expect(h1Element).toBeInTheDocument();
    const moonElement = screen.getByTitle("moon");
    expect(moonElement).toBeInTheDocument();
    const pElement = screen.getByText("Dark mode");
    expect(pElement).toBeInTheDocument();
  });
  test("renders progress message", () => {
    const progressMessage = "progress";
    render(
      <Header
        progressMessage={progressMessage}
        useDarkMode={false}
        onDarkModeChange={() => {}}
      />,
    );
    const pElement = screen.getByText(progressMessage);
    expect(pElement).toBeInTheDocument();
  });
  test("renders light mode text", () => {
    render(
      <Header
        progressMessage=""
        useDarkMode={true}
        onDarkModeChange={() => {}}
      />,
    );
    const p1Element = screen.queryByText("Dark mode");
    const p2Element = screen.getByText("Light mode");
    expect(p1Element).not.toBeInTheDocument();
    expect(p2Element).toBeInTheDocument();
  });
  test("dark mode callback called", () => {
    const onDarkModeChangeHandler = vi.fn();
    render(
      <Header
        progressMessage=""
        useDarkMode={false}
        onDarkModeChange={onDarkModeChangeHandler}
      />,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(onDarkModeChangeHandler).toBeCalled();
  });
});
