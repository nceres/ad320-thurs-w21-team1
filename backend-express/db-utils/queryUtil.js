const dbConfig = require("../../mySqlConfig.json");
const mysql = require("mysql2");
const connection = mysql.createPool(dbConfig);

exports.query = (query) => {
    return new Promise(function (resolve, reject) {
        connection.getConnection((err, conn) => {
            if (err) {
                console.log(err);
            } else {
                conn.query(query, (error, results) => {
                    if (error) {
                        console.log(error)
                    }
                    conn.release();
                    resolve(results);
                });
            }
        })
    })
}
