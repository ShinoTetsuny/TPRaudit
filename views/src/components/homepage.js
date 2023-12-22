import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const apiUrl = 'http://localhost:3000/model/';

/* const generateCarImage = () => {
    // Remplacez cette URL par celle de votre image de voiture ou utilisez une API appropriée
    return 'https://example.com/car-image.jpg';
}; */

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
        <div className="homepage-container">
            <header className="homepage-header">
                <h1>Models</h1>
            </header>
            <div className="card-container">
                {models.map((model) => (
                    <Link to={`/model/${model.id}`} key={model.id} className="card">
                        <h2 className="model-name">{model.name}</h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Homepage;