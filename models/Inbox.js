const db = require('../database/db');
class Inbox{
    constructor(){

    }
    static getAllInbox(){
        let sql = "SELECT * FROM inbox;"
        return db.execute(sql);
    }
    static async getInboxByProduct(id){
        let sql = `SELECT id,description,quantity FROM inbox WHERE product_id=${id};`;
        return db.execute(sql);
    }
}

module.exports = Inbox;