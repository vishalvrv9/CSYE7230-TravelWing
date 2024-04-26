import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import HotelsTab from './HotelsTab';
import HotelTable from './HotelDetails';
import '@testing-library/jest-dom';

jest.mock('./HotelDetails', () => (props) => (
  <div data-testid="hotel-table">
    {props.hotels.map((hotel, index) => (
      <div key={index} data-testid="hotel-offer">
        {hotel.name} - {hotel.location}
      </div>
    ))}
  </div>
));

describe('HotelsTab', () => {
  const mockSetCountry = jest.fn();
  const mockSetStartDate = jest.fn();
  const mockSetEndDate = jest.fn();
  const mockSetTravelers = jest.fn();
  const mockSetHotelOffers = jest.fn();

  beforeEach(() => {
    render(
      <HotelsTab
        setCountry={mockSetCountry}
        setStartDate={mockSetStartDate}
        setEndDate={mockSetEndDate}
        setTravelers={mockSetTravelers}
        setHotelOffers={mockSetHotelOffers}
      />
    );
  });

  it('renders form elements', () => {
    expect(screen.getByLabelText(/select country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/travelers/i)).toBeInTheDocument();
  });

  it('resets form fields when reset button is clicked', () => {
    fireEvent.click(screen.getByText(/reset/i));
    expect(mockSetCountry).toHaveBeenCalledWith('');
    expect(mockSetStartDate).toHaveBeenCalledWith('');
    expect(mockSetEndDate).toHaveBeenCalledWith('');
    expect(mockSetTravelers).toHaveBeenCalledWith('');
  });

  it('displays the hotel table when there are hotel offers', () => {
    render(
      <HotelTable hotels={[{ name: 'Hotel A', location: 'Paris' }]} />
    );
    expect(screen.getByTestId('hotel-table')).toBeInTheDocument();
    expect(screen.getAllByTestId('hotel-offer').length).toBeGreaterThan(0);
  });
});
