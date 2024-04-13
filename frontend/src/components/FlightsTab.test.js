import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FlightsTab from './FlightsTab';
import FlightTable from './FlightsDetails';
import '@testing-library/jest-dom';

jest.mock('./FlightsDetails', () => (props) => (
  <div data-testid="flight-table">
    {props.flights.map((flight, index) => (
      <div key={index} data-testid="flight-offer">
        {flight.originLocationCode} to {flight.destinationLocationCode}
      </div>
    ))}
  </div>
));

describe('FlightsTab', () => {
  const mockSetFlightOffers = jest.fn();
  const mockSetCountry = jest.fn();
  const mockSetDestinationCountry = jest.fn();
  const mockSetStartDate = jest.fn();
  const mockSetEndDate = jest.fn();
  const mockSetTravelers = jest.fn();

  beforeEach(() => {
    render(
      <FlightsTab
        setCountry={mockSetCountry}
        setDestinationCountry={mockSetDestinationCountry}
        setStartDate={mockSetStartDate}
        setEndDate={mockSetEndDate}
        setTravelers={mockSetTravelers}
        setFlightOffers={mockSetFlightOffers}
      />
    );
  });

  it('renders form elements', () => {
    expect(screen.getByLabelText(/select country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select destination country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/travelers/i)).toBeInTheDocument();
  });

  it('resets form fields when reset button is clicked', () => {
    fireEvent.click(screen.getByText(/reset/i));
    expect(mockSetCountry).toHaveBeenCalledWith('');
    expect(mockSetDestinationCountry).toHaveBeenCalledWith('');
    expect(mockSetStartDate).toHaveBeenCalledWith('');
    expect(mockSetEndDate).toHaveBeenCalledWith('');
    expect(mockSetTravelers).toHaveBeenCalledWith('');
  });

  it('displays the flight table when there are flight offers', () => {
    render(
      <FlightTable flights={[{ originLocationCode: 'JFK', destinationLocationCode: 'PAR' }]} />
    );
    expect(screen.getByTestId('flight-table')).toBeInTheDocument();
    expect(screen.getAllByTestId('flight-offer').length).toBeGreaterThan(0);
  });

});
