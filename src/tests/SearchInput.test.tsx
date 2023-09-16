// import React from "react";
import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SearchInput from "../components/SearchInput";

describe("SearchInput component test suite", () => {
  const onSearchChanged = (search: string) => {
    () => {
      search;
    }; // noop
  };
  test("renders img and placeholder text", () => {
    render(<SearchInput onSearchChanged={onSearchChanged} />);
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect((inputElement as HTMLInputElement).placeholder).toBe(
      "Search for a country...",
    );
  });
  test("callback called on enter key", () => {
    const enteredValue = "fred";
    const onSearchChanged = vi.fn();
    render(<SearchInput onSearchChanged={onSearchChanged} />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, {
      target: { value: enteredValue },
    });
    fireEvent.keyDown(inputElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    expect(onSearchChanged).toBeCalledWith(enteredValue);
  });
});
