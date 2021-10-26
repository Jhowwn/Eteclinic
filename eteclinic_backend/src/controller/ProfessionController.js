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

router.put('/update', [//Valida campo
    body('name').isLength({min: 1}).withMessage('Informe uma Profissão válida'),
    body('id').isNumeric().withMessage('Id deve conter apenas numeros'),
    body('id').isLength({min: 1}).withMessage('Id deve conter ao menos 1 numero')
], async (req, res) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).send({errors: errors.array()});
    }
    try{
        await db.updateProfession(req.body);
        res.status(201).send({message: 'Profissão Atualizada com sucesso'})
    }catch{
        res.status(500).send({mensage:`Internal Error Server`});
    }
});

router.delete('/delete/:id', async (req, res) =>{
    const id = req.params.id;

    try{
        await db.disalbeProfession(id);
        res.status(201).send({message: 'Profissão Desativada com sucesso'})
    }catch{
        res.status(500).send({mensage:`Internal Error Server`});
    }
});

router.get('/profession/:id',  async (req, res) =>{
    const id = req.params.id;
    
    try{
        const data = await db.foundProfession(id);
        res.status(201).send({data})
    }catch{
        res.status(500).send({mensage:`Internal Error Server`});
    }
});

router.get('/allprofession', async (req, res) =>{
    try{
        const dataPro = await db.foundAllProfession();
        res.status(201).send(dataPro)
    }catch{
        res.status(500).send({mensage:`Internal Error Server`});
    }
});


export default router;