import React from 'react';

const Repository = ({ name, description, stars }) => {
    return (
        <div className="col-12 col-md-6 col-lg-4 mb-4" data-testid={`Repo ` + stars}>
            <div className="card shadow-sm p-3 mb-5 bg-white rounded h-100">
                <h5>{name}</h5>
                <span className="repo-star text-end"><i className="bi bi-star-fill" /> {stars}</span>
                <p className="col-12">{description}</p>
            </div>
        </div>
    );
};

export default Repository;