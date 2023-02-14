import {Router} from 'express';

const router = Router();


// --------------------------------------------------
// AGREGAMOS UN CARRITO
router.post('/', (req, res)=>{
    /*
   Id:Number/String
   products: Array que contendrá objetos que representen cada producto
   */
    res.send("Aca Creamos un carrito")
});



// --------------------------------------------------
// AGREGAMOS UN PRODUCTO AL UN CARRITO
router.post('/:cid/product/:pid ', (req, res)=>{
    /*
   SOLO AGREGAMOS EL ID DEL PRODUCTO
   CANTIDAD
   */
    res.send("Aca agregamos un producto a un carrito")
});



// --------------------------------------------------
// MOSTRAMOS LOS PRODUCTOS DE UN CARRITO SELECCIONADO
router.get('/:cid', (req, res)=>{
    res.send("Aca mostramos los productos con el carrito del id selecionado")
});


export default router;