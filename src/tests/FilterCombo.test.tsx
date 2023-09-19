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
      <FilterCombo
        options={options}
        onSelectionChanged={onSelectionChanged}
        className=""
      />,
    );
    const pElement = screen.getByText("Filter by Region");
    expect(pElement).toBeInTheDocument();
  });

  test("initially the options dropdown is not shown", () => {
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={onSelectionChanged}
        className=""
      />,
    );

    const optionElements = screen.queryAllByText("option", { exact: false });
    expect(optionElements.length).toBe(0);
  });

  test("initially the chevron down image is shown", () => {
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={onSelectionChanged}
        className=""
      />,
    );

    const chevronDownElement = screen.getByTitle("chevron down");
    expect(chevronDownElement).toBeInTheDocument();
    const chevronUpElement = screen.queryByTitle("chevron up");
    expect(chevronUpElement).not.toBeInTheDocument();
  });

  test("clicking the button shows the options dropdown", () => {
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={onSelectionChanged}
        className=""
      />,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    const optionElements = screen.getAllByText("option", { exact: false });
    expect(optionElements.length).toBe(options.length);
    const checkmarkSvgElements = screen.getAllByTitle("checkmark");
    expect(checkmarkSvgElements.length).toBe(options.length);
  });

  test("clicking the button shows the chevron up svg", () => {
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={onSelectionChanged}
        className=""
      />,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);

    const chevronDownElement = screen.queryByTitle("chevron down");
    expect(chevronDownElement).not.toBeInTheDocument();
    const chevronUpElement = screen.getByTitle("chevron up");
    expect(chevronUpElement).toBeInTheDocument();
  });

  test("clicking the button again hides the options dropdown", () => {
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={onSelectionChanged}
        className=""
      />,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement); // show the dropdown
    fireEvent.click(buttonElement);
    const optionElements = screen.queryAllByText("option", { exact: false });
    expect(optionElements.length).toBe(0);
    const checkmarkSvgElements = screen.queryAllByTitle("checkmark");
    expect(checkmarkSvgElements.length).toBe(0);
  });

  test("clicking away from the options dropdown hides it", () => {
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={onSelectionChanged}
        className=""
      />,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement); // show the dropdown
    fireEvent.mouseDown(document); // useOnClickOutside detects mousedown away from the combo
    const optionElements = screen.queryAllByText("option", { exact: false });
    expect(optionElements.length).toBe(0);
    const checkmarkSvgElements = screen.queryAllByTitle("checkmark");
    expect(checkmarkSvgElements.length).toBe(0);
  });

  test("initially no options are selected", () => {
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={onSelectionChanged}
        className=""
      />,
    );
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);

    // note I tried looking for visibility=hidden attribute but this depends on Tailwind
    // so just had to check the classes
    const checkmarkSvgElements = screen.queryAllByTitle("checkmark");
    checkmarkSvgElements.map((element) => {
      expect(element).toHaveClass("invisible");
    });
  });

  test("clicking on an option makes checkmark visible", () => {
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={onSelectionChanged}
        className=""
      />,
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
    const checkmarkSvgElements = screen.queryAllByTitle("checkmark");
    expect(checkmarkSvgElements[0]).not.toHaveClass("invisible");
    expect(checkmarkSvgElements[1]).toHaveClass("invisible");
    expect(checkmarkSvgElements[2]).toHaveClass("invisible");
    expect(checkmarkSvgElements[3]).toHaveClass("invisible");
  });

  test("clicking on an option again makes checkmark invisible", () => {
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={onSelectionChanged}
        className=""
      />,
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
    const checkmarkSvgElements = screen.queryAllByTitle("checkmark");
    expect(checkmarkSvgElements[0]).not.toHaveClass("invisible");

    fireEvent.click(optionButtonElement as HTMLButtonElement);
    expect(checkmarkSvgElements[0]).toHaveClass("invisible");
  });

  test("clicking on an option fires the callback", () => {
    const mockOnSelectionChanged = vi.fn();
    render(
      <FilterCombo
        options={options}
        onSelectionChanged={mockOnSelectionChanged}
        className=""
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
        className=""
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
