import express from "express";
import multer from 'multer';
import multerConfig from '../middlewares/multer.js';

const router = express.Router();

router.post('/', multer(multerConfig).single('file'), (req, res) => {
    const localFile = req.file.path;
    res.status(201).send({message: 'Acessado com sucesso'})
});

export default router;