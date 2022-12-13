const db = require('../database/db');
class Products{
    constructor(){

    }
    static async getAllProducts(){
        let sql = "SELECT * FROM products;"
        return db.execute(sql);
    }

    static async getAllProductsByCategorie(id){
        let sql = `SELECT * FROM products WHERE category_id=${id};`;
        return db.execute(sql);
    }
    static async getProductById(id){
        let sql = `SELECT * FROM products WHERE id=${id};`;
        return db.execute(sql);
    }
}

module.exports = Products;