import express from "express";
import register from "./controller/RegisterController.js";
import cliente from "./controller/ClienteController.js";
import login from "./controller/LoginController.js";
import  professional from './controller/ProfessionalController.js';
import profession from './controller/ProfessionController.js';
import image from './controller/imageController.js';

const router = express.Router();

router.use('/register', register);
router.use('/cliente', cliente);
router.use('/login', login);
router.use('/login/reset', login);
router.use('/professional', professional);
router.use('/profession', profession);
router.use('/image', image);

router.use('/*', (req, res) => {
    res.status(404).send({message: "Caminho Não encontrado"});
});

export default router;