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

async function updateProfessional({zipCode, streat, number, district, city, uf, register, name, phone, cellPhone, email, profession, id}){
    const conn = await database.connect();
    const sql = 'call sp_update_especialistas(?,?,?,?,?,?,?,?,?,?,?,?,?)';
    const newProfessional = [
        id,
        register, 
        name, 
        phone, 
        cellPhone, 
        email, 
        profession,
        zipCode, 
        streat, 
        number, 
        district, 
        city, 
        uf
    ]
    conn.query(sql, newProfessional);
    conn.end();
}

async function disalbeProfessional({id}){
    const conn = await database.connect();
    const sql = `update tbl_especialistas set especialista_deletado = 1 where id_especialista = ${id}`;
    conn.query(sql);
    conn.end();
}

async function foundProfessional({id}){
    const conn = await database.connect();
    const sql = `select * from tbl_especialistas where id_especialista = ${id}`
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

async function foundAllProfessional(){
    const conn = await database.connect();
    const sql = `select * from tbl_especialistas where especialista_deletado = 0`
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default {insertProfessional, updateProfessional, disalbeProfessional, foundAllProfessional, foundProfessional}