import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Navbar';
import { UserAuthContextProvider } from '../context/UserAuthContext'; // Adjust this import based on your actual file structure

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' })
}));

// Mock the UserAuthContext
jest.mock('../context/UserAuthContext', () => ({
  useUserAuth: () => ({
    user: null,
    logOut: jest.fn().mockResolvedValue(),
    setUser: jest.fn()
  }),
}));

describe('Navbar', () => {
  test('renders non-authenticated links', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    expect(screen.getByText('TravelWing')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Itinerary')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });

});
