import express from "express";
import db from '../service/LoginService.js';
import {
  generatePasswords,
  generateToken,
  sendEmail,
} from "../helpers/useFeatures.js";


const router = express.Router();

router.post("/", async (req, res) =>{
  const {userEmail, password} = req.body;
  const userFind = await db.login(userEmail, password);
  try{
    if(userFind.length > 0){
      const {id_login, usuario} = userFind[0];
      const token = generateToken(id_login, usuario);
      res.status(200).send({message: "Login efetuado com sucesso", token})
    }else{
      res.status(401).send({ error: "Usuário ou Senha Incorretos" });
    }
  }catch {
    res.status(500).send({ error: "Internal Server Error" });
  }
})

router.post("/reset", async (req, res) =>{
  const{userEmail} = req.body;
  const newPassword = generatePasswords();
  try{
    await db.changePassword(newPassword, userEmail);
    sendEmail(userEmail, "Jhonatan", newPassword);
    res.status(200).send({ mensage: "Senha Alterada com Sucesso, enviado no seu email" });
  } catch {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

export default router;