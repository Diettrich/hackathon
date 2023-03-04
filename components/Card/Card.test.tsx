import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./index";

describe("Card component", () => {
  const props = {
    firstname: "John",
    lastname: "Doe",
    goal: 5000,
    salary: 2500,
    devise: "$",
    pictureURl: "https://example.com/image.jpg",
  };

  test("renders the component with correct data", () => {
    render(<Card {...props} />);

    const name = screen.getByTestId("card-name");
    const goal = screen.getByTestId("card-goal");
    const salary = screen.getByTestId("card-salary");
    const picture = screen.getByTestId("card-picture");

    expect(name).toHaveTextContent("John Doe");
    expect(goal).toHaveTextContent("Goal: 5000 $");
    expect(salary).toHaveTextContent("Salary: 2500 $");
    expect(picture).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fexample.com%2Fimage.jpg&w=640&q=75"
    ); // since its a Next Image component, Later we can add a sanitizer to get it ready from a function
    expect(picture).toHaveAttribute("alt", "John Doe");
  });

  test("renders the component with animation", () => {
    render(<Card {...props} />);

    const container = screen.getByTestId("card-container");

    expect(container).toHaveStyle("opacity: 0");

    setTimeout(() => {
      expect(container).toHaveStyle("opacity: 1");
    }, 1000);
  });

  test("matches snapshot", () => {
    const { container } = render(<Card {...props} />);
    expect(container).toMatchSnapshot();
  });
});
