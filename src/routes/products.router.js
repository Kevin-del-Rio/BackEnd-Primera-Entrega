import {Router} from 'express';

const router = Router();
// MOSTAR TODOS LOS PRODUCTOS
router.get('/', (req, res)=>{
    res.send("Aca estan los productos")
});
// MOSTRAR UN PRODUCTO
router.get('/:pid', (req, res)=>{
    res.send("Aca solo el producto con  id...")
});
// AGREGAR UN PRODUCTO
router.post('/', (req, res)=>{  
    res.send("Aca creamos un nuevo producto")
});
// ACTUALIZAR UN PRODUCTO
router.put('/:pid', (req, res)=>{
    res.send("Aca modificamos el producto por  id...")
});
// BORRAR UN PRODUCTO
router.delete('/:pid', (req, res)=>{
    res.send("Aca eliminamos el producto por  id...")
});

export default router;