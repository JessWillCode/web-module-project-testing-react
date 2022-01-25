import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

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

test('renders without errors', ()=>{
    const selectedSeason = 'none';
    render(<Show show={fakeShow} selectedSeason={selectedSeason}/>);
});

test('renders Loading component when prop show is null', () => {
   render(<Show show={null}/>);
   
   const loading = screen.queryByTestId(/loading-container/i);

   expect(loading).toBeInTheDocument();

});


test('renders same number of options seasons are passed in', ()=>{
    const selectedSeason = 'none';
    render(<Show show={fakeShow} selectedSeason={selectedSeason} />);


    const allSeasonsSelected = screen.getAllByTestId(/season-option/i);

    expect(allSeasonsSelected).toHaveLength(2);
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();
    const selectedSeason = 'none';
    render(<Show show={fakeShow} selectedSeason={selectedSeason} handleSelect={handleSelect}/>);

    const select = screen.getByLabelText(/select a season/i);
    userEvent.selectOptions(select, ['123']);

    expect(handleSelect).toBeCalled();
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const selectedSeason = 'none';
    const { rerender} = render(<Show show={fakeShow} selectedSeason={selectedSeason} />);

    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();

    rerender(<Show show={fakeShow} selectedSeason={1} />);
    episodes = screen.queryByTestId('episodes-container');
    expect(episodes).toBeInTheDocument();
});
