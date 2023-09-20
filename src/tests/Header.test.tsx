// import React from "react";
import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Header from "../components/Header";

import { DisplayMode } from "../helpers/interfaces";

describe("Header component test suite", () => {
  test("renders title, svg and dark mode text", () => {
    render(
      <Header
        progressMessage="hello"
        selectedDisplayMode={DisplayMode.Light}
        onDisplayModeToggle={() => {}}
      />,
    );
    const h1Element = screen.getByText("Where in the world?");
    expect(h1Element).toBeInTheDocument();
    const moonElement = screen.getByRole("img");
    expect(moonElement).toBeInTheDocument();
    const pElement = screen.getByText("Dark mode");
    expect(pElement).toBeInTheDocument();
  });
  test("renders progress message", () => {
    const progressMessage = "progress";
    render(
      <Header
        progressMessage={progressMessage}
        selectedDisplayMode={DisplayMode.Light}
        onDisplayModeToggle={() => {}}
      />,
    );
    const pElement = screen.getByText(progressMessage);
    expect(pElement).toBeInTheDocument();
  });
  test("renders dark mode text", () => {
    render(
      <Header
        progressMessage=""
        selectedDisplayMode={DisplayMode.Light}
        onDisplayModeToggle={() => {}}
      />,
    );
    const p1Element = screen.getByText("Dark mode");
    const p2Element = screen.queryByText("Light mode");
    expect(p1Element).toBeInTheDocument();
    expect(p2Element).not.toBeInTheDocument();
  });
  test("display mode toggle callback called", () => {
    const onDisplayModeToggleHandler = vi.fn();
    render(
      <Header
        progressMessage=""
        selectedDisplayMode={DisplayMode.Light}
        onDisplayModeToggle={onDisplayModeToggleHandler}
      />,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(onDisplayModeToggleHandler).toBeCalled();
  });
});
