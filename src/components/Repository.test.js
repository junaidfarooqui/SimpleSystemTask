import React from 'react';
import { render, screen } from '@testing-library/react';
import Repository from './Repository';

describe('Repository', () => {
    test('should render the repository with name, description, and stars', () => {
        const name = 'example-repo';
        const description = 'This is an example repository';
        const stars = 42;

        render(<Repository name={name} description={description} stars={stars} />);

        const nameElement = screen.getByText(name);
        const descriptionElement = screen.getByText(description);
        const starsElement = screen.getByText(`${stars}`);

        expect(nameElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
        expect(starsElement).toBeInTheDocument();
    });
});
