import '@testing-library/jest-dom';
import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import LogDetail from '../../../pages/log/[logId]';

// Mock the react-redux useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock the next/router useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));


describe('LogDetail Component', () => {
  it('renders log details correctly', async () => {
    const mockLog = {
      id: '1',
      created: '2022-01-01',
      bot: 'Bot One',
      worker: 'Worker One',
      message: 'Log message',
    };

    // Mock the useDispatch hook
    useDispatch.mockReturnValue(jest.fn());

    // Mock the useSelector hook to return the mockLog
    useSelector.mockReturnValue(mockLog);

    // Mock the useRouter hook to return the logId in the query
    useRouter.mockReturnValue({
      query: { logId: '1' },
    });

    render(<LogDetail />);


    // Wait for the log details to be rendered
    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('2022-01-01')).toBeInTheDocument();
      expect(screen.getByText('Bot One')).toBeInTheDocument();
      expect(screen.getByText('Worker One')).toBeInTheDocument();
      expect(screen.getByText('Log message')).toBeInTheDocument();
    });
  });

  it('renders loading message while fetching log details', () => {
    // Mock the useDispatch hook
    useDispatch.mockReturnValue(jest.fn());

    // Mock the useSelector hook to return null (indicating loading)
    useSelector.mockReturnValue(null);

    // Mock the useRouter hook to return the logId in the query
    useRouter.mockReturnValue({
      query: { logId: '1' },
    });

    render(<LogDetail />);

    expect(screen.getByText('Loading log details...')).toBeInTheDocument();
  });

  it('renders null when log is not available', () => {
    // Mock the useDispatch hook
    useDispatch.mockReturnValue(jest.fn());

    // Mock the useSelector hook to return null (indicating log not available)
    useSelector.mockReturnValue(null);

    // Mock the useRouter hook to return the logId in the query
    useRouter.mockReturnValue({
      query: { logId: '1' },
    });

    render(<LogDetail />);

    expect(screen.queryByText('Log 1')).toBeNull();
  });
});