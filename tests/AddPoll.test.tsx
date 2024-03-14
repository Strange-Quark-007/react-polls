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
      expect(screen.getByText("Create a new poll")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Add Poll"));

    await waitFor(() => {
      expect(screen.getByText("Create Poll")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText("Poll Label"), {
      target: { value: mockAddPoll.pollLabel },
    });

    fireEvent.click(screen.getByText("+ Add Question"));

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Question 2")).toBeInTheDocument();
    });

    const options = screen.getAllByText("+ Add Option");
    fireEvent.click(options[0]);
    fireEvent.click(options[1]);

    mockAddPoll.questions.forEach((question, index) => {
      const questionInput = screen.getByPlaceholderText(
        `Question ${index + 1}`
      );
      fireEvent.change(questionInput, {
        target: { value: question.questionLabel },
      });

      question.options.forEach((option, optionIndex) => {
        const optionInput = screen.getAllByPlaceholderText(
          `Option ${optionIndex + 1}`
        )[index];
        fireEvent.change(optionInput, { target: { value: option } });
      });
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("Poll Created!")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(mockAddPoll.pollLabel)).toBeInTheDocument();
    });
  });
});
