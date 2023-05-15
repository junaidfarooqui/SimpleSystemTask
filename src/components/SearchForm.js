import React, { useState, useContext } from 'react';
import { GithubContext } from '../context/GithubContext';

const SearchForm = () => {
    const [username, setUsername] = useState('');
    const { searchUsers } = useContext(GithubContext);

    const handleInputChange = (event) => {
        setUsername(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        searchUsers(username);
    };

    return (
        <form data-testid="search-form" className="row mt-3" onSubmit={handleFormSubmit}>
            <div className="col-12 col-md-5 mb-3">
                <input
                    name="search-user"
                    className="form-control"
                    type="text"
                    placeholder="Search User"
                    value={username}
                    onChange={handleInputChange}
                    required={true}
                />
            </div>
            <div className="col-12 col-md-7 text-start">
                <button className="btn btn-primary" type="submit">Search</button>
            </div>
            <div className="col-12 my-3">
                {username && `Showing users for "${username}"`}
            </div>
        </form>
    );
};

export default SearchForm;