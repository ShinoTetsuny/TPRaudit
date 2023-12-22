import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const apiUrl = 'http://localhost:3000/model/';

const ModelDetails = () => {
    const { id } = useParams();
    const [modelData, setModelData] = useState(null);

    useEffect(() => {
        const fetchModelDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}${id}`);
                setModelData(response.data);
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        };
        fetchModelDetails();
    }, [id]);

    if (!modelData) {
        return <div>Loading...</div>;
    }

    // console.log(modelData);

    const { model, options } = modelData;

    return (
        <div className="model-details-container">
            <h1 className="model-details-title">Model Details</h1>
            <p className="model-details-item">ID: {model.id}</p>
            <p className="model-details-item">Name: {model.name}</p>
            <p className="model-details-item">Seat: {model.seat}</p>
            <p className="model-details-item">Door: {model.door}</p>
            <p className="model-details-item">Price: {model.price}</p>
            <p className="model-details-item">Engine ID: {model.engineId}</p>
            {/* Display other details of the model as needed */}
            
            <h2 className="model-details-subtitle">Options</h2>
            {options.map((option) => (
                <div key={option.id} className="model-option-container">
                    <p className="model-details-item">Option ID: {option.id}</p>
                    {/* Display other details of the option as needed */}
        </div>
    ))}
        
        <Link to="/" className="go-back-link">Go back to homepage</Link>
    </div>
    );
};

export default ModelDetails;
