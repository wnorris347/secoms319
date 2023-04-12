import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import items from "./data.json";
import Products from "../assignment-2/src/Products.js";

const Shop = () => {
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [ProductsCategory, setProductsCategory] = useState(Products);

    useEffect(() => {
        total();
    }, [cart]);

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++){
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };

    const addToCart = (el) => {
        setCart([...cart, el]);
    }

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setCart(hardCopy);
    }

    const cartItems = cart.map(el => (
        <div key={el.id}>
            <img class="img-fluid" src={el.image} width={30}/>
            {el.productName}
            ${el.price}
        </div>
    ));

        const render_products = (ProductsCategory) => {
            return(
                <div className="">

                </div>
            )
        }

    const listItems = items.map(el => (
        <div key={el.productName}>
            <img class="img-fluid" src={el.image} />
            {el.productName}
            {el.description}
            {el.price}
            <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
            <button type="button" variant="light" onClick={() => addToCart(el)}>+</button>
        </div>
    ));

    return(
        <div>
            <div>{listItems}</div>
            <div>Items in Cart:</div>
            <div>{cartItems}</div>
            <div>Total: ${cartTotal}</div>
        </div>
    );
}

export default Shop;