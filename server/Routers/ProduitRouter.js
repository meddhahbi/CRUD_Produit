const express = require('express');
const router = express.Router();
const Produit = require('../Model/Produit')


let produits = [];







router.post('/', (req, res) => {
  const { name, price, quantity } = req.body;

  if (!name || !price || !quantity) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const newProduct = new Produit(produits.length + 1, name, price,quantity);
  produits.push(newProduct);

  res.send({
    success: true,
    message: 'Produit ajouté',
    product: newProduct,
  });
});





  router.get('/', (req, res) => {
    res.json(produits);
  });






  router.get('/:id', (req, res) => {
    const id = req.params.id;
    //console.log(id);
    const produit = produits.find(p => p.id == id);
    if (produit) {
      res.json(produit);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });




  router.get('/search/:key', (req, res) => {
    const key = req.params.key;
  
    // Filter the produits array based on the search key
    const filteredProducts = produits.filter(product =>
      product.name.includes(key)
    );
  
    if (filteredProducts.length > 0) {
      res.send(filteredProducts);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });





  router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { name, price, quantity } = req.body;
  
    if (!name || !price || !quantity) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }
  
    const productIndex = produits.findIndex(p => p.id == id);
    if (productIndex !== -1) {
      const updatedProduct = { id, name, price, quantity };
      produits[productIndex] = updatedProduct;
      res.send({
        success: true,
        message: 'Produit mis à jour',
        product: updatedProduct,
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });



  



  router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const newProd = produits.filter(el =>el.id != id);
    
    if (newProd) {
      produits = newProd;
      res.send({
        success: true,
        message: 'Produit supprimé',
      });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });




  module.exports = router;