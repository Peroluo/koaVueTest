import mysql from 'mysql'
import fs from 'fs'
import path from 'path'

export default () => {
  const { DATABASE, USERNAME, PASSWORD, PORT, HOST } = global.config.database
  let pool
  const sqlSource = fs.readFileSync(
    path.resolve(__dirname, '..', './sql/homepay.sql'),
    'utf-8'
  )
  const init = mysql.createConnection(global.config.database)
  init.connect()
  init.query(`CREATE DATABASE ${DATABASE}`, err => {
    pool = mysql.createPool({
      host: HOST,
      user: USERNAME,
      port: PORT,
      password: PASSWORD,
      database: DATABASE
    })
    if (err) {
      console.log('✅  homepay Database created already.')
    } else {
      console.log('✅  Create homepay Database')
      query(sqlSource).then(res => console.log('✅  Import sql file'))
    }
  })
  init.end()

  global.query = (sql, values) => {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })
  }
}
