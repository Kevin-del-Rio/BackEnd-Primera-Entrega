import express from "express";

const router = express.Router()

router.get('/', (req, res) => {
    let userTest = { name: 'hilda', age: "20", rol: "admin" };
    res.render("index", {
        user: userTest,
        isAdmin: userTest.rol === "admin",
        food
    })
})

let food = [
    { name: "hamburgusa", precio: 100 },
    { name: "pancho",     precio: 50  },
    { name: "sushi",      precio: 200 },
    { name: "pizza",      precio: 150 }
];

export default router;