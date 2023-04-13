
import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import items from "./data.json";
import {Products} from "./Products.js";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Modal from "react-modal";

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [ProductsCategory, setProductsCategory] = useState(items);
    const [query, setQuery] = useState("");
    const [show, setShow] = useState(false);

    const hideModal = () => setShow(false);
    const showModal = () => setShow(true);

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

    useEffect(() => {
        total();
    }, [cart]);

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++){
            totalVal += parseFloat(cart[i].price.toFixed(2));
        }
        setCartTotal(totalVal.toFixed(2));
    };

    const addToCart = (el) => {
        setCart([...cart, el]);
    }

    const removeFromCart = (el) => {
        let itemFound = false;
        const cartCopy = cart.filter((item) =>{
            if(item.id === el.id && !itemFound){
                itemFound = true;
                return false;
            }
            return true;
        });
        if(itemFound){
            setCart(cartCopy);
        }
    }

    const productsInCart = items.filter(item => {cart.includes(item.id);});

    function howManyofThis(id){
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    const cartItems = productsInCart.map(el => (
        <div class="row border-top border-bottom">
                <div class="row main align-items-center">
                    <div class="col 2">
                        <img class="img-fluid" src={el.image}/>
                    </div>
                    <div class="col">
                        <div class="row text-muted">{el.productName}</div>
                        <div class="row">{el.description}</div>
                    </div>
                    <div class="col">
                        {howManyofThis(el.id)}
                    </div>
                    <div class="col">
                        ${(el.price * howManyofThis(el.id)).toFixed(2)};
                    </div>
                </div>
            </div>
    ));

    const handleChange = (e) => {
        setQuery(e.target.value);
        const results = Products.filter(product =>{
            if(e.target.value === ""){
                return ProductsCategory;
            }else{
                return product.productName.toLowerCase().includes(e.target.value.toLowerCase());
            }
        });
        setProductsCategory(results);
    }

    const render_products = (ProductsCategory) => {
        return(
            <div>
                <h2 className="text-3x1 font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
                <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 x1:gap-x-10" style={{maxHeight: '800px', overflowY: 'scroll'}}>
                    {ProductsCategory.map((product, index) => (
                        <div key={index} classNameclassName="group relative shadow-lg" >
                            <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-70 lg:aspect-none">
                                <img
                                    alt={product.description}
                                    src={product.image}
                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                    width="200px"
                                />
                            </div>
                            <div className="flex justify-between p-3">
                                <div class="">
                                    <p className="text-black font-weight-bold">{product.productName}</p>
                                    <p className="text-muted">{product.description}</p>

                                </div>
                                <div className="label-success">
                                    ${product.price.toFixed(2)}
                                </div>
                            </div>
                            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                                <button type="button" onClick={() => removeFromCart(product)}>-</button>{" "}
                                <span style={{width: "10px", align: "center"}}>{howManyofThis(product.id)}</span>
                                <button type="button" variant="light" onClick={() => addToCart(product)}>+</button>

                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const listItems = ProductsCategory.map(el => (
            <div class="row border-top border-bottom" key={el.id}>
                <div class="row main align-items-center">
                    <div class="col 2">
                        <img class="img-fluid" src={el.image}/>
                    </div>
                    <div class="col">
                        <div class="row text-muted">{el.productName}</div>
                        <div class="row">{el.description}</div>
                    </div>
                    <div class="col">
                        <button type="button" variant="light" onClick={() => removeFromCart(el)}>-</button>{" "}
                        <button type="button" variant="light" onClick={() => addToCart(el)}>+</button>
                    </div>
                    <div class="col">
                        ${el.price.toFixed(2)} <span class="close">&#10005;</span>{howManyofThis(el.id)};
                    </div>
                </div>
            </div>
    ));

    const printCart = () => {
        return(
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
                            <div>{cartItems}</div>
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
        );
    }

    return(
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12">
                <div class="card card-registration card-registration-2">
                    <div class="card-body p-0">
                        <div class="row g-0">
                            <div class="col-lg-8">
                                <div class="p-5">
                                    <div class="d-flex justify-content-between align-items-center mb-5">
                                        <h1 class="fw-bold mb-0 text-black">Bakery Bros</h1>
                                        <input class="mr-5" placeholder="Search" type="search" value={query} onChange={handleChange}/>
                                    </div>
                                    {listItems}
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
                                    <button class="btn-primary" onClick={showModal}>Checkout</button>

                                    <Modal isOpen={show} onRequestClose={hideModal}>
                                        <header>
                                            <title>Checkout</title>
                                        </header>
                                        <body>
                                            <div class="col">
                                                <p class="fw-bold">
                                                    Item
                                                </p>
                                            </div>
                                            <div class="col">
                                                <p class="fw-bold">
                                                    Quantity
                                                </p>
                                            </div>
                                            <div class="col">
                                                <p class="fw-bold">
                                                    Price
                                                </p>
                                            </div>
                                            <div>
                                                {printCart}
                                            </div>
                                        </body>
                                    </Modal>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Shop;