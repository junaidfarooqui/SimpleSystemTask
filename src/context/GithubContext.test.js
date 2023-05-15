import React from 'react';
import { render, screen } from '@testing-library/react';
import { GithubContextProvider, GithubContext } from './GithubContext';

describe('GithubContextProvider', () => {
    test('provides initial state', () => {
        render(
            <GithubContextProvider>
                <GithubContext.Consumer>
                    {({ repositories, searchUsers, selectUser, selectedUser }) => (
                        <>
                            <div data-testid="repositories">{repositories.length}</div>
                            <div data-testid="searchUsers">{typeof searchUsers}</div>
                            <div data-testid="selectUser">{typeof selectUser}</div>
                            <div data-testid="selectedUser">{selectedUser?.username}</div>
                        </>
                    )}
                </GithubContext.Consumer>
            </GithubContextProvider>
        );

        expect(screen.getByTestId('repositories').textContent).toBe('0');
        expect(screen.getByTestId('searchUsers').textContent).toBe('function');
        expect(screen.getByTestId('selectUser').textContent).toBe('function');
        expect(screen.getByTestId('selectedUser').textContent).toBe('');
    });

    test('provides updated state', () => {
        const repositories = [{ id: 1, name: 'Repo 1' }, { id: 2, name: 'Repo 2' }];
        const searchUsers = jest.fn();
        const selectUser = jest.fn();
        const selectedUser = { username: 'john_doe', repositories };

        render(
            <GithubContext.Provider value={{ repositories, searchUsers, selectUser, selectedUser }}>
                <GithubContext.Consumer>
                    {({ repositories, searchUsers, selectUser, selectedUser }) => (
                        <>
                            <div data-testid="repositories">{repositories.length}</div>
                            <div data-testid="searchUsers">{typeof searchUsers}</div>
                            <div data-testid="selectUser">{typeof selectUser}</div>
                            <div data-testid="selectedUser">{selectedUser?.username}</div>
                        </>
                    )}
                </GithubContext.Consumer>
            </GithubContext.Provider>
        );

        expect(screen.getByTestId('repositories').textContent).toBe('2');
        expect(screen.getByTestId('searchUsers').textContent).toBe('function');
        expect(screen.getByTestId('selectUser').textContent).toBe('function');
        expect(screen.getByTestId('selectedUser').textContent).toBe('john_doe');
    });
});
