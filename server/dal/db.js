import sql from "mssql";

class DataAccessLayer 
{
    constructor(pool)
    {
        this.pool = pool;
    }

    static async ConnectToDb()
    {
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
    }

    async ValidateUser(apiKey)
    {
        const request = this.pool.request();
        request.input("apiKey", sql.NVarChar, apiKey);
        const result = await request.query("SELECT COUNT(*) AS 'RowCount' FROM [bitlyzer].[users] WHERE api_key=@apiKey");
        return result.recordset;
    }

    async GetTargetUrl(hash)
    {
        
    }

    async Close()
    {
        await this.pool.close();
        console.log("SQL database connection pool has been closed.");
    }
}

export default DataAccessLayer;