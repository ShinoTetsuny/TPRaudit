import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [role, setRole] = useState('');

    // useEffect(() => {
    //     const fetchData = async () => {
    //         let test = Cookies.get('token')
    //     try {
    //         const response = await axios.get(`http://localhost:3000/roles/verify`,{
    //             Body: {
    //                 token: test
    //             }
    //     })
    //         setRole(response.data.role);
    //         console.log(role);
    //     } catch (error) {
    //         console.error(error);
    //     }
    //     };

    //     fetchData();
    // }, []);


    const handleCloseLoginModal = () => setShowLoginModal(false);
    const handleShowLoginModal = () => setShowLoginModal(true);

    const handleCloseSignupModal = () => setShowSignupModal(false);
    const handleShowSignupModal = () => setShowSignupModal(true);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        try {
        const response = await axios.post('http://localhost:3000/authentication/login', {
            email,
            password,
        });

        // Gérer la réponse, par exemple, rediriger l'utilisateur ou mettre à jour l'état de connexion
        console.log('Login successful', response.data);
        Cookies.set('token', response.data.token, { expires: 1 });
        handleCloseLoginModal();
        } catch (error) {
        console.error('Login failed', error);
        // Gérer les erreurs de connexion, par exemple, afficher un message d'erreur à l'utilisateur
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        try {
        const response = await axios.post('http://localhost:3000/authentication/register', {
            name,
            email,
            password,
        });

        // Gérer la réponse, par exemple, rediriger l'utilisateur ou mettre à jour l'état de connexion
        console.log('Registration successful', response.data);
        Cookies.set('token', response.data.token, { expires: 1 });
        handleCloseSignupModal();
        } catch (error) {
        console.error('Registration failed', error);
        // Gérer les erreurs d'inscription, par exemple, afficher un message d'erreur à l'utilisateur
        }
    };

    const handleLogOut = () => {
        Cookies.remove('token');
        window.location.reload();
    }


    return (
        <nav>
        <div className="navbar-container">
            <div className="navbar-left">
            <button><Link to="/">Accueil</Link></button>
            </div>
            <div className="navbar-right">
                {/* {role === 1 ? <button>Administration</button> : ''}
                {role === 1 || role === 2 ? <button>Comptabilité</button> : ''} */}
                <button><Link to="/admin">Administration</Link></button>
                <button><Link to="/accounting">Comptabilité</Link></button>
                {Cookies.get('token') ? <button>Mon Compte</button> : ''}
                {Cookies.get('token') ? <button class="btn btn-danger" onClick={handleLogOut}>Déconnexion</button> : ''}
                {Cookies.get('token') == null ? <button class="btn btn-primary" onClick={handleShowLoginModal}>Se connecter</button> : ''}
                {Cookies.get('token') == null ? <button class="btn btn-primary" onClick={handleShowSignupModal}>S'inscrire</button> : ''}
            </div>
        </div>

        {/* Modal de Connexion */}
        <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
            <Modal.Header closeButton>
                <Modal.Title>Se connecter</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Entrer votre email" id="email"/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" placeholder="Mot de passe" id="password"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    Se connecter
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

        {/* Modal d'Inscription */}
        <Modal show={showSignupModal} onHide={handleCloseSignupModal}>
            <Modal.Header closeButton>
            <Modal.Title>S'inscrire</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSignupSubmit}>
                <Form.Group controlId="formBasicName">
                <Form.Label>Nom</Form.Label>
                <Form.Control type="text" placeholder="Entrer votre nom" id="name"/>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Entrer votre email" id="email"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Mot de passe" id="password"/>
                </Form.Group>

                <Button variant="primary" type="submit">
                S'inscrire
                </Button>
            </Form>
            </Modal.Body>
        </Modal>
        </nav>
    );
};

export default Navbar;
