import React, {useState, useEffect} from "react";
import items from "./data.json";
import "bootstrap/dist/css/bootstrap.css";

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [ProductsCategory, setProductsCategory] = useState(items);
    const [query, setQuery] = useState("");
    const [showBrowse, setShowBrowse] = useState(true);
    const [showCart, setShowCart] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

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

    const handleCheckout = () => {
        setShowBrowse(false);
        setShowCart(true);
        setShowConfirmation(false);
    }

    const handleSubmit = () => {
        setShowBrowse(false);
        setShowCart(false);
        setShowConfirmation(true);
    }

    const handleReturn = () => {
        setShowBrowse(true);
        setShowCart(false);
        setShowConfirmation(false);
    }

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

    function howManyofThis(id){
        let hmot = cart.filter((cartItem) => cartItem.id === id);
        return hmot.length;
    }

    const cartItems = cart.map(el => (
        <div key={el.id}>
            <img class="img-fluid" src={el.image} width={30}/>
            {el.productName}${el.price}
        </div>
    ));

    const handleChange = (e) => {
        setQuery(e.target.value);
        const results = items.filter(product =>{
            if(e.target.value === ""){
                return ProductsCategory;
            }else{
                return product.productName.toLowerCase().includes(e.target.value.toLowerCase());
            }
        });
        setProductsCategory(results);
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

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const form = document.getElementById('checkout-form');
    const inputCard = document.querySelector('#inputCard');
    const alertTrigger = document.getElementById('submit-btn');
    const summaryCard = document.querySelector('.card');
    const summaryList = document.querySelector('.card > ul');

    const alert = (message, type) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible" role="alert">`,
            `<div>${message}</div>`,
            `<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`,
            `</div>`
        ].join('');
        alertPlaceholder.append(wrapper);
    }
        

    function isNumeric(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function validate() {
        let val = true;
        let email = document.getElementById("inputEmail4");
        let name = document.getElementById("inputName");
        let card = document.getElementById("inputCard");
        let address = document.getElementById("inputAddress");
        let zip = document.getElementById("inputZip");
        let city = document.getElementById("inputCity");

        if(!email.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            email.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            email.setAttribute("class", "form-control is-valid");
            setEmail(email.value);
        }
        if(name.value.length == 0){
            name.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            name.setAttribute("class", "form-control is-valid");
            setName(name.value);
        }
        if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)){
            card.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            card.setAttribute("class", "form-control is-valid");
            setCard(card.value);
        }if(isNaN(parseInt(zip.value)) || zip.value.length !== 5){
            zip.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            zip.setAttribute("class", "form-control is-valid");
            setZip(card.value);
        }if(!(typeof address.value === String || address.value instanceof String) || address.value.length === 0){
            address.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            address.setAttribute("class", "form-control is-valid");
            setAddress(address.value);
        }if(!(typeof city.value === String || city.value instanceof String) || city.value.length === 0){
            city.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            address.setAttribute("class", "form-control is-valid");
            setCity(city.value);
        }
        return val;
    }

