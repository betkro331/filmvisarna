import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingTicketsForm from "./BookingTicketsForm";

const mockUsedNavigate = jest.fn();

// Mock function to replace the useNavigate hook from the react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

window.scrollTo = jest.fn();

// TEST 1
describe('Render button for membership', () => {
  it('should render the "Bli medlem" button when "Är du medlem?" is unchecked', async () => {
    render(<BookingTicketsForm inputValues={{ email: "test@example.com" }} setInputValues={jest.fn()} />);

    const bliMedlemButton = await screen.findByRole("button", {
      name: "Bli medlem",
    });

    expect(bliMedlemButton).toBeInTheDocument();
    expect(bliMedlemButton).toBeValid();
  });


  //TEST 2
  it('should navigate to "/registrera" when "Bli medlem" button is clicked', async () => {
    render(<BookingTicketsForm inputValues={{ email: "test@example.com" }} setInputValues={jest.fn()} />);

    const bliMedlemButton = await screen.findByRole('button', { name: 'Bli medlem' });

    // Simulate a click on the button
    fireEvent.click(bliMedlemButton);

    await waitFor(() => {
      expect(mockUsedNavigate).toHaveBeenCalledWith('/registrera');
    });
  });

 
});
