import express from 'express';
import db from '../service/ProfessionService.js';
import {body, validationResult} from 'express-validator';

const router = express.Router();

router.post('/', [//Valida campo
    body('name').isLength({min: 1}).withMessage('Informe uma Profissão válida')
], async (req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    try{
        await db.insertProfession(req.body);
        res.status(201).send({message: 'Profissão cadastrada com sucesso'})
    }catch{
        res.status(500).send({mensage:`Internal Error Server`});
    }
});

export default router;