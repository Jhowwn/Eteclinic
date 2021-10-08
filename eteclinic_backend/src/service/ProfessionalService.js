import database from '../repository/configDb.js';


async function insertProfessional({zipCode, streat, number, district, city, uf, register, name, phone, cellPhone, email, profession}){
    const conn = await database.connect();
    const sql = 'call sp_registra_especialistas(?,?,?,?,?,?,?,?,?,?,?,?)';
    const newProfessional = [
        zipCode, 
        streat, 
        number, 
        district, 
        city, 
        uf, 
        register, 
        name, 
        phone, 
        cellPhone, 
        email, 
        profession
    ]
    conn.query(sql, newProfessional);
    conn.end();
}


export default {insertProfessional}