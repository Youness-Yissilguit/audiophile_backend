const db = require('../database/db');
class Users{
    constructor(firstname, lastname, email, password, phone){
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }
    static async getUserByEmail(email){
        let sql = `SELECT * FROM users WHERE email='${email}';`;
        //let sql = `SELECT * FROM products WHERE id=1;`
        return db.execute(sql);
    }
    static async getUserById(id){
        let sql = `SELECT first_name,last_name,email,phone FROM users WHERE id=${id};`;
        return db.execute(sql);
    }
    async register(){
        let sql = `INSERT INTO users(first_name, last_name, email, password, phone) 
                                VALUES('${this.firstname}','${this.lastname}','${this.email}','${this.password}','${this.phone}');`;

        const [newUser, _] = await db.execute(sql);
        return newUser;
    }
}

module.exports = Users;