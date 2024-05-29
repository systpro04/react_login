const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.listen(3002, ()=>{
    console.log('Server is running on port 3002')
})

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'userdb',
})

app.post('/register', (req, res)=>{
    const sentEmail =  req.body.Email
    const sentUserName =  req.body.UserName
    const sentPassword =  req.body.Password

    const SQL = 'INSERT INTO users(username, email, password) VALUES (?,?,?)'
    const Values =  [sentEmail, sentUserName, sentPassword ]

    db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send(err)
        }else{
            console.log('User added Successfully!')
            res.send({message: 'User Added'})
        }
    })
});

app.post('/login', (req, res)=>{
    const sentLoginUserName =  req.body.LoginUserName
    const sentLoginPassword =  req.body.LoginPassword

    const SQL = 'SELECT * from users where username = ? AND password = ?'
    const Values = [sentLoginUserName, sentLoginPassword]

    db.query(SQL, Values, (err, results)=>{
        if(err){
            res.send({error: err})
        }
        if(results.length > 0){
            res.send(results)
        }else{
            res.send({message: 'Credentials Dont Match!!!'})
        }

    })
});

app.get('/users', (req, res) => {
    const SQL = 'SELECT * FROM users';
    
    db.query(SQL, (err, results) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.send(results);
        }
    });
});

app.delete('/delete/:id', (req, res) => {
    const userId = req.params.id;
    const SQL = 'DELETE FROM users WHERE id = ?';
    
    db.query(SQL, userId, (err, results) => {
        if (err) {
            res.send({ error: err });
        } else {
            res.send({ message: 'User deleted successfully!' });
        }
    });
});

