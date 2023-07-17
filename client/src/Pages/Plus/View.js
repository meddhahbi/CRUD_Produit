import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom';
import axios from 'axios';
import './View.css'


const View = () => {

  const [prod,setProd] = useState(null);

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
      setProd({...response.data });
     }
   }
 

  return (
    <div style={{marginTop:"150px"}}>
        <div className='card'>
          <div className='card-header'>
              <p>Détail de produit</p>
          </div>
          <div className='container'>
            <strong>ID:</strong>
            <span>{id}</span>
            <br /><br />

            <strong>Nom:</strong>
            <span>{prod && prod.name}</span>
            <br /><br />

            <strong>Prix:</strong>
            <strong>{prod && prod.price}</strong>
            <br /><br />

            <strong>Quantité:</strong>
            <strong>{prod && prod.quantity}</strong>
            <br /><br />
            <Link to="/">
              <button className='btn btn-edit'>Retour</button>
            </Link>
          </div>
        </div>
    </div>
    )
}

export default View