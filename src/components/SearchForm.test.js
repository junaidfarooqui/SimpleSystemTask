import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from './SearchForm';
import { GithubContext } from '../context/GithubContext';

describe('SearchForm', () => {
    test('should render the search form and handle form submission', () => {
        const searchUsersMock = jest.fn();
        render(
            <GithubContext.Provider value={{ searchUsers: searchUsersMock }}>
                <SearchForm />
            </GithubContext.Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search User');
        const username = 'john.doe';

        fireEvent.change(searchInput, { target: { value: username } });
        fireEvent.submit(screen.getByTestId('search-form'));

        expect(searchUsersMock).toHaveBeenCalledTimes(1);
        expect(searchUsersMock).toHaveBeenCalledWith(username);
    });
});