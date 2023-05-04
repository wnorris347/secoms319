import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);
  const [viewer4, setViewer4] = useState(true);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);
  const [editedProduct, setEditedProduct] = useState({});

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
    setViewer1(!viewer1);
  }
    
  const showAllItems = product.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
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
      Title: {el.title} <br />
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
  } 


    
return (
  <div>
    <h1>Catalog of Products</h1>

    <button onClick={() => getAllProducts()}>Show All products</button>
    
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
          Title: {product[index].productName} <br />
          Price: {product[index].price} <br />
        </div>
      )}
    </div>
  </div>
)
}
export default App;