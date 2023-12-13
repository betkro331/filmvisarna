import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingTicketsForm from "./BookingTicketsForm";

// Mock function to replace the useNavigate hook from the react-router-dom
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

// To allow the test to control window scrolls
window.scrollTo = jest.fn();


// TEST 1
describe('A first small test for rendering correctly', () => {
  it('Check render', async () => {
    render(<BookingTicketsForm inputValues={{ email: "hej@hej.se" }} setInputValues={jest.fn()} />);
    expect(true).toBe(true);
  });
});

// TEST 2
describe('BookingTicketsForm', () => {
  it('render the form for contact details', async () => {
    render(<BookingTicketsForm inputValues={{}} setInputValues={jest.fn()} />);

    const emailInput = screen.getByText("Fyll i mailadress");

    expect(emailInput).toBeInTheDocument();
    expect(emailInput.tagName).toBe("LABEL");
    expect(emailInput.htmlFor).toBe("email");
    
    const reEmailInput = screen.getByText("Bekräfta mailadress");

    expect(reEmailInput).toBeInTheDocument();
    expect(reEmailInput.tagName).toBe("LABEL");
    expect(reEmailInput.htmlFor).toBe("re-email");

    const phoneInput = screen.getByText("Mobiltelefon")

    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput.tagName).toBe("LABEL");
    expect(phoneInput.htmlFor).toBe("email");
  });
});

// TEST 3
describe('Confirmation Email', () => {
  it('Should display error message for invalid email address', async () => {
    render(<BookingTicketsForm inputValues={{ email: "kalleanka" }} setInputValues={jest.fn()} />);

    const bokaButton = screen.getByRole('button', {
      cssSelector: 'button.m-auto.mb-10.w-36.rounded.bg-gold.px-6.py-2.text-black',
    });

    fireEvent.click(bokaButton)
      // Simulate user submission of the form
    await waitFor(() => {
        expect(screen.findByText("Din bokning har genomförts men vi hade problem att skicka ett mail till din epost")).toBeInTheDocument; 
    });
  });
});

 
