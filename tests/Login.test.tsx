import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { mockUsers } from "./mockData";
import App from "../src/App";
import "@testing-library/jest-dom/vitest";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Main", () => {
  render(<App />);
  localStorage.setItem("users", JSON.stringify(mockUsers));

  it("Login & Logout", async () => {
    fireEvent.click(screen.getByText("Sign In"));
    const usernameInput = screen.getByPlaceholderText("username");
    const passwordInput = screen.getByPlaceholderText("password");
    const login = screen.getByText("Login");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    fireEvent.change(usernameInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "user" } });
    fireEvent.click(login);
    await waitFor(() => {
      expect(screen.getByText("User not found")).toBeInTheDocument();
    });

    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "admin" } });
    fireEvent.click(login);
    await waitFor(() => {
      expect(screen.getByText("Incorrect password")).toBeInTheDocument();
    });

    fireEvent.change(usernameInput, { target: { value: "user" } });
    fireEvent.change(passwordInput, { target: { value: "user" } });
    fireEvent.click(login);
    await waitFor(() => {
      const signout = screen.getByText("Sign Out");
      expect(signout).toBeInTheDocument();
      fireEvent.click(signout);
      expect(screen.getByText("Sign In")).toBeInTheDocument();
    });
  });
});
