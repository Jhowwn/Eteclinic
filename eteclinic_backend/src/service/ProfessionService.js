import database from '../repository/configDb.js';

async function insertProfession({name}){
    const conn = await database.connect();
    const sql = 'insert into tbl_profissoes(nome_profissao) values(?);'
    const newProfession =[name]
    conn.query(sql, newProfession);
    conn.end();
}

export default {insertProfession}