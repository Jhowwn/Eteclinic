import database from '../repository/configDb.js';

async function insertProfession({name}){
    const conn = await database.connect();
    const sql = `insert into tbl_profissoes(nome_profissao) values(?)`;
    const newInsert = [name]
    conn.query(sql, newInsert);
    conn.end();
}

async function updateProfession({name, id}){
    const conn = await database.connect();
    const sql = `update tbl_profissoes set nome_profissao = ? where id_profissao = ${id}`;
    const newUpdate = [name];
    conn.query(sql, newUpdate);
    conn.end();
}

async function disalbeProfession({id}){
    const conn = await database.connect();
    const sql = `update tbl_profissoes set profissao_deletada = 1 where id_profissao = ${id}`;
    conn.query(sql);
    conn.end();
}

async function foundProfession({id}){
    const conn = await database.connect();
    const sql = `select * from tbl_profissoes where id_profissao = ${id}`;
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

async function foundAllProfession(){
    const conn = await database.connect();
    const sql = 'select * from tbl_profissoes where profissao_deletada = 0';
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}


export default {insertProfession, updateProfession, disalbeProfession, foundProfession, foundAllProfession}