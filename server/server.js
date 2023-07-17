const express = require('express');
const productRoutes = require('./Routers/ProduitRouter');
var cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

app.use(cors()); 

app.use('/produits', productRoutes);




app.listen(3001,()=>{
    console.log("Server run in 3001")
})