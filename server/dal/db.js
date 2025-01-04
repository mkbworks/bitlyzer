import sql from "mssql";

class DataAccessLayer {
    constructor(pool) {
        this.pool = pool;
    }

    static sleep(delay) {
        return new Promise(resolve => setInterval(resolve, delay));
    }

    static async ConnectToDb() {
        const RETRY_COUNT = 3;
        let RETRY_INTERVAL = 10;
        let iter = 0;
        while(iter < RETRY_COUNT) {
            try {
                const sqlConfig = {
                    user: process.env.DB_USER,
                    password: process.env.DB_PWD,
                    server: process.env.DB_HOST,
                    database: process.env.DB_NAME,
                    port: parseInt(process.env.DB_PORT),
                    options: {
                        encrypt: true,
                        trustServerCertificate: false 
                    }
                };
        
                const pool = await sql.connect(sqlConfig);
                console.log("Connected to the database successfully and created an application pool.");
                return new DataAccessLayer(pool);
            } catch(err) {
                if(err.code === "ETIMEOUT" || err.code === "ELOGIN") {
                    // ELOGIN is returned when the login attempt fails.
                    // ETIMEOUT is returned when the connection attempt times out.
                    iter++;
                    if(err.code === "ETIMEOUT") {
                        console.log(`Attempt ${iter} :: Connection to SQL database timed out.`);
                    } else {
                        console.log(`Attempt ${iter} :: Login attempt failed.`);
                    }
                    
                    console.log(`Server will try to connect to the database again after ${RETRY_INTERVAL} seconds.`);
                    await this.sleep(RETRY_INTERVAL * 1000);
                    RETRY_INTERVAL = RETRY_INTERVAL * 2;
                } else {
                    throw err;
                }
            }
        }
    }

    async ValidateUser(apiKey) {
        const request = this.pool.request();
        request.input("apiKey", sql.NVarChar, apiKey);
        const result = await request.query("SELECT COUNT(*) AS 'RowCount' FROM [bitlyzer].[users] WHERE api_key=@apiKey");
        let RowCount = result.recordset[0]["RowCount"];
        if(RowCount > 0) {
            return true;
        } else {
            return false;
        }
    }

    async NewUser(email, name) {
        const request = this.pool.request();
        request.input("Email", sql.NVarChar, email);
        request.input("Name", sql.NVarChar, name);
        const result = await request.execute("[bitlyzer].[spNewUser]");
        return {
            "Email": result.recordset[0]["Email"],
            "Name": result.recordset[0]["Name"],
            "ApiKey": result.recordset[0]["ApiKey"]
        };
    }

    async FindLink(hashValue, apiKey) {
        const request = this.pool.request();
        request.input("hashValue", sql.NVarChar, hashValue);
        request.input("apiKey", sql.NVarChar, apiKey);
        const result = await request.query("SELECT B.link as 'Link' FROM [bitlyzer].[users] A INNER JOIN [bitlyzer].[links] B on A.user_id = B.user_id WHERE A.api_key = @apiKey AND B.hash_value = @hashValue");
        return {
            "hash": hashValue,
            "link": result.recordset[0]["Link"]
        };
    }

    async Close() {
        await this.pool.close();
        console.log("SQL database connection pool has been closed.");
    }
}

export default DataAccessLayer;