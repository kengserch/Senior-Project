const express = require("express");
const app = express();
const mysql = require("mysql")
const cors = require('cors')
app.use(cors());
app.use(express.json());
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const { response } = require("express");
const secret = "full-stack-login"


// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

// const bcrypt = require("bcrypt");
// const saltRounds = 10;

// const app = express();

// app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   session({
//     key: "userId",
//     secret: "subscribe",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60 * 60 * 24,
//     },
//   })
// );




const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "password",
    database: "timebox",
});

app.post('/create', (req,res) => {
    const name = req.body.name
    const startvalue = req.body.startvalue
    const endvalue = req.body.endvalue
    const hour = req.body.hour
    const date = req.body.date
    const user_id = req.body.user_id
    db.query(
        "INSERT INTO calendar_list (name,start,end,hour,date,user_id) VALUES (?,?,?,?,?,?)", 
    [name,startvalue,endvalue,hour,date,user_id], 
    (err,result) => {
        if (err){
            console.log(err)
        }else{
            res.send("Value Inserted")
        }
    }
    );
});


app.post('/create-worktime', (req,res) => {
    const worktime = req.body.worktime
    const point = req.body.point
    const status = req.body.status
    const user_id = req.body.user_id
    db.query(
        "INSERT INTO worktime (wtime,point,status,user_id) VALUES (?,?,?,?)", 
    [worktime,point,status,user_id], 
    (err,result) => {
        if (err){
            console.log(err)
        }else{
            res.send("Value Inserted")
        }
    }
    );
});

app.post('/create-breaktime', (req,res) => {
    const breaktime = req.body.breaktime
    const point = req.body.point
    const status = req.body.status
    const user_id = req.body.user_id
    db.query(
        "INSERT INTO breaktime (btime,point,status,user_id) VALUES (?,?,?,?)", 
    [breaktime,point,status,user_id], 
    (err,result) => {
        if (err){
            console.log(err)
        }else{
            res.send("Value Inserted")
        }
    }
    );
});

app.get('/calendar-list' ,(req,res) =>{
    db.query("SELECT * FROM calendar_list", (err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.get('/getuser' ,(req,res) =>{
    db.query("SELECT * FROM users", (err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


app.get('/worktime-list' ,(req,res) =>{
    db.query("SELECT * FROM worktime", (err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


app.get('/breaktime-list' ,(req,res) =>{
    db.query("SELECT * FROM breaktime", (err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});


app.get('/history-listsum' ,(req,res) =>{
    db.query("SELECT SUM(wtime) FROM worktime ", (err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.delete('/delete/:id' , (req,res) => {
    const id = req.params.id;
    db.query("DELETE FROM calendar_list WHERE id = ? " , id , (err,result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result)
        }
    })
})

app.post('/register'  , (req,res) => {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        db.query(
          "INSERT INTO users (username,password,firstname,lastname,email,job) VALUES (?,?,?,?,?,?)" ,
        [req.body.username,hash,req.body.firstname,req.body.lastname,req.body.email,req.body.job], 
        (err,result) =>{
          console.log(err);
        }
        );
    });
  
});

// app.post('/login', (req,res) => {

//   db.query(
//     "SELECT * FROM users WHERE username = ? AND password = ?" ,
//      [req.body.username,req.body.password], 
//      (err,result) =>{
//       if(err){
//       res.send({err:err})
//       }
//      if(result.length >0){
//         res.send(result)
//      }else{
//         res.send({message:"Wrong username/password"})
//       }  
//   }
//   );
// })

app.post('/login', (req,res) => {
    db.query(
      "SELECT * FROM users WHERE username = ?" ,
       [req.body.username], 
       function(err , users , fields){
           if(err) {res.json({status: 'error' , message: err}); return}
           if(users.length == 0) {res.json({status: 'error' , message: 'no user found'}); return}
           bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
            if(isLogin){
                var token = jwt.sign({id: users[0].id , username: users[0].username }  , secret , { expiresIn: "1h" });
                res.json({status: 'ok' , message: 'login success' , token})
            }else{
                res.json({status: 'error' , message: 'login failed'})
            }
            
        });
       }
    );
  })


  app.post('/authen', (req,res) => {
      try{
        const token = req.headers.authorization.split(' ')[1]
        let decoded = jwt.verify(token, secret);
        res.json({status:'ok' , decoded})
      }catch(err){
        res.json({status:'error' , message: err.message})
      }
    
  })



// app.post("/login", (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
  
//     db.query(
//       "SELECT * FROM users WHERE username = ?;",
//       username,
//       (err, result) => {
//         if (err) {
//           res.send({ err: err });
//         }
  
//         if (result.length > 0) {
//           bcrypt.compare(password, result[0].password, (error, response) => {
//             if (response) {
//               req.session.user = result;
//               console.log(req.session.user);
//               res.send(result);
//             } else {
//               res.send({ message: "Wrong username/password combination!" });
//             }
//           });
//         } else {
//           res.send({ message: "User doesn't exist" });
//         }
//       }
//     );
//   });

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


app.listen(3001, () =>{
 console.log("Running on port 3001")
});