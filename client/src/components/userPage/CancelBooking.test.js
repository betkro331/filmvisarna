import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CancelBooking from "./CancelBooking";


const mockBooking = {
  movie: { img_poster: "theCreatorPoser.png", title: "The Creator" },
  screening: { date: "2023-12-10", time: "20:00" },
  bookingId: "AAIHOS",
  rows: [{ row: "5" }, { row: "5" }], 
  seats: [{ seatNumber: 40 }, { seatNumber: 41 }], 
  price: 280
};

const mockPerformRequest = jest.fn();
const mockToggle = jest.fn();

// TEST 1
describe('Site for cancelling movie booking', () => {
  it('should render the title of the movie to be cancelled', () => {
    render(<CancelBooking booking={mockBooking} setToggle={mockToggle} performRequest={mockPerformRequest} />);

    // The title occurs several times, check 1st one 
    expect(screen.getAllByText(mockBooking.movie.title)[0]).toBeInTheDocument();
  });

  it('should display movie poster correctly', () => {
    render(<CancelBooking booking={mockBooking} setToggle={mockToggle} performRequest={mockPerformRequest} />);
    
    const posterElem = screen.getByRole('img');
    expect(posterElem).toBeInTheDocument();
    expect(posterElem.src).toMatch(`/img/${mockBooking.movie.img_poster}`);
  });

  it('should render info on the movie to be cancelled', () => {
    render(<CancelBooking booking={mockBooking} setToggle={mockToggle} performRequest={mockPerformRequest} />);

    expect(screen.getByText("BokningsNr:", "AAIHOS")).toBeInTheDocument();
    expect(screen.getByText("Datum:", "2023-12-10")).toBeInTheDocument();
    expect(screen.getByText("Tid:", "20:00:00")).toBeInTheDocument();
    expect(screen.getByText("Salong:", "Stora Salongen")).toBeInTheDocument();
    expect(screen.getByText("Plats:", "40, 41")).toBeInTheDocument();
    expect(screen.getByText("Pris:", "280 kr")).toBeInTheDocument();
  })

  it('should get a warning before cancelling', () => {
    render(<CancelBooking booking={mockBooking} setToggle={mockToggle} performRequest={mockPerformRequest} />);

    expect(screen.getByText("Är du säker på att du vill avboka?")).toBeInTheDocument();
  });

  it('should see the cancel & "tillbaka" button', async () => {
    render(<CancelBooking booking={mockBooking} setToggle={mockToggle} performRequest={mockPerformRequest} />);

    const cancelButton = await screen.findByRole("button", { name: "Avboka", });
    const tillbakaButton = screen.getByRole("button", { name: "Tillbaka" });
  
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toBeEnabled();
    expect(tillbakaButton).toBeInTheDocument();
    expect(tillbakaButton).toBeEnabled();
  }); 
});


