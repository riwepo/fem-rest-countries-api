// import React from "react";
import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import FilterCombo from "../components/FilterCombo";

describe("FilterCombo component test suite", () => {
  const options = ["option1", "option2", "option3", "option4"];
  const onSelectionChanged = () => {};
  test("renders text", () => {
    render(
      <FilterCombo options={options} onSelectionChanged={onSelectionChanged} />,
    );
    const pElement = screen.getByText("Filter by Region");
    expect(pElement).toBeInTheDocument();
  });

  test("initially the options dropdown is not shown", () => {
    render(
      <FilterCombo options={options} onSelectionChanged={onSelectionChanged} />,
    );

    const optionElements = screen.queryAllByText("option", { exact: false });
    expect(optionElements.length).toBe(0);
  });

  test("initially the chevron down image is shown", () => {
    render(
      <FilterCombo options={options} onSelectionChanged={onSelectionChanged} />,
    );

    const chevronDownElement = screen.getByAltText("chevron down");
    expect(chevronDownElement).toBeInTheDocument();
    const chevronUpElement = screen.queryByAltText("chevron up");
    expect(chevronUpElement).not.toBeInTheDocument();
  });

  test("clicking the button shows the options dropdown", () => {
    render(
      <FilterCombo options={options} onSelectionChanged={onSelectionChanged} />,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    const optionElements = screen.getAllByText("option", { exact: false });
    expect(optionElements.length).toBe(options.length);
    const checkmarkImageElements = screen.getAllByAltText("checkmark");
    expect(checkmarkImageElements.length).toBe(options.length);
  });

  test("clicking the button shows the chevron up image", () => {
    render(
      <FilterCombo options={options} onSelectionChanged={onSelectionChanged} />,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);

    const chevronDownElement = screen.queryByAltText("chevron down");
    expect(chevronDownElement).not.toBeInTheDocument();
    const chevronUpElement = screen.getByAltText("chevron up");
    expect(chevronUpElement).toBeInTheDocument();
  });

  test("initially no options are selected", () => {
    render(
      <FilterCombo options={options} onSelectionChanged={onSelectionChanged} />,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);

    // note I tried looking for visibility=hidden attribute but this depends on Tailwind
    // so just had to check the classes
    const checkmarkImageElements = screen.queryAllByAltText("checkmark");
    checkmarkImageElements.map((element) => {
      expect(element).toHaveClass("invisible");
    });
  });

  test("clicking on an option makes checkmark visible", () => {
    render(
      <FilterCombo options={options} onSelectionChanged={onSelectionChanged} />,
    );
    const dropdownButtonElement = screen.getByRole("button");
    expect(dropdownButtonElement).toBeInTheDocument();
    fireEvent.click(dropdownButtonElement);

    const option1Element = screen.getByText("option1");
    const optionButtonElement = option1Element.closest("button");
    expect(optionButtonElement).toBeInTheDocument();
    fireEvent.click(optionButtonElement as HTMLButtonElement);

    // note I tried looking for visibility=hidden attribute but this depends on Tailwind
    // so just had to check the classes
    const checkmarkImageElements = screen.queryAllByAltText("checkmark");
    expect(checkmarkImageElements[0]).not.toHaveClass("invisible");
    expect(checkmarkImageElements[1]).toHaveClass("invisible");
    expect(checkmarkImageElements[2]).toHaveClass("invisible");
    expect(checkmarkImageElements[3]).toHaveClass("invisible");
  });

  test("clicking on an option again makes checkmark invisible", () => {
    render(
      <FilterCombo options={options} onSelectionChanged={onSelectionChanged} />,
    );
    const dropdownButtonElement = screen.getByRole("button");
    expect(dropdownButtonElement).toBeInTheDocument();
    fireEvent.click(dropdownButtonElement);

    const option1Element = screen.getByText("option1");
    const optionButtonElement = option1Element.closest("button");
    expect(optionButtonElement).toBeInTheDocument();
    fireEvent.click(optionButtonElement as HTMLButtonElement);

    // note I tried looking for visibility=hidden attribute but this depends on Tailwind
    // so just had to check the classes
    const checkmarkImageElements = screen.queryAllByAltText("checkmark");
    expect(checkmarkImageElements[0]).not.toHaveClass("invisible");

    fireEvent.click(optionButtonElement as HTMLButtonElement);
    expect(checkmarkImageElements[0]).toHaveClass("invisible");
  });

  test("clicking on an option fires the callback", () => {
    const mockOnSelectionChanged = vi.fn();
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={mockOnSelectionChanged}
      />,
    );
    const dropdownButtonElement = screen.getByRole("button");
    expect(dropdownButtonElement).toBeInTheDocument();
    fireEvent.click(dropdownButtonElement);

    const option1Element = screen.getByText("option1");
    const optionButtonElement = option1Element.closest("button");
    expect(optionButtonElement).toBeInTheDocument();
    fireEvent.click(optionButtonElement as HTMLButtonElement);

    expect(mockOnSelectionChanged).toBeCalledWith("option1");
  });

  test("clicking on an option again fires the callback with empty string", () => {
    const mockOnSelectionChanged = vi.fn();
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={mockOnSelectionChanged}
      />,
    );
    const dropdownButtonElement = screen.getByRole("button");
    expect(dropdownButtonElement).toBeInTheDocument();
    fireEvent.click(dropdownButtonElement);

    const option1Element = screen.getByText("option1");
    const optionButtonElement = option1Element.closest("button");
    expect(optionButtonElement).toBeInTheDocument();
    fireEvent.click(optionButtonElement as HTMLButtonElement);

    fireEvent.click(optionButtonElement as HTMLButtonElement);
    expect(mockOnSelectionChanged).toBeCalledWith("");
  });
});
