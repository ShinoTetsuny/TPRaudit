// src/pages/HomePage.js
// import React from 'react';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const apiUrl = 'http://localhost:3000/model/';

const Homepage = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        axios.get(apiUrl)
            .then(response => {
                setModels(response.data);
            })
            .catch(error => {
                console.error('Error retrieving models:', error);
            });
    }, []);

    return (
        <div className="Body">
            <header className="Body-header">
                <h1>Models</h1>
            </header>
            <div className="card-container">
                {models.map((model) => (
                    <Link to={`/model/${model.id}`} key={model.id} className="card"> {/* Utilisez Link au lieu de div */}
                    <div key={model.id} className="card">
                        <h2>{model.name}</h2>
                        {/* <img src={model.imageUrl} alt={model.modelName} /> */}
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Homepage;