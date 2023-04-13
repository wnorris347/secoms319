import React, {useState, useEffect} from "react";
import items from "./data.json";

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [ProductsCategory, setProductsCategory] = useState(items);
    const [query, setQuery] = useState("");
    const [catalog, setCatalog] = useState(true);
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
        setCatalog(false);
        setShowCart(true);
        setShowConfirmation(false);
    }

    const handleSubmit = () => {
        setCatalog(false);
        setShowCart(false);
        setShowConfirmation(true);
    }

    const handleReturn = () => {
        setCatalog(true);
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


}

export default Shop;