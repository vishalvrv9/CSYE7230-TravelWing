import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './About';
import '@testing-library/jest-dom';

describe('AboutPage', () => {
  it('renders headings', () => {
    render(<AboutPage />);
    
    expect(screen.getByText('Our Features')).toBeInTheDocument();
    expect(screen.getByText('Our Commitment')).toBeInTheDocument();
    expect(screen.getByText('Team Introduction')).toBeInTheDocument();
  });

});
