import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";

import Sum from "./02-component";

test("Renders sum of 2 and 1", () => {
  const { container } = render(<Sum param1={1} param2={2} />);

  expect(container).toHaveTextContent("The sum is 3");
});

test("Tests that sum is 24", () => {
  const { container } = render(<Sum param1={20} param2={4} />);

  expect(container).toHaveTextContent("The sum is 24");
});
