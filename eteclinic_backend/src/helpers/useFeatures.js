import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import {config} from "./smtp.js";

const transport = nodeMailer.createTransport(config);

function generatePasswords(){
    // + 1 para não pegar o valor 0
    // .toString(36) para pode usar letras
    // . substr(2) pega os valores apos o 1

    const key =  (Math.random()+1).toString(36).substr(2);
    const newPassword = key
    .replace('j','@')
    .replace('w','!')
    .replace('i','$')
    .replace('n','#')
    .replace('a','*')

    return newPassword;
}

function generateToken(idLogin, user){
    const secret = "captain of my soul"
    return jwt.sign({infoUser: {
        idUser: idLogin,
        userName: user
    }},secret,{expiresIn:60*60*5});
}

function sendEmail(email, name, password){
    transport.sendMail({
        subject: "Redefinição de senha Eteclinic",
        from: "Support Eteclinic <eteclinic@gmail.com>",
        to: email,
        html:
        `<html>
            <body>
                <p>${name}! Tudo Bem?</p>
                <p>Você solicitou uma redefinição de senha</p>
                <p>Sua nova senha de acesso é: <strong>${password}</strong></p>
                <a href="https://www.google.com">Clique aqui para acessar</a>
            </body>
        </html>`
    });
}

export {generatePasswords,generateToken,sendEmail};