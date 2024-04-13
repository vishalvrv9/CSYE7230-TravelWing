import React from 'react';
import { render, screen } from '@testing-library/react';
import HotelTable from './HotelDetails';

// Sample data for testing
const sampleHotels = Array.from({ length: 12 }, (_, i) => ({
    name: `Hotel ${i + 1}`,
    chainCode: `CC${i + 1}`,
    iataCode: `IATA${i + 1}`,
    hotelId: `HID${i + 1}`,
    geoCode: { latitude: 34 + i, longitude: -118 + i },
    address: { countryCode: 'US' },
    lastUpdate: `2023-04-${i + 1}T12:00:00`
}));

describe('HotelTable', () => {
    test('renders hotel information correctly for given hotels', () => {
        render(<HotelTable hotels={sampleHotels} />);

        // Check if the table displays the correct number of rows (1 header row + 10 data rows)
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(11); // 10 for hotels + 1 for header

        // Check content of the first and last displayed row
        expect(screen.getByText('Hotel 1')).toBeInTheDocument();
        expect(screen.getByText('Hotel 10')).toBeInTheDocument();
        expect(screen.queryByText('Hotel 11')).not.toBeInTheDocument(); // Ensures no more than 10 hotels are displayed
    });

    test('handles empty data gracefully', () => {
        render(<HotelTable hotels={[]} />);
        // Expect only the header row to be present
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(1);
    });
});
