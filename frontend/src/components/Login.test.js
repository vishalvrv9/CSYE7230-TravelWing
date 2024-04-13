import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import { UserAuthContextProvider } from '../context/UserAuthContext'; // Adjust this import based on your actual file structure

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the UserAuthContext
jest.mock('../context/UserAuthContext', () => ({
  useUserAuth: () => ({
    logIn: jest.fn(),
    googleSignIn: jest.fn(),
  }),
}));

describe('Login', () => {
  test('renders correctly', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByText('Welcome Back to TravelWing!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByText('Log in with Google')).toBeInTheDocument();
  });

  
});
