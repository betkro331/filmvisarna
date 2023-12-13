import { render, screen } from "@testing-library/react";
import ConfirmBooking from "./ConfirmBooking";

// Mock function to replace the useNavigate hook from the react-router-dom
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

window.scrollTo = jest.fn();

// TEST 1
test('renders ConfirmBooking component and displays booked movie details', () => {
  // Mock data for the ConfirmBooking component
  const bookingMock = {
    customerEmail: 'hello@hello.com',
    price: 140,
    ticketType: {
      adult: 2
    },
    rows: [{ row: 5 }, { row: 5 }],
    seats: [{ seatNumber: 40 }, { seatNumber: 41 }]
  };

  const movieMock = {
    title: 'The Creator',
    genre: 'Sci-Fi, Action, Thriller',
    ageRestriction: 15
  };

  const screeningMock = {
    theaterName: 'Stora Salongen',
    date: '2023-12-10T20:00:00.000Z'
  };

  // Create local variable to store the mock data
  const bookingResult = bookingMock;

  render(<ConfirmBooking bookingResult={bookingResult} movie={movieMock} screening={screeningMock} />);

  const listElems = screen.getAllByRole('listitem');
  expect(listElems).toHaveLength(9);

  expect(screen.getByText("Film:", "The Creator" )).toBeInTheDocument();
  expect(screen.getByText("Sci-Fi, Action, Thriller")).toBeInTheDocument();
  expect(screen.getByText("Rad:", "5, 5")).toBeInTheDocument();
  expect(screen.getByText("Plats:", "40, 41")).toBeInTheDocument();
  expect(screen.getByText("Datum:", "Lördag 10:e december")).toBeInTheDocument();
  expect(screen.getByText("Salong:", "Stora Salongen")).toBeInTheDocument();
  expect(screen.getByText("Pris:", "140")).toBeInTheDocument();
  expect(screen.getByText("Epost:", "hello@hello.com")).toBeInTheDocument();
});
