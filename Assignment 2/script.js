import React from "react";
import ReactDOM from "react-dom/client";
import React, {useState, useEffect} from "react";
import items from "./data.json";

const root = ReactDOM.createRoot(document.getElementById("root"));

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    return(
        <div>Hello</div>
    );

    const addToCart = (el) => {
        setCart([...cart, el]);
    }

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setCart(hardCopy);
    }

    const listItems = items.map((el) => (
        <div key={el.id}>
            <img class="img-fluid" src={el.image} />
            {el.title}
            {el.category}
            {el.price}
            <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
            <button type="button" variant="light" onClick={() => addToCart(el)}>+</button>
        </div>
    ));

    return(
        <div>
            {listItems}
        </div>
    );
}

export default Shop;