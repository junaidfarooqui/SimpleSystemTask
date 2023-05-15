import React, { createContext, useState } from 'react';
import { searchUsersByUsername, fetchRepositoriesByUser } from '../services/github';

const GithubContext = createContext();

const GithubContextProvider = ({ children }) => {
    const [repositories, setRepositories] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const searchUsers = async (username) => {
        try {
            const users = await searchUsersByUsername(username);
            setSelectedUser(null); // Reset selectedUser when performing a new search
            setRepositories(users);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const selectUser = async (username) => {
        try {
            const repositories = await fetchRepositoriesByUser(username);
            setSelectedUser({
                username,
                repositories,
            });
        } catch (error) {
            console.error('Error fetching repositories:', error);
        }
    };

    return (
        <GithubContext.Provider value={{ repositories, searchUsers, selectUser, selectedUser }}>
            {children}
        </GithubContext.Provider>
    );
};

export {GithubContextProvider, GithubContext};