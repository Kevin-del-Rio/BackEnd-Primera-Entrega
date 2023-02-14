import {Router} from 'express';

const router = Router();

let users = [];

router.post('/', (request, response)=>{
    let user = request.body;
    user.id = Math.floor(Math.random()*20+1);
    if (!user.first_name || !user.last_name) {
        console.error("Usuario no valido.");
        console.error(user);
        response.status(400).send({status: "Error", message: "Usuario invalido, verifique los datos de entrada."});
    } else {
        users.push(user);
        console.log(users);
        response.send({status: "Success", message: `Usuario agregado con exito, con ID: ${user.id}`});
    }
});

router.get('/', (request, response)=>{
    console.log("Hello desde users router!");
    console.log("Usuarios actuales: ");
    console.log(users);
    response.send(users);
});

export default router;