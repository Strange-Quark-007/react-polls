import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { mockUsers, mockAllPolls } from "./mockData";
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
  localStorage.setItem("allPolls", JSON.stringify(mockAllPolls));

  it("Vote Poll", async () => {
    fireEvent.click(screen.getByText("Sign In"));
    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "user" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText(mockAllPolls[0].pollLabel)).toBeInTheDocument();
      expect(screen.getByText("Vote Now")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Vote Now"));

    fireEvent.click(screen.getByText("Submit Vote"));
    await waitFor(() => {
      expect(
        screen.getByText("Please select all options before submitting.")
      ).toBeInTheDocument();
    });

    mockAllPolls[0].questions.forEach((question) => {
      expect(screen.getByText(question.questionLabel)).toBeInTheDocument();
      question.options.forEach((option) => {
        expect(screen.getByText(option.option)).toBeInTheDocument();
        fireEvent.click(screen.getByText(option.option));
      });
    });

    fireEvent.click(screen.getByText("Submit Vote"));

    await waitFor(() => {
      expect(screen.getByText("Voted")).toBeInTheDocument();
    });
    expect(
      screen.getByText("You have voted for this poll!")
    ).toBeInTheDocument();
    fireEvent.click(screen.getByText("Sign Out"));
  });
});
