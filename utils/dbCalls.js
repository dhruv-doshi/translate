const Pool = require('pg').Pool

db = require('../db.config')

const pool = new Pool({
    user: db.USERNAME,
    host: db.HOST,
    database: db.DATABASE_NAME,
    password: db.PASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false
    }
})

exports.saveDataToDB = (data) => {

    pool.query('INSERT INTO cache (source, input, target, result) VALUES ($1, $2, $3, $4)', [data.source, data.input, data.target, data.result], (error, results) => {
  
      if (error) {
            throw error
        }
        console.log('Data saved')
    })
}
 
exports.findInDB = (data) => {
    return new Promise((resolve, reject) => {
        //code to find the data in the DB
        const postgres = " SELECT * FROM cache WHERE input = '" + data.input + "';"
        pool.query(postgres, (error, results) => {
          if(error) {
            reject(error)
          }
          const dbSearch = {
            rowCount: results.rowCount,
            rows: results.rows
          }
          resolve(dbSearch)
        })
    });
}