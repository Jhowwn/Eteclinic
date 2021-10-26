import database from "../repository/configDb.js";

async function insertUser(email, password, usuario){
    const conn = await database.connect();
    const sql ="insert into tbl_usuarios(email, senha, usuario) values (?, ?, ?)";
    const newUserData = [email, password, usuario];
    conn.query(sql, newUserData);
    conn.end();
}

async function updateUser({email, password, usuario, id}){
    const conn = await database.connect();
    const sql ="update tbl_usuarios set email = ? , senha = ?, usuario = ? where id_login = ?";
    const newUserData = [email, password, usuario, id];
    conn.query(sql, newUserData);
    conn.end();
};

async function disableUser(id){
    const conn = await database.connect();
    const sql = `update tbl_usuarios set usuario_deletado = 1 where id_login = ${id}`;
    conn.query(sql);
    conn.end();
};

async function findUser(id){
    const conn = await database.connect();
    const sql = `select * from tbl_usuarios where id_login = ${id} and usuario_deletado = 0`
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
};

async function checkEmail(userEmail){
    const conn = await database.connect();
    const sql = "Select * from tbl_usuarios where email=?";
    const [rows] = await conn.query(sql, userEmail);
    conn.end();

    return rows;
}

export default {insertUser, updateUser, disableUser,findUser, checkEmail};