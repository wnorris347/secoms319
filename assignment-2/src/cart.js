import React, {useState} from 'react';
import Shop from "./App.js";

function Cart(){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [card, setCard] = useState('');
    const [expire, setExpire] = useState('');
    const [cv, setCv] = useState('');

    const handleName = 


    const printCart = () => {
        <div>
            Bakery Bros
                <div class="row">
                    <div class="col-md-8 cart">
                        <div class="title">
                            <div class="row">
                                <div class="col">
                                    <h4>
                                        Cart
                                    </h4>
                                </div>
                                <div class="col align-self-center text-right text-muted">
                                    Products selected: {cart.length}
                                </div>
                            </div>
                        </div>
                        <div>{listItems}</div>
                    </div>
                    <div class="float-end">
                        <p class="mb-0 me-5 d-flex align-items-center">
                            <span class="small text-muted me-2">Order subtotal: </span>
                            <span class="lead fw-normal">${cartTotal}</span>
                        </p>
                        <p class="mb-0 me-5 d-flex align-items-center">
                            <span class="small text-muted me-2">Sales tax: </span>
                            <span class="lead fw-normal">${(cartTotal * 0.07).toFixed(2)}</span>
                        </p>
                        <p class="mb-0 me-5 d-flex align-items-center">
                            <span class="small text-muted me-2">Order total: </span>
                            <span class="lead fw-normal">${(cartTotal * 1.07).toFixed(2)}</span>
                        </p>
                    </div>
                </div>
            </div>
    }


}