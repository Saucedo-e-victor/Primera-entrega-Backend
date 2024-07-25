const express = require ('express'); 
const router = express.Router()
const ProductManager =require("../managers/product-manager.js")
const manager = new ProductManager("./src/data/products.json")





router.use(express.json())
//Productos


router.get("/products", async (req, res) => {
    const arrayProducto = await manager.getProducts();
    res.send(arrayProducto);
})
//buscar por id
router.get("/products/:pid", async (req, res) => {
    let id = req.params.pid;
    try {
        const producto = await manager.getProductById(parseInt(id));

        if (!producto) {
            res.send("Producto no encontrado");
        } else {
            res.send(producto);
        }
    } catch (error) {
        res.send("Error al buscar ese id en los productos");
    }
})











/* export default router; */
module.exports= router