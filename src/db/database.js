const { Pool, Client } = require('pg')

let connection = null;

const getConnection = async () => {
    if (connection == null) {
        const client = new Client({
            connectionString: 'postgres://hkiioydudgswet:8bbd1fad785a775aad19d85a3512fd842ffaf74b9e6a18728641d83a335d8268@ec2-52-73-155-171.compute-1.amazonaws.com:5432/d1fusrjcud2huc',
            ssl: {
                rejectUnauthorized: false
                }
        });

        try {
            await client.connect();
            connection = client;
            console.log('Conectado com sucesso Heroku DB');
        } catch (error) {
            console.log(error);
        }
    }

    return connection;
}

module.exports = { getConnection }