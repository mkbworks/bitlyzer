import DataAccessLayer from "../dal/db.js";

class BusinessAccessLayer {
    constructor(dal) {
        this.dal = dal
    }

    static async GetBal() {
        let dal = await DataAccessLayer.ConnectToDb();
        return new BusinessAccessLayer(dal);
    }

    async ValidateUser(apiKey) {
        let recordset = await this.dal.ValidateUser(apiKey);
        let RowCount = recordset[0]["RowCount"];
        if(RowCount > 0) {
            return true;
        } else {
            return false;
        }
    }

    async NewUser(email, name) {
        await this.dal.NewUser(email, name);
    }

    async Close() {
        await this.dal.Close();
    }
};

export default BusinessAccessLayer;