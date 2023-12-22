import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

/*
L'ajout d'options ne fonctionne pas, l'option ne s'affiche pas et le prix n'est pas mise à jour
*/

/*
Le bouton Acheter ajoute une ligne dans la table purchase avec l'option selectionné mais l'id User n'est pas inséré
*/
const PurchasePage = () => {
    const { id } = useParams();
    const [modelData, setModelData] = useState(null);
    const [optionsList, setOptionsList] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const apiUrl = 'http://localhost:3000/model/';
    const optionsApiUrl = 'http://localhost:3000/option/';

    const fetchModelDetails = async () => {
        try {
            const response = await axios.get(`${apiUrl}${id}`);
            setModelData(response.data);

            const optionsResponse = await axios.get(`${optionsApiUrl}`);
            setOptionsList(optionsResponse.data);

            // Update totalPrice with the initial price
            setTotalPrice(response.data.model.price);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchModelDetails();
    }, [id]);

    // Ceci ne fonctionne pas
    const { model } = modelData || {};
    const updateTotalPrice = useCallback(() => {
        const optionsPrice = selectedOptions.reduce((acc, optionId) => {
            const option = optionsList.find(opt => opt.id === optionId);
            return acc + (option ? option.price : 0);
        }, 0);

        setTotalPrice(model?.price + optionsPrice);
    }, [selectedOptions, optionsList, model]);

    useEffect(() => {
        // Call the updateTotalPrice function whenever selectedOptions or optionsList change
        updateTotalPrice();
    }, [updateTotalPrice]);

    const handleAddOption = () => {
        // Update selectedOptions
        setSelectedOptions(Array.from(document.querySelector('select').selectedOptions, (option) => option.value));
    };

    const handlePurchase = async () => {
        try {
            const { userId } = model || {};
            const price = totalPrice || 0;
    
            const response = await axios.post('http://localhost:3000/purchase', {
                modelId: id,
                userId,
                price,
                optionTaken: selectedOptions,
            });
    
            if (response.status === 201) {
                alert('Purchase successful!');
            } else {
                console.error('Error', response.status);
            }
        } catch (error) {
            console.error('Erreur lors de l\'achat', error);
            // Handle error (show error message, etc.)
        }
    };

    return (
        <div className="purchase-page-container">
            <h1>Page d'Achat</h1>
            {modelData && (
                <div>
                    <h2>Details du modèle</h2>
                    <p className="model-details-item">Nom: {model.name}</p>
                    <p className="model-details-item">Places: {model.seat}</p>
                    <p className="model-details-item">Portes: {model.door}</p>
                    <p className="model-details-item">Prix: {model.price}</p>
                </div>
            )}

            <div>
                <h2>Options disponibles</h2>
                <select
                    multiple
                    value={selectedOptions}
                    onChange={(e) => {
                        setSelectedOptions(Array.from(e.target.selectedOptions, (option) => option.value));
                    }}
                >
                    {optionsList.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <button className="go-back-link" onClick={handleAddOption}>
                    Ajouter
                </button>
            </div>
            <div>
                <p>Prix total: {totalPrice}</p>
                <p>Options sélectionnées: {selectedOptions.map(optionId => optionsList.find(opt => opt.id === optionId)?.name).join(', ')}</p>
            </div>

            <button className="go-back-link" onClick={handlePurchase}>Acheter</button>

            <Link to={`/model/${id}`} className="go-back-link">
                Retour aux détails du modèle
            </Link>
        </div>
    );
};

export default PurchasePage;