return (
    <div>
        <div class="card">
            <div class="row">
                <div class="col-8 cart">
                    <div class="title">
                        <div class="row">
                            <div class="col">
                                <h5>
                                    <p>Bakery Bros</p>
                                </h5>
                            </div>
                            <div class="col align-self-center text-muted">
                                Products chosen: {cart.length}
                            </div>
                            <div class="float-end">
                                <p class="mb-0 me-5 d-flex align-items-center">
                                    <span class="small text-muted me-2">Subtotal:</span>
                                    <span class="lead fw-normal">${cartTotal.toFixed(2)}</span>
                                    <span class="small text-muted me-2">Tax:</span>
                                    <span class="lead fw-normal">${(cartTotal * 0.07).toFixed(2)}</span>
                                    <span class="small text-muted me-2">Total:</span>
                                    <span class="lead fw-normal">${(cartTotal * 1.07).toFixed(2)}</span>
                                </p>
                                {showBrowse && (
                                    <button type="button" onClick={() => handleCheckout()}>
                                        Proceed to checkout :D
                                    </button>
                                )}
                            
                                {showBrowse && (
                                    <div>
                                        <div className="py-10">
                                            <input type="search" value={query} onChange={handleChange}
                                            placeholder="Search"
                                            />
                                            </div>
                                            {listItems}
                                            </div>
                                )}
                                {showCart && (
                                    <div>
                                        <h2>Your cart</h2>
                                        {cartItems}
                                        <div class="row">
                                            <div class="col-2"></div>
                                            <div class="col-8">
                                                <h1>Please enter you payment information</h1>
                                                <div id="liveAlertPlaceholder"></div>
                                                <form class="row g-3" id="checkout-form">
                                                <div class="col-md-6">
                                                    <label for="inputName" class="form-label">
                                                        Full Name
                                                    </label>
                                                    <input type="text" class="form-control" id="inputName"/>
                                                    <div class="valid-feedback">Looks good!</div>
                                                    <div class="invalid-feedback">
                                                        Must be like, "John Doe"
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="inputEmail4" class="form-label">
                                                        Email
                                                    </label>
                                                    <input type="email" class="form-control" id="inputEmail4"/>
                                                    <div class="valid-feedback">Looks good!</div>
                                                    <div class="invalid-feedback">
                                                        Must be like, "abc@xyz.efg"
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <label for="inputCard" class="form-label">
                                                        Card
                                                    </label>
                                                    <div class="input-group mb-3">
                                                        <span class="input-group-text" id="basic-addon1">
                                                            <i class="bi-credit-card-fill"></i>
                                                        </span>
                                                        <input type="text" id="inputCard" class="form-control" placeholder="XXXX-XXXX-XXXX-XXXX" aria-label="Username" aria-describedby="basic-addon1"/>
                                                        <div class="valid-feedback">Looks good!</div>
                                                        <div class="invalid-feedback">
                                                            Must be like, "7777-7777-7777-7777"
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-12">
                                                    <label for="inputAddress" class="form-label">
                                                        Address
                                                    </label>
                                                    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
                                                </div>
                                                <div class="col-12">
                                                    <label for="inputAddress2" class="form-label">
                                                        Address 2
                                                    </label>
                                                    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                                                </div>
                                                <div class="col-md-6">
                                                    <label for="inputCity" class="form-label">
                                                        City
                                                    </label>
                                                    <input type="text" class="form-control" id="inputCity"/>
                                                </div>
                                                <div class="col-md-4">
                                                    <label for="inputState" class="form-label">
                                                        State
                                                    </label>
                                                    <select id="inputState" class="form-select">
                                                        <option selected>Iowa</option>
                                                        <option selected>Nebraska</option>
                                                        <option selected>Florida</option>
                                                        <option selected>Idaho</option>
                                                        <option selected>Montana</option>
                                                        <option selected>Choose...</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-2">
                                                    <label for="inputZip" class="form-label">
                                                        Zip
                                                    </label>
                                                    <input type="text" class="form-control" id="inputZip" />
                                                </div>
                                                <div class="col-12">
                                                    <button type="button" class="btn btn-success" onClick={() => handleSubmitButton()}>
                                                        {" "}
                                                        <i class="bi-bag-check"></i> Order
                                                    </button>
                                                </div>                                                                                                
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {showConfirmation && (
                                <div class="card" style={{ width: 18 + "rem" }}>
                                    <div class="card-body">
                                        <h5 card-title>Thank you for your purchase!</h5>
                                        <p class="card-text">
                                            <u>Order Summary</u>
                                        </p>
                                        {cartItems}<br />
                                        {name}<br />
                                        {email}<br />
                                        {card}<br />
                                    </div>
                                    <ul class="list-group list-group-flush"></ul>
                                    <button type="button" class="btn btn-success" onClick={() => handleReturn}>Return</button>
                                </div>
                            )}
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</div> 
)
}



export default Shop;