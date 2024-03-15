import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PieChart from "../src/components/PieChart";
import { mockDataWithVotes, mockDataWithoutVotes } from "./mockData";
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

describe("PieChart", () => {
  it("render with votes", async () => {
    render(<PieChart question={mockDataWithVotes} />);

    const questionLabel = await screen.findByText(
      mockDataWithVotes.questionLabel
    );
    expect(questionLabel).toBeInTheDocument();
    expect(screen.getByText("Total Users voted: 45")).toBeInTheDocument();
  });

  it("render with no votes", async () => {
    render(<PieChart question={mockDataWithoutVotes} />);

    const questionLabel = await screen.findByText(
      mockDataWithoutVotes.questionLabel
    );
    expect(questionLabel).toBeInTheDocument();

    expect(screen.getByText("No Votes")).toBeInTheDocument();
  });
});
