// import React from "react";
import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import SearchInput from "../components/SearchInput";

describe("SearchInput component test suite", () => {
  test("renders img and placeholder text", () => {
    render(<SearchInput />);
    const imgElement = screen.getByRole("img");
    expect(imgElement).toBeInTheDocument();
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect((inputElement as HTMLInputElement).placeholder).toBe(
      "Search for a country...",
    );
  });
});
