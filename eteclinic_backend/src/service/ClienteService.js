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

async function updateClient({id, cpf, name, phone, cellPhone, email, typeBlood}){
    const conn = await database.connect();
    const sql = "call sp_update_cliente(?,?,?,?,?,?,?)";
    const updateClientData=[
        id,
        cpf,
        name,
        phone,
        cellPhone,
        email,
        typeBlood
    ]
    conn.query(sql, updateClientData);
    conn.end();
}

export default {insertCliente, updateClient}