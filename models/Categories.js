const db = require('../database/db');
class Categories{
    constructor(){

    }
    static getAllCategories(){
        let sql = "SELECT * FROM categories;"
        return db.execute(sql);
    }
    static async getCategoryById(id){
        let sql = `SELECT * FROM categories WHERE id=${id};`;
        return db.execute(sql);
    }
    static async getCategoryByName(name){
        let sql = `SELECT * FROM categories WHERE name=${name};`;
        return db.execute(sql);
    }
}

module.exports = Categories;
