const mysql = require('mysql');
const express = require('express');
const cors = require("cors");
// const http = require('http');
const { nanoid } = require("nanoid");
const fs = require('fs');
var app = express();
const bodyParser = require('body-parser');
const PORT = 6021;


app.use(cors())
app.use(bodyParser.json());


var mysqlConnection = mysql.createConnection({
    host     : '14.225.192.113',
    user     : 'admin',
    password : 'MinhThanh6021',
    database : 'api-mtdd'
    // host     : '127.0.0.1',
    // user     : 'root',
    // password : '',
    // database : 'api-mtdd'

});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Database connection success.');
    } else {
        console.log('Database connection error:'+ JSON.stringify(err, undefined, 2));
    }
});

app.listen(PORT,() => console.log(`Express server listening on: ${PORT}`));

// Get All User
app.get('/api/getuser', (req, res) => {  
    console.log(nanoid())  
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields)=> {        
        if (!err) {            
            res.send(rows);
        } else {
            console.log(err);
        }
    })
    
});

// Get a Username
app.get('/api/getuser/:username', (req, res) => {    
    mysqlConnection.query('SELECT * FROM users WHERE username = ?', [req.params.username], (err, rows, fields)=> {                   
            if (!err) {          
               return res.json(rows)
            } else {
                console.log(err);
            }   
       
    })
    
});

// // Delete a Products
// app.delete('/api/products/:id', (req, res) => {    
//     mysqlConnection.query('DELETE FROM products WHERE id = ?', [req.params.id], (err, rows, fields)=> {                   
//             if (!err) {            
//                 res.send({success: true});
//             } else {
//                 console.log(err);
//             }   
       
//     })
    
// });

// // Insert a Products
// app.post('/api/products', (req, res) => {  
//     const note = req.body
    
//     const data = {id: nanoid(), name: note.name, price: note.price, description: note.description}    
//     mysqlConnection.query('INSERT INTO products SET ?', data, (err, result)=> {                   
//             if (!err) {            
//                 res.send({success: true});
//             } else {
//                 console.log(err);
//             }   
       
//     })
    
// });

// // Update a Products
// app.put('/api/products/:id', (req, res) => {  
//     const note = req.body    
//     const data = [note.name, note.price, note.description, req.params.id]    
//     mysqlConnection.query('UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?', data, (err, result)=> {                   
//             if (!err) {            
//                 res.send({success: true});
//             } else {
//                 console.log(err);
//             }   
       
//     })
    
// });