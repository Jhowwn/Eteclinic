import database from '../repository/configDb.js';

async function login(userEmail, password){
    const conn = await database.connect();
    const sql = "select * from tbl_usuarios where email = ? and senha = ? and usuario_deletado = 0";
    const dataLogin = [userEmail, password];
    const [rows] = await conn.query(sql, dataLogin);
    conn.end();

    return rows;
}

async function changePassword(newPassword, userEmail) {
    const conn = await database.connect();
    const sql = "update tbl_usuarios set senha = ? where email = ? and usuario_deletado = 0";
    const dataNewPassword = [newPassword, userEmail];
    await conn.query(sql, dataNewPassword);
    conn.end();
}

export default {login,changePassword};