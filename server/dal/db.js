import sql from "mssql";
import chalk from "chalk";
import { Response, SqlError } from "../models/response.js";

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
        let iter = 1;
        while(iter <= RETRY_COUNT) {
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
                console.log(chalk.green("SQL database connection established successfully."));
                return new DataAccessLayer(pool);
            } catch(err) {
                if(err.code === "ETIMEOUT" || err.code === "ELOGIN") {
                    // ELOGIN is returned when the login attempt fails.
                    // ETIMEOUT is returned when the connection attempt times out.
                    if(err.code === "ETIMEOUT") {
                        console.log(chalk.red(`Attempt ${iter} :: Connection to SQL database timed out.`));
                    } else {
                        console.log(chalk.red(`Attempt ${iter} :: Login attempt failed.`));
                    }
                    
                    console.log(`Server will try to connect to the database again after ${RETRY_INTERVAL} seconds.`);
                    await this.sleep(RETRY_INTERVAL * 1000);
                    RETRY_INTERVAL = RETRY_INTERVAL * 2;
                    iter++;
                } else {
                    throw err;
                }
            }
        }
    }

    async ValidateUser(apiKey) {
        try {
            const request = this.pool.request();
            request.input("apiKey", sql.NVarChar, apiKey);
            const result = await request.query("SELECT COUNT(*) AS 'RowCount' FROM [bitlyzer].[users] WHERE api_key=@apiKey");
            let RowCount = result.recordset[0]["RowCount"];
            if(RowCount > 0) {
                return new Response("success", true);
            } else {
                return new Response("success", false);
            }
        } catch(err) {
            return new Response("error", new SqlError(err.code, `Error occurred while validating user: ${err}`));
        }
    }

    async NewUser(email, name) {
        try {
            const request = this.pool.request();
            request.input("Email", sql.NVarChar, email);
            request.input("Name", sql.NVarChar, name);
            const result = await request.execute("[bitlyzer].[spNewUser]");
            let data = {
                "Email": result.recordset[0]["Email"],
                "Name": result.recordset[0]["Name"],
                "ApiKey": result.recordset[0]["ApiKey"]
            };
 
            return new Response("success", data);
        } catch(err) {
            return new Response("error", new SqlError(err.code, `Error occurred while creating new user: ${err}`));
        }
    }

    async FindLink(hashValue, apiKey) {
        try {
            const request = this.pool.request();
            request.input("hashValue", sql.NVarChar, hashValue);
            request.input("apiKey", sql.NVarChar, apiKey);
            const result = await request.query("SELECT B.link as 'Link' FROM [bitlyzer].[users] A INNER JOIN [bitlyzer].[links] B on A.user_id = B.user_id WHERE A.api_key = @apiKey AND B.hash_value = @hashValue");
            if(result.recordset.length == 1) {
                let data = {
                    "hash": hashValue,
                    "link": result.recordset[0]["Link"]
                };
                return new Response("success", data);
            } else if(result.recordset.length > 1) {
                let sqlErr = new SqlError("ERR_DUPHASH", `More than one link has been assigned to the given hash (${hashValue})`);
                return new Response("error", sqlErr);
            } else {
                let data = {
                    "hash": hashValue,
                    "link": ""
                };
                return new Response("success", data);
            }
        } catch(err) {
            return new Response("error", new SqlError(err.code, `Error occurred while finding link mapped to hash (${hashValue}): ${err}`));
        }
    }

    async NewLink(apiKey, link) {
        try {
            const request = this.pool.request();
            request.input("Link", sql.NVarChar, link);
            request.input("ApiKey", sql.NVarChar, apiKey);
            const result = await request.execute("[bitlyzer].[spNewLink]");
            let data = {
                "Hash": result.recordset[0]["Hash"],
                "Link": result.recordset[0]["Link"]
            };
            return new Response("success", data);
        } catch(err) {
            return new Response("error", new SqlError(err.code, `Error occurred while creating new link: ${err}`));
        }
    }

    async DeleteLink(apiKey, hashValue) {
        try {
            const request = this.pool.request();
            request.input("hash_value", sql.NVarChar, hashValue);
            request.input("ApiKey", sql.NVarChar, apiKey);
            request.output("RowsAffected", sql.Int);
            const result = await request.execute("[bitlyzer].[spDeleteLink]");
            let RowsAffected = result.output["RowsAffected"];
            return new Response("success", RowsAffected);
        } catch(err) {
            return new Response("error", new SqlError(err.code, `Error occurred while deleting link: ${err}`));
        }
    }

    async Close() {
        await this.pool.close();
        console.log(chalk.green("SQL database connection pool has been closed."));
    }
}

export default DataAccessLayer;