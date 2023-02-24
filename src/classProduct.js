import fs from 'file-system'
class Product {
    static id = 1;
    status = true;
    constructor(title, description, price, thumbnail, code, status, stock, category) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.status = status;
        this.stock = stock;
        this.category = category
        this.id = Product.id++;
        // hay que mejorar el id y tambien implementar bien el code,
        // tambien usar para imagenes un array
    }

}
 class ProductManager {
    #listaProducts;
    #productDirPath;
    #productsFilePath;
    #fs;
    constructor() {
        this.#listaProducts = new Array();
        this.#productDirPath = "./DataBaseProducts";
        this.#productsFilePath = this.#productDirPath + "/Productos.json";
        this.#fs = fs
    }

    #prepararDirectorioBase = async () => {
        await this.#fs.promises.mkdir(this.#productDirPath, { recursive: true });
        if (!this.#fs.existsSync(this.#productsFilePath)) {
            await this.#fs.promises.writeFile(this.#productsFilePath, "[]");
        }
    }

    #traerProductos = async () => {
        let productsFile = await this.#fs.promises.readFile(this.#productsFilePath, "utf-8");
        this.#listaProducts = JSON.parse(productsFile);
    }

    addProduct = async (title, description, price, thumbnail, code, status, stock, category) => {
        var productoNuevo = new Product(title, description, price, thumbnail, code, status, stock, category);

        console.log("Producto a registrar:");
        console.log(productoNuevo);

        try {
            await this.#prepararDirectorioBase();
            await this.#traerProductos();
            this.#listaProducts.push(productoNuevo);
            await this.#fs.promises.writeFile(this.#productsFilePath, JSON.stringify(this.#listaProducts));
        } catch (error) {
            throw Error(`Error creando producto nuevo: ${JSON.stringify(productoNuevo)}, detalle del error: ${error}`);
        }
    }

    getProduct = async () => {
        try {
            await this.#prepararDirectorioBase();
            await this.#traerProductos();
            return this.#listaProducts;
        } catch (error) {
            throw Error(`Error consultando los products por archivo, valide el archivo: ${this.#productDirPath},
         detalle del error: ${error}`);
        }
    }

    getProductById = async (id) => {
        await this.#traerProductos();
        let prod = await this.#listaProducts.filter(prod => prod.id === id);
        return prod.length > 0
            ? console.log(`Producto id = ${id} encontrado: `, prod)
            : console.error(`Producto con id: ${id} no encontrado.`, ' “Not found” ');
    }

    deleteProduct = async (id) => {
        await this.#traerProductos();
        let listaAux;
        let encontrado = this.#listaProducts.some(prod => prod.id === id);
        if (encontrado) {
            listaAux = await this.#listaProducts.filter(prod => prod.id !== id);
            this.#listaProducts = listaAux;
            console.log(`Producto id = ${id} eliminado con exito: `)
        } else {
            console.error(`Producto no Existe`);
        }
        await this.#fs.promises.writeFile(this.#productsFilePath, JSON.stringify(this.#listaProducts));
    }

    updateProductById = async (id, nuevoProducto) => {
        await this.#traerProductos();
        const updateProduct = this.#listaProducts.map((prod) => {
            if (prod.id === id) {
                return { ...prod, ...nuevoProducto }
            } else {
                return prod
            }
        })
        this.#listaProducts = updateProduct;
        await this.#fs.promises.writeFile(this.#productsFilePath, JSON.stringify(this.#listaProducts));
        console.log(this.#listaProducts)
    }
}

export default ProductManager;


// // PRODUCTOS
let prod = new ProductManager();
console.log(prod);
let productos = async () => {
    let produ = await prod.getProduct();
    console.log(produ)
}
// // title, description, price, thumbnail, code, status, stock, category
// let persistirproductos = async () => {
//     await prod.addProduct('Monitor', '24"', 1000, 'sin foto', 'uno', true, 10, "hola");
//     await prod.addProduct('Teclado', '80%', 250, 'sin foto', 'dos', true, 10, "chau");
//     await prod.addProduct('Cascos', 'Gamer', 500, 'sin foto', 'tres', false, 100, "hola");
//     await prod.addProduct('Mouse', 'Optico', 110, 'sin foto', 'cuatro', false, 20, "chau");
//     await prod.addProduct('Monitor', '19"', 1000, 'sin foto', 'cinco', true, 10, "hola");
//     await prod.addProduct('Teclado', '70%', 250, 'sin foto', 'seis', false, 10, "chau");
//     await prod.addProduct('Cascos', 'comun', 500, 'sin foto', 'siete', true, 100, "chau");
//     await prod.addProduct('Mouse', 'Optico', 110, 'sin foto', 'ocho', false, 20, "hola");
// }
// // persistirproductos();
// prod.getProductById(2);

// // prod.updateProductById(1,{title:'nico', description: 'Persona', price:110, thumbnail:'sin foto', code:'4fkr5d',stock:20} );

// // prod.deleteProduct(8)

// // productos()
