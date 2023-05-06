import React, { useState, useEffect } from "react";
import Catalog from "./Catalog.js"
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

// import "https://getbootstrap.com/docs/5.3/examples/album/"
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
// import "../assets/dist/css/bootstrap.min.css"



function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [viewer4, setViewer4] = useState(true);
  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);
  const [editedProduct, setEditedProduct] = useState({});
  const [aboutUs, setAboutUs] = useState(false);
  const [homePage, setHomePage] = useState(true);
  const [catalog, setCatalog] = useState(false);

  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    productName: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://localhost:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });
  

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, [checked4]);

  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
      });
  }

  function pullProducts(){
    getAllProducts();
    setViewer1(!viewer1);
  }
    
  const showAllItems = product.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Product: {el.productName} <br />
      Price: {el.price} <br />
    </div>
  ));

  function getOneProduct(id) {
      console.log(id);
      if (id >= 1 && id <= 20) {
        fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
        });
      setViewer2(!viewer2);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Product: {el.productName} <br />
      Price: {el.price} <br />
    </div>
  ));

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
    getAllProducts();
  }  

  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "productName") {
      setAddNewProduct({ ...addNewProduct, productName: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "image") {
      const temp =  value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    }
  }


  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
    getAllProducts();
  } 

  function handleProductUpdate(e) {
    e.preventDefault();
    fetch("http://localhost:4000/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update completed");
        console.log(data);
        if (data) {
          const value = Object.values(data);
          alert(value);
        }
      });
    getAllProducts();
  } 

  function handleAboutUs(){
    setViewer1(false);
    setViewer2(false);
    setChecked4(false);
    setHomePage(false);
    setCatalog(false);
    setAboutUs(true);
  }

  function handleReturnToDev(){
    setHomePage(true);
    setAboutUs(false);
    setCatalog(false);
  }

  function handleCatalog(){
    setViewer1(false);
    setViewer2(false);
    setChecked4(false);
    setHomePage(false);
    setCatalog(false);
    setAboutUs(false);
    setCatalog(true);
  }


    
return (
  <div>
    {catalog && (
      <div>
        <button onClick={() => handleReturnToDev()}>Return to Developer View</button>
        <Catalog />
      </div>
    )}
    {homePage && (  
      <div>

        <button onClick={() => handleCatalog()}>Go to User View</button>
        <button onClick={() => handleAboutUs()}>About the Developers</button>
        <h1>Catalog of Products</h1>

        <button onClick={() => pullProducts()}>Show All products</button>
        
        <input type="text" id="message" name="message" placeholder="id" onChange={(e) =>getOneProduct(e.target.value)} />
        <h1>Show all available Products:</h1>
        <hr></hr>
        {viewer1 && <div>Products {showAllItems}</div>}
        <hr></hr>
        <h1>Show one Product by Id:</h1>
        {viewer2 && <div>Product: {showOneItem}</div>}
        <hr></hr>
        <div>
          <h3>Add a new product :</h3>
          <form action="">
            
            <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handleChange} />
            <br />
            <input type="text" placeholder="Product name?" name="productName" value={addNewProduct.productName} onChange={handleChange} />
            <br />
            <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handleChange} />
            <br />
            <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handleChange} />
            <br />
            <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handleChange} />
            <br />
            <button type="submit" onClick={handleOnSubmit}>
              submit
            </button>
          </form>
        </div>
        <div>
          <h3>Update Product's Price</h3>
          <form key={editedProduct._id} onSubmit={handleProductUpdate}>
            <input type="text" name="_id" placeholder="ID" value={editedProduct._id} onChange={(e) => setEditedProduct({
              ...editedProduct, _id: e.target.value
            })} />
            <input type="number" name="price" placeholder="Price" value={editedProduct.price} onChange={(e) => setEditedProduct({
              ...editedProduct, price: e.target.value
            })} />
            <button variant="primary" type="submit" onClick={handleProductUpdate}>Update Price</button>
          </form>
        </div>
        <div>
          <h3>Delete one product:</h3>
          
          <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4} onChange={(e) => setChecked4(!checked4)} />
          
          <button onClick={() => getOneByOneProductPrev()}>Prev</button>
          <button onClick={() => getOneByOneProductNext()}>Next</button>
          <button onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
          
          {checked4 && (
            <div key={product[index]._id}>
              <img src={product[index].image} width={30} /> <br />
              Id:{product[index]._id} <br />
              Product: {product[index].productName} <br />
              Price: {product[index].price} <br />
            </div>
          )}
        </div>
      </div>
    )}
    <div>
      {aboutUs && (
        <div>
          <button onClick={() => handleReturnToDev()}>Return to Database Manager</button>
          <div class="center-block arial">
            <h1>About the Developers</h1><br />
            <h3>SE/COM S 319: Construction of User Interfaces, Spring 2023</h3><br />
            <h5>March 6, 2023</h5>
          </div>
          <br />
          <br />
          <br />
          <h3>Dev Team:</h3>
          <br />
          <div class="arial">
            <p>Will Norris</p><br />
            <p>wnorris@iastate.edu</p>
          </div>
          <br />
          <div class="arial">
            <p>Kyle Nachiengane</p><br />
            <p>knach@iastate.edu</p>
          </div>
          <br />
          <br />
          <br />
          <div class="arial">
            <h3>Professor:</h3><br />
            <p>Dr. Abraham N. Aldaco Gastelum</p><br />
            <p>aadalco@iastate.edu</p>
          </div>
        </div>
      )}
    </div>
  </div>
)
}
export default App;