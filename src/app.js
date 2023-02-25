import express from "express";
import cartsRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'
import __dirname from "./utils.js";

const app =  express();
const server_port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)


app.listen(server_port, ()=>{
    console.log(`Servidor escuchando por el puerto: ${server_port}`)
    console.log(__dirname)
})