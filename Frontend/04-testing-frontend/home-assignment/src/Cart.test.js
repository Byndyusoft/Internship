// @flow strict

import * as React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, cleanup, within } from "@testing-library/react";

import Shop from "./Shop";

afterEach(cleanup);

test("Добавление одного товара в корзину увеличивает количество предметов в корзине до одного", async () => {
  const { getByText, getByTestId } = render(<Shop />);

  const itemNode = getByText("Ле Кис-Кис").parentNode;

  const addToCartButton = within(itemNode).getByText("В корзину");

  fireEvent.click(addToCartButton);

  expect(getByTestId("open-cart-button")).toHaveTextContent("(1)");
});

test("Добавление двух товаров", async () => {
  throw new Error("тест не написан(");
});
