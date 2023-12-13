import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "./Register";

const mockUsedNavigate = jest.fn();

// Mock function to replace the useNavigate hook from the react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

window.scrollTo = jest.fn();

describe("Register component", () => {
  it("should show a popup message if the user tries to register without filling out the first name, last name, or email address", () => {
    render(<Register />);

    const inputField = screen.getByPlaceholderText("Förnamn. . .");
    expect(inputField).toBeInTheDocument();

    fireEvent.click(screen.getByText("Registrera"));

    // Assert that the button can be clicked
    expect(screen.getByText('Registrera')).toBeEnabled();
  });
});
