import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './Signup';
import { UserAuthContextProvider } from '../context/UserAuthContext'; // Adjust this import based on your actual file structure

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

// Mock the UserAuthContext
jest.mock('../context/UserAuthContext', () => ({
  useUserAuth: () => ({
    signUp: jest.fn(),
    googleSignIn: jest.fn(),
  }),
}));

describe('Signup', () => {
  test('renders all input fields and buttons', () => {
    render(
      <Router>
        <Signup />
      </Router>
    );

    expect(screen.getByPlaceholderText('Enter your first name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your last name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
    expect(screen.getByText('Sign up with Google')).toBeInTheDocument();
    expect(screen.getByText('Sign up with Facebook')).toBeInTheDocument();
  });

});
