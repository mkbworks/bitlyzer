import DataAccessLayer from "../dal/db.js";

class BusinessAccessLayer
{
    constructor(dal)
    {
        this.dal = dal
    }

    static async GetBal() 
    {
        let dal = await DataAccessLayer.ConnectToDb();
        return new BusinessAccessLayer(dal);
    }

    GenerateApiKey()
    {
        return [...Array(30)].map(e => ((Math.random() * 36) | 0).toString(36)).join('');
    }

    async ValidateUser(apiKey)
    {
        let recordset = await this.dal.ValidateUser(apiKey);
        let RowCount = recordset[0]["RowCount"];
        if(RowCount > 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    async GetTargetUrl(hash)
    {
        
    }

    async Close()
    {
        await this.dal.Close();
    }
};

export default BusinessAccessLayer;