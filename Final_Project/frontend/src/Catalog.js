import React, {useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.css";
import './custom.scss';

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [ProductsCategory, setProductsCategory] = useState([]);
    const [items, setItems] = useState([]);
    const [query, setQuery] = useState("");
    const [showBrowse, setShowBrowse] = useState(true);
    const [showCart, setShowCart] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [name, setName] = useState('');
    const [card, setCard] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');

    useEffect(() => {
        total();
    }, [cart]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++){
            totalVal += (Math.round(cart[i].price * 100) / 100);
        }
        setCartTotal(Math.round(totalVal * 100) / 100);
    };

    function getAllProducts() {
        fetch("http://localhost:4000/")
          .then((response) => response.json())
          .then((data) => {
            console.log("Show Catalog of Products :");
            console.log(data);
            setItems(data);
            setProductsCategory(data);
          });
    }

    const handleCheckout = () => {
        setShowBrowse(false);
        setShowCart(true);
        setShowConfirmation(false);
    }

    const handleSubmit = () => {
        let val = true;
        let userEmail = document.getElementById("inputEmail4");
        let userName = document.getElementById("inputName");
        let userCard = document.getElementById("inputCard");
        let address1 = document.getElementById("inputAddress");
        let userZip = document.getElementById("inputZip");
        let userCity = document.getElementById("inputCity");
        let userState = document.getElementById("inputState");

        if(!userEmail.value.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            userEmail.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            userEmail.setAttribute("class", "form-control is-valid");
            setEmail(userEmail.value);
        }
        if(userName.value.length == 0){
            userName.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            userName.setAttribute("class", "form-control is-valid");
            setName(userName.value);
        }
        if (!userCard.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/)){
            userCard.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            userCard.setAttribute("class", "form-control is-valid");
            setCard(userCard.value);
        }
        if(isNaN(parseInt(userZip.value)) || userZip.value.length !== 5){
            userZip.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            userZip.setAttribute("class", "form-control is-valid");
            setZip(userZip.value);
        }
        if(address1.value.length === 0){
            address1.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            address1.setAttribute("class", "form-control is-valid");
            setAddress(address1.value);
        }
        if(userCity.value.length === 0){
            userCity.setAttribute("class", "form-control is-invalid");
            val = false;
        }else{
            userCity.setAttribute("class", "form-control is-valid");
            setCity(userCity.value);
        }
        if(userState.value !== "None"){
            userState.setAttribute("class", "form-control is-valid");
            setState(userState.value);
        }else{
            userState.setAttribute("class", "form-control is-invalid");
            val = false;
        }
        if(val){
            setShowBrowse(false);
            setShowCart(false);
            setShowConfirmation(true);
        }
    }

    const goBack = () => {
        setShowBrowse(true);
        setShowCart(false);
        setShowConfirmation(false);
        setQuery('');
    }

    const handleReturn = () => {
        setShowBrowse(true);
        setShowCart(false);
        setShowConfirmation(false);
        setQuery('');
        setCart([]);
    }

    const censor = (str) => {
        let chars = str.split('');
        for(let i = 0; i < str.length; i++){
            if(i < 15 && chars[i] !== '-'){
                chars[i] = 'X';
            }
        }
        return chars.join('');
    }

    const addToCart = (el) => {
        setCart([...cart, el]);
    }

    const removeFromCart = (el) => {
        let itemFound = false;
        const cartCopy = cart.filter((item) =>{
            if(item._id === el._id && !itemFound){
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
        let hmot = cart.filter((cartItem) => cartItem._id === id);
        return hmot.length;
    }

    const cartItems = cart.map(el => (
        <div key={el._id}>
            <img class="img-fluid" src={el.image} width={30}/>
            {el.productName}${el.price}
        </div>
    ));

    const handleChange = (e) => {
        setQuery(e.target.value);
        const results = items.filter(product =>{
            if(e.target.value === ""){
                return items;
            }else{
                return product.productName.toLowerCase().includes(e.target.value.toLowerCase());
            }
        });
        setProductsCategory(results);
    }

    const listItems = ProductsCategory.map(el => (
        <div class="row border-top border-bottom" key={el._id}>
            <div class="row main align-items-center">
                <div class="col 2">
                    <img class="img-fluid" src={el.image}/>
                </div>
                <div class="col">
                    <div class="row text-md">{el.productName}</div>
                    <div class="row text-sm-muted">{el.description}</div>
                </div>
                <div class="col">
                    <button type="button" variant="light" onClick={() => removeFromCart(el)}>-</button>{" "}
                    <button type="button" variant="light" onClick={() => addToCart(el)}>+</button>
                </div>
                <div class="col">
                    ${el.price.toFixed(2)} <span class="close">&#10005;</span>{howManyofThis(el._id)};
                </div>
            </div>
        </div>
    ));


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
                                <p class="mb-0 me-5 d-flex align-items-center">
                                    <div>
                                        <span class="small text-muted me-2">Subtotal:</span>
                                        <span class="lead fw-normal">${Math.round(cartTotal * 100) / 100}</span>
                                    </div>
                                    <div>
                                        <span class="small text-muted me-2">{"    "}Tax:</span>
                                        <span class="lead fw-normal">${Math.round(cartTotal * 7) / 100}</span>
                                    </div>
                                    <div>
                                        <span class="small text-muted me-2">{"    "}Total:</span>
                                        <span class="lead fw-normal">${Math.round(cartTotal * 107) / 100}</span>
                                    </div>
                                </p>
                                {showBrowse && (
                                    <button type="button" onClick={() => handleCheckout()}>
                                        Proceed to checkout
                                    </button>
                                )}
                                {showCart && (
                                    <div>
                                        <h2>Your cart</h2>
                                        {cartItems}
                                        <div class="row">
                                            <div class="col-2"></div>
                                            <div class="col-8">
                                                <h1>Please enter your payment information</h1>
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
                                                        <option value="None">Choose...</option>
                                                        <option value="Illinois">Illinois</option>
                                                        <option value="Iowa">Iowa</option>
                                                        <option value="Kansas">Kansas</option>
                                                        <option value="Minnesota">Minnesota</option>
                                                        <option value="Missouri">Missouri</option>
                                                        <option value="Nebraska">Nebraska</option>
                                                        <option value="Wisconsin">Wisconsin</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-2">
                                                    <label for="inputZip" class="form-label">
                                                        Zip
                                                    </label>
                                                    <input type="text" class="form-control" id="inputZip" />
                                                </div>
                                                <div class="col-12">
                                                    <button type="button" class="btn btn-default" onClick={() => goBack()}>Return</button>
                                                    <button type="button" class="btn btn-success" onClick={() => handleSubmit()}>
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
                                    <h5 class="card-title">Thank you for your purchase!</h5>
                                    <p class="card-text">
                                        <u>Order Summary</u>
                                    </p>
                                        {cartItems}<br />
                                        {name}<br />
                                        {email}<br />
                                        {censor(card)}<br />
                                        {address}<br />
                                        {city}, {state} {zip}
                                    </div>
                                    <ul class="list-group list-group-flush"></ul>
                                    <button type="button" class="btn btn-success" onClick={() => handleReturn()}>Return</button>
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