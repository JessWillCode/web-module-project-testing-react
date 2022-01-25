import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';


const fakeEpisode = {
    id: 123,
  image: 'https://i.ibb.co/2FsfXqM/stranger-things.png',
  name: 'The Monster',
  season: 5,
  number: 3,
  summary: 'Here is a summary',
  runtime: '56 min'
}

test("renders without error", () => {
    render(<Episode episode={fakeEpisode}/>);
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={fakeEpisode} />);

    const summary = screen.getByText(/here is a summary/i);

    expect(summary).toBeInTheDocument();
    expect(summary).toBeTruthy();
    expect(summary).toHaveTextContent(/here is a summary/i);
});

test("renders default image when image is not defined", ()=>{
    const fakeEpisodeTwo = {
        id: 123,
  image: null,
  name: 'Under the bed',
  season: 4,
  number: 6,
  summary: 'Here is a summary',
  runtime: '550 min'
    }

    render(<Episode episode={fakeEpisodeTwo}/>);

    const altTag = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');

    expect(altTag).toBeInTheDocument();
});
