import React, {useState} from 'react';
import Shop from "./App.js";
import Modal

function Cart(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [card, setCard] = useState('');
    const [expire, setExpire] = useState('');
    const [cv, setCV] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');


    const handleName = (e) => {
        const newName = e.target.value;
        setName(newName);
    };

    const handleCard = (e) => {
        const newCard = e.target.value;
        setCard(newCard);
    }

    const handleExpire = (e) => {
        const newExpire = e.target.value;
        setExpire(newExpire);
    }

    const handleCV = (e) => {
        const newCV = e.target.value;
        setCV(newCV);

    }
    const handleEmail = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
    }

    const handleCity = (e) => {
        const newCity = e.target.value;
        setCity(newCity);
        
    }
    const handleState = (e) => {
        const newState = e.target.value;
        setState(newState);
        
    }
    const handleZip = (e) => {
        const newZip = e.target.value;
        setZip(newZip);
        
    }
    const handleAddress = (e) => {
        const newAddress = e.target.value;
        setAddress(newAddress);
        
    }
    const handleAddress2 = (e) => {
        const newAddress2 = e.target.value;
        setAddress2(newAddress2);
        
    }

    return (
        <>
            <header>
                <title>Checkout</title>
            </header>
            <body>
                <div class="container">

                </div>
            </body>
        </>
    )
}