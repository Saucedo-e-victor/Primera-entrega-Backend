const fs = require("fs").promises;

/* const = require ('../data/nuevo.producto.js')
 */



class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = []
        this.path = path;
    }
    // añade un producto y lo guarda en nuevoProductos 
    async addProduct({ title, description, price, img, code, stock }) {

        if (!title || !description || !price || img || !code || !stock) {
            console.log("Todos los campos obligatorios");
            return;
        }
        //Validacion de campos
        if (this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico ")
            return;
        }
        ///crea un producto con Id autoincrementable

        const nuevoProducto = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        }


        //añade el produco a la array y luego lo guarda
        this.products.push(nuevoProducto);

        await this.guardarArchivo(this.products);
    }

    async getProducts() {
        try {
            const arrayProductos = await this.leerArchivo();
            return arrayProductos;
        } catch (error) {
            console.log("Error al leer archivo", error);
        }
    }

    // busca producto por id
    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if (!buscado) {
                console.log("producto no encontrado");
                return null;
            } else {
                console.log("Producto encontrado");
                return buscado;
            }
        } catch (error) {
            console.log("Error al buscar por id", error);
        }
    }

    //metodo auxiliar
    async leerArchivo() {
        const respuesta = await fs.readFile(this.path, "utf-8");
        const arrayProductos = JSON.parse(respuesta);
        return arrayProductos;

    }

    //guardado del producto en forma de listado 

    async guardarArchivo(arrayProductos) {
        await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    }

    //actualizar producto

    async updateProduct(id, productoActualizado) {
        try {
            const arrayProductos = await this.leerArchivo();
            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProductos[index] = { ...arrayProductos[index], ...productoActualizado };
                await this.guardarArchivo(arrayProductos);
                console.log("Producto actualizado");
            } else {
                console.log("No se encontro Producto");
            }
        } catch (error) {
            console.log("Error al actuaizar productos")

        }
    }
    async deleteProduct(id) {
        try {
            const arrayProductos = await this.leerArchivo();

            const index = arrayProductos.findIndex(item => item.id === id);

            if (index !== -1) {
                arrayProductos.splice(index, 1);
                await this.guardarArchivo(arrayProductos);
                console.log("Producto eliminado");
            } else {
                console.log("No se encuentra el producto");
            }
        } catch (error) {
            console.log("Tenemos un error al eliminar productos");
        }
    }




}

module.exports = ProductManager;