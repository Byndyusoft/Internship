import React from "react";

import "@testing-library/jest-dom/extend-expect";
import { render, within, fireEvent } from "@testing-library/react";
import Todo from "./05-todo";
import { post } from "./05-todo-api";

jest.mock("./05-todo-api.js");

// jest.spyOn(window, 'fetch', () => )

test("", () => {
  post.mockResolvedValue({ status: "ok" });

  const { debug, getByTestId } = render(<Todo />);

  const form = getByTestId("registration-form");

  const loginInput = within(form).getByPlaceholderText("login");
  const passwordInput = within(form).getByPlaceholderText("password");
  const sendButton = within(form).getByText("send");

  fireEvent.change(loginInput, { target: { value: "123" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(sendButton);

  debug(form);
});
