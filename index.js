const fs = require("fs");
const mysql = require("mysql");
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

var app = express();

const saltRounds = 10;
const port = 3001;

let mysqlDetails = fs.readFileSync("./mysqlDetails.json" , "utf-8");
mysqlDetails = JSON.parse(mysqlDetails);

let mysqlConnection = mysql.createConnection(mysqlDetails);

mysqlConnection.connect((error) => {
    if (!error) 
    console.log("Connected!");
    else
    console.log(JSON.stringify(error , undefined , 2));
});

app.use(cors(
    {
    origin : ["http://localhost:3000"],
    methods : ["GET" , "POST"],
    credentials : true
}
));
app.use(session({
    secret : "Q$mA8%&nx&ZH",
    resave : false,
    saveUninitialized : false,
    cookie: {maxAge: 24*60*60*1000}
}));

app.use(express.urlencoded({ extended : true}));
app.use(express.json());
app.use(cookieParser());



app.get('/login' , (req , res) => {
    req.session.isAuth = true;
    console.log(req.session);
    // res.send('you just hit the home page\n')
    // if(req.session.user){
    //     console.log("hello");
    //     res.send({loggedIn : true , user : req.session.user});
    // }else{
    //     res.send({loggedIn : false , user : req.session.user});
    // }
});





// function createAdmin(username , password){
//     bcrypt.hash(password , saltRounds , (error , hash) => {
//         mysqlConnection.query("INSERT INTO ADMINS (username , password) VALUES (? ,?)" , 
//             [username , password] ,
//             (error , result) => {
//                 throw error;
//             }
//         );
//     });
// }

// app.get('/', function(req, res){
//     res.send("Hello world!");
//  });





app.post('/login' , (req , res) => {

    const username = req.body.username;
    const password = req.body.password;
     
    mysqlConnection.query("Select * from admins where username = ?" , username ,(error , result) => {
        if(error){
            res.send({error : error});
        }
        
        if(result.length > 0){
            bcrypt.compare(password , result[0].password , (error , response) => {
                if (error) throw error;
                if(response){
                    req.session.user = result;
                    console.log(req.session);
                    res.send(result);
                }
                else{
                    res.send({message : "Wrong Password!"});
                }
            });
        } 
        else{
            res.send({message : "User Doesn't Exists"});
        }
    });   
})

// app.post('/addTeacher' , (req , res) => {

//     let name = req.body.name;
//     let lectures = req.body.lectures;

//     mysqlConnection.query("INSERT INTO TEACHERS (teacher_name) Values (?)" , name , (error , result) => {
//         if(error) throw error;
//     });

//     let teacher_id;
//     let teachersData = [];

//     mysqlConnection.query("SELECT id FROM teachers where teacher_name = ?", name ,function (err, result, fields) {
//         if (err) throw err;
//         teacher_id = result[0].id;
//         // console.log(result);
//         for(let i = 0 ; i < lectures.length ; i++){
//             mysqlConnection.query("INSERT INTO lectures (batch_name , date , time_from , time_to , teacher_id) Values (? , ? , ? , ? ,?)" , [lectures[i].batch , lectures[i].date , lectures[i].from , lectures[i].to , teacher_id ], (error , result) => {
//                 if(error){
//                     res.send({message : error.sqlMessage});
//                 }

//                 mysqlConnection.query("SELECT * FROM teachers ",function (err, result, fields){
//                     if(err) throw err;
//                     for(let i = 0 ; i < result.length ; i++){
//                         let tName = result[i].teacher_name;
//                         let tId = result[i].id;
//                         mysqlConnection.query("Select batch_name , date , time_from , time_to from lectures where teacher_id = ?", tId ,(error , lectures) =>{
//                             if(error) throw err;
                            
//                             let lec= [];
//                             // teachersData.push({
//                             //     name : tName,
//                             //     lectures : Object.values(JSON.parse(JSON.stringify(result)))
//                             // });
                        
//                             for(let j= 0 ;  j < lectures.length ; j++){
//                                 lectures[i].
//                                 lec.push(Object.values(JSON.parse(JSON.stringify(lectures[i]))));
//                             }

//                             console.log(lec);
//                         });
//                     }
//                 });
//             });
//         }
//       });
// })




app.listen(port, function() {
    console.log('Ready on port %d', port);
})

