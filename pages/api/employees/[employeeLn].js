import mysql from 'mysql2';

export default function handler(req, res){
    const {employeeLn} = req.query

    const connection = mysql.createConnection({
        host: "localhost",
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        socketPath: "/run/mysqld/mysqld.sock"

    })

    if(req.method === 'GET'){
        connection.query(`SELECT first_name, last_name, DATE_FORMAT(birthday, "%M %d, %Y") as birthday, age FROM employees WHERE BINARY last_name = '${employeeLn}'`, (error, results, fields) => {
            if(error){
                res.status(500).json({status: error})
            }else{
                res.status(200).json(results)
            }
        })
    }
    if(req.method === 'DELETE'){
        connection.query(`DELETE from employees WHERE BINARY employee_id = '${employeeLn}';`, (error, results, fields) =>{
            if(error){
                res.status(500).json({status: error})
            }else{
                res.status(200).json(results)
            }
        })
    }
    if(req.method === 'PATCH'){
        const {first_name, last_name, birthday, age } = req.body.updateEmployee;
        console.log({first_name, last_name, birthday, age } )
        connection.query(`UPDATE employees SET first_name = '${first_name}', last_name = '${last_name}', birthday = '${birthday}', age = ${age} WHERE employee_id = '${employeeLn}';`, (error, results, fields) =>{
            if(error){
                res.status(500).json({status: error})
            }else{
                res.status(200).json(results)
            }
        })
    }
}
