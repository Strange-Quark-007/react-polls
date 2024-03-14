import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { mockUsers, mockRegisterUser } from "./mockData";
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

  it("Register", async () => {
    fireEvent.click(screen.getByText("Sign Up"));
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: mockRegisterUser.firstName },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: mockRegisterUser.lastName },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: mockRegisterUser.password },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: mockRegisterUser.password },
    });
    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(screen.getByText("Username already exists")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: mockRegisterUser.username },
    });
    fireEvent.click(screen.getByText("Register"));

    await waitFor(() => {
      expect(
        screen.getByText("User Registered successfully")
      ).toBeInTheDocument();
    });
  });
});
