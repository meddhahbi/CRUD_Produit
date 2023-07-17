import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddEdit.css";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";


const initialState = {
  name: "",
  price: "",
  quantity: "",
};


const AddEdit = () => {

  const [state, setState] = useState(initialState);
  const { name, price, quantity } = state;
  
  const {id} = useParams();
 // console.log(id);

 useEffect(() => {
  console.log("Fetching product data...");
  if (id) {
    console.log("ID:", id);
    getSingleProduit(id);
  }
}, [id]);


  const getSingleProduit = async (id) =>{
    const response = await axios.get(`http://localhost:3001/produits/${id}`);
    console.log(response.data);
    if(response.status === 200){
     setState({...response.data });
    }
  }


 

  const addProd = async (data) => {
    const response = await axios.post("http://localhost:3001/produits", data);
    if (response.status === 200) {
      //console.log("done");
      toast.success(response.data);
    }
  };


  const updateProd = async (data,id) => {
    const response = await axios.put(`http://localhost:3001/produits/${id}`, data);
    if (response.status === 200) {
      //console.log("done");
      toast.success(response.data);
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.name || !state.price || !state.quantity) {
      toast.error("Tous les champs sont obligatoires");
    } else {

      if(!id){
        addProd(state);
      }else{
        updateProd(state,id)
      }


     // console.log(state.name);
     

      setTimeout(()=> window.location.href = "/",500)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Nom</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Entrer le nom de produit ..."
          onChange={handleInputChange}
          value={name}
        />

        <label htmlFor="price">Prix</label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Entrer le prix de produit ..."
          onChange={handleInputChange}
          value={price}
        />

        <label htmlFor="quantity">Quantité</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          placeholder="Entrer la quantité de produit ..."
          onChange={handleInputChange}
          value={quantity}
        />
        <input value={id ? "Update" : "Ajouter"} type="submit" />
      </form>
    </div>
  );
};

export default AddEdit;
