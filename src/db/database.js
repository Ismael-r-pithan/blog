const { Pool, Client } = require('pg')

let connection = null;

const getConnection = async () => {
    if (connection == null) {
        const client = new Client({
            connectionString: process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DEV_PORT}/${process.env.DB_NAME}`,
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

