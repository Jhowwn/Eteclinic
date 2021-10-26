import database from"../repository/configDb.js";

async function insertCliente({zipCode, streat, number, district, city, uf, cpf, name, phone, cellPhone, email, typeBlood}){
    const conn = await database.connect();
    const sql = "call sp_registra_cliente(?,?,?,?,?,?,?,?,?,?,?,?)";
    const newClientData=[
        zipCode, 
        streat, 
        number,
        district,
        city,
        uf,
        cpf,
        name,
        phone,
        cellPhone,
        email,
        typeBlood
    ]
    conn.query(sql, newClientData);
    conn.end();
}

async function updateClient({zipCode, streat, number, district, city, uf,id, cpf, name, phone, cellPhone, email, typeBlood}){
    const conn = await database.connect();
    const sql = "call sp_update_cliente(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    const updateClientData=[
        id,
        cpf,
        name,
        phone,
        cellPhone,
        email,
        typeBlood,
        zipCode, 
        streat, 
        number,
        district,
        city,
        uf
    ]
    conn.query(sql, updateClientData);
    conn.end();
}

async function disableClient(id){
    const conn = await database.connect();
    const sql = `update tbl_clientes set cliente_deletado = 1 where id_cliente = ${id}`
    conn.query(sql);
    conn.end();
}

async function findClient(id){
    const conn = await database.connect();
    const sql = `select * from tbl_clientes where id_cliente = ${id} and cliente_deletado = 0`
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

export default {insertCliente, updateClient, disableClient, findClient};