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
        connection.query('SELECT first_name, last_name, DATE_FORMAT(birthday, "%Y-%m-%d") as birthday, age , employee_id FROM employees ', (error, results, fields) => {
            if(error){
                res.status(500).json({status: error})
            }else{
                res.status(200).json(results)
            }
        })
    }
    else if(req.method === 'POST'){
        const employee = req.body.newEmployee;
        connection.query('INSERT INTO employees SET ?', employee, (error, results, fields) =>{
            if(error) throw error;
            console.log('New employee added to the system: ', results)
            res.status(200).json(results)
        })
    }else{
        res.status(500).json({status: "error"})
    }
}
