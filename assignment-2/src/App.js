import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import items from "./data.json";
import Products from "./Products.js";
import "./App.css";

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
            <div className="category-section fixed">
                <h2 className="text-3x1 font-extrabold tracking-tight text-gray-600 category-title">Products ({ProductsCategory.length})</h2>
                <div className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 x1:gap-x-10" style={{maxHeight: '800px', overflowY: 'scroll'}}>
                    {ProductsCategory.map((product, index) => (
                        <div key={index} classNameclassName="group relative shadow-lg" >
                            <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                                <img
                                    alt="Product Image"
                                    src={product.image}
                                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                            </div>
                            <div className="flex justify-between p-3">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            <span style={{ fontSize: '16px', fontWeight: '600' }}>{product.title}</span>
                                        </a>
                                        <p>Tag - {product.category}</p>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">Rating: {product.rating.rate}</p>
                                </div>
                                <p className="text-sm font-medium text-green-600">${product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
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