import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const fakeShow = {
    name: 'show name',
    summary: 'here is a summary',
    seasons: [
        {
            name: 'season 1', 
            id: 123,
            episodes: []
        },
        {
            name: 'season 2',
            id: 456,
            episodes: []
        }
            ],

}

test('renders without errors with no props', ()=>{
    render(<Display />);
});

test('renders Show component when the button is clicked ', async ()=>{
    mockFetchShow.mockResolvedValueOnce(fakeShow);
    render(<Display />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{
    mockFetchShow.mockResolvedValueOnce(fakeShow);
    render(<Display />);

    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(2);
    })
});
