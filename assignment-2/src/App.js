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

    

    function isNumeric(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function validate() {
        let val = true;
        let email = document.getElementById("inputEmail4");
        let name = document.getElementById("inputName");
        let card = document.getElementById("inputCard");
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
        }
        return val;
    }


    
}

export default Shop;