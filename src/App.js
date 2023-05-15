import React, { useState } from 'react';
import Accordion from './components/Accordion';
import Repository from './components/Repository';
import SearchForm from './components/SearchForm';
import { GithubContextProvider, GithubContext } from './context/GithubContext';
import { fetchRepositoriesByUser } from './services/github';

const App = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const selectUser = async (username) => {
        try {
            const repositories = await fetchRepositoriesByUser(username);
            setSelectedUser({ username, repositories });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <GithubContextProvider>
            <div className="container">
                <h1 className="mt-4">Github Repository Search</h1>
                <SearchForm />
                <div className="accordion" id="accordionExample">
                    <GithubContext.Consumer>
                        {({ repositories }) =>
                            repositories?.map((user) => (
                                <Accordion key={user.id} title={user.login} selectUser={selectUser}>
                                    {selectedUser && selectedUser.username === user.login && (
                                        <div className="row">
                                            {selectedUser.repositories.map((repository) => (
                                                <Repository
                                                    key={repository.id}
                                                    name={repository.name}
                                                    description={repository.description}
                                                    stars={repository.stargazers_count}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </Accordion>
                            ))
                        }
                    </GithubContext.Consumer>
                </div>
            </div>
        </GithubContextProvider>
    );
};

export default App;