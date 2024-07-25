const express = require("express")
const app = express();

const productRouter = require('./routes/products.router.js');
const cartsRouter = require('./routes/carts.router.js');


//importamos los modulos
//--Primer paso--//


//se trabajo sobre el puerto 
const PUERTO = 8080;

app.use(express.json());



app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);



app.listen(PUERTO, () => {
    console.log("Server Up");
})

