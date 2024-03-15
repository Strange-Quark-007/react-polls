import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { mockUsers, mockAllPolls, mockAddPoll } from "./mockData";
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

  it("Add Poll", async () => {
    fireEvent.click(screen.getByText("Sign In"));
    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "admin" },
    });
    fireEvent.change(screen.getByPlaceholderText("password"), {
      target: { value: "admin" },
    });
    fireEvent.click(screen.getByText("Login"));

    await waitFor(() => {
      expect(screen.getByText("Login successful")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(mockAllPolls[0].pollLabel)).toBeInTheDocument();
    });
    expect(screen.getByText("View Details")).toBeInTheDocument();
    expect(screen.getByText("Close Poll")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Close Poll"));

    await waitFor(() => {
      expect(
        screen.getByText("Are you sure you want to close the poll?")
      ).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Yes"));

    await waitFor(() => {
      expect(screen.getByText("Closed")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("View Details"));

    await waitFor(() => {
      expect(screen.getByText(mockAllPolls[0].pollLabel)).toBeInTheDocument();
    });

    mockAllPolls[0].questions.forEach((question) => {
      expect(
        screen.getAllByText(question.questionLabel)[0]
      ).toBeInTheDocument();
      question.options.forEach((option) => {
        expect(screen.getByText(option.option)).toBeInTheDocument();
      });
    });

    expect(screen.getByText("No Votes")).toBeInTheDocument();
  });
});
