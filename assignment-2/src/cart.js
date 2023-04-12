import React, {useState} from 'react';
import Shop from "./App.js";

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

    
}