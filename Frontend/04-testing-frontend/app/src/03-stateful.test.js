import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

import Calculator from "./03-stateful";

test("Counts sum of 2 and 1", () => {
  const { container, getByPlaceholderText, getByText } = render(<Calculator />);

  const firstInput = getByPlaceholderText("первое слагаемое");
  const secondInput = getByPlaceholderText("второе слагаемое");

  fireEvent.change(firstInput, { target: { value: "1" } });
  fireEvent.change(secondInput, { target: { value: "2" } });

  const button = getByText("посчитать");

  fireEvent.click(button);

  expect(container).toHaveTextContent("Сумма: 3");
});
