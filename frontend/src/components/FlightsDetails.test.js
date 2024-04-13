import React from 'react';
import { render, screen } from '@testing-library/react';
import FlightTable from './FlightsDetails';

const sampleFlights = [
  {
    itineraries: [{
      segments: [
        {
          number: "AB123",
          departure: { iataCode: "LAX", at: "2023-10-15T08:00:00" },
          arrival: { iataCode: "NYC", at: "2023-10-15T16:00:00" }
        }
      ],
      duration: "PT8H",
    }],
    price: { total: "350", currency: "USD" },
    travelerPricings: [{
      fareDetailsBySegment: [{
        cabin: "Economy",
        includedCheckedBags: { quantity: "1" }
      }]
    }]
  }
];

describe('FlightTable', () => {
  it('renders flight details correctly for given flights', () => {
    render(<FlightTable flights={sampleFlights} />);

    // Check if the table displays the correct number of rows (1 header row + 1 data row)
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(2);

    // Check content of each cell
    expect(screen.getByText('AB123')).toBeInTheDocument();
    expect(screen.getByText('LAX NYC')).toBeInTheDocument();
    expect(screen.getByText('2023-10-15T08:00:00 2023-10-15T16:00:00')).toBeInTheDocument();
    expect(screen.getByText('PT8H')).toBeInTheDocument();
    expect(screen.getByText('350 USD')).toBeInTheDocument();
    expect(screen.getByText('Economy')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('Book Flight Tickets')).toBeInTheDocument();
  });

  it('checks the link URL format', () => {
    render(<FlightTable flights={sampleFlights} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', expect.stringContaining('https://www.skyscanner.com/transport/flights/LAX/NYC/231015/231015/'));
  });

  it('handles empty data gracefully', () => {
    render(<FlightTable flights={[]} />);
    // Expect only the header row to be present
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1);
  });
});
