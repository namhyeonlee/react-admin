const express = require("express"); 
const app = express();
const port = 4000; 
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const router = express.Router();
const crypto = require('crypto');
const { constants } = require("buffer");

//const { encrypt, decrypt } = require('./EncryptionHandler')
//const {encrypt, encryptWithSalt} = require('./crypto');



const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString('base64'));
        });
    });



const createHashedPassword = (plainPassword) => {
   
    new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 9999, 64, 'sha512', (err, key) => {
            if (err) reject(err);
            resolve({ password: key.toString('base64'), salt });
        });
    });


}

// const hashedpassword = (pass) => {
//    crypto.randomBytes(64, (err, buf) => {
//        const salt = buf.toString('base64');
//         console.log('salt: ', salt);
//         crypto.pbkdf2(pass, salt, 1000, 64, 'sha512', (err, key) => {
//             console.log('password : ', key.toString('base64'));
            
//         });
      
//     }); 
    
// }


    




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user : "root", 
    password : "love4067", 
    database: "user",
    insecureAuth: true
});


connection.connect();

connection.query('SELECT * FROM user.new_table', function(err, results, fields) {
  if (err) {
    console.log(err);
  }
    // console.log(results);
    console.log('성공');
});



//회원가입
app.post('/register', (req, res) => {

    let salt = crypto.randomBytes(128).toString('base64');
    let hashPassword = crypto.createHash("sha512").update(req.body.password + salt).digest("hex");
 
 
     let sql = 'INSERT INTO new_table (email, password, name, age, gender, tel, salt) VALUES (?,?,?,?,?,?,?)';
     let email= req.body.email;
     let password = hashPassword;
     let name = req.body.name;
     let age = req.body.age;
    let gender = req.body.gender;
    let tel = req.body.tel;

    
 
    let params = [email, password, name, age, gender, tel, salt];
    console.log(params);
     connection.query(sql, params,
         (err, rows, fields) => {
             if(err){
                console.log("err :", err);
             }
             console.log('성공')
             res.send('1');
         })
 
 });


 //로그인 처리

app.post('/login', (req, res) => {
    let sql1 = 'SELECT COUNT(*) AS result FROM new_table WHERE email = ?';
    let email= req.body.email;
    let password = req.body.password;
   
    
    connection.query(sql1, email, (err, data) => {
        if (!err) {
            //결과값이 1보다 작다면(동일한 id가 없다면)
            if (data[0].result < 1) {
                res.send({ 'msg': '입력하신 id가 일치하지 않습니다' })
                
            } else {
                const sql2 = "select salt from `new_table` WHERE email=?"
                connection.query(sql2, email, (err, data) => {
                    const salt = data[0].salt;
                    const hashPassword = crypto.createHash("sha512").update(password + salt).digest("hex");

                //동일한 id가 있으면 비밀번호 일치 확인
                const sql3 = `SELECT 
                                CASE (SELECT COUNT(*) FROM new_table WHERE email = ? AND password = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT email FROM new_table WHERE email = ? AND password = ?)
                                END AS email
                                , CASE (SELECT COUNT(*) FROM new_table WHERE email = ? AND password = ?)
                                    WHEN '0' THEN NULL
                                    ELSE (SELECT password FROM new_table WHERE email = ? AND password = ?)
                                END AS password`;
                
            // sql 란에 필요한 parameter 값을 순서대로 기재

                    const params = [email, hashPassword, email, hashPassword, email, hashPassword, email, hashPassword]

                connection.query(sql3, params, (err, data) => {
                    if (!err) {
                        res.send(data[0])
                       
                    } else {
                        res.send(err)
                    }
                })
                    

                })

               
            }
        }
    })

  
     
})
 
//이메일 중복체크
app.post('/checkid', (req, res) => {
    let sql = 'SELECT * FROM new_table WHERE email = ?'
    let email = req.body.email;
    connection.query(sql, [email], (err, rows, fields) => {
        let checkid = new Object();
        checkid.tf = false;
        
        if (rows[0] === undefined) {
            checkid.tf = true;
            res.send(checkid)
        } else {
            checkid.tf = false; // 중복됨 사용x
             res.send(checkid);  
        }
    })
    
})

//이메일 찾기
app.post('/id', (req, res) => {
    let sql ="select email from `new_table` WHERE name=? AND tel=?"
    let name= req.body.name;
    let tel= req.body.tel;
    let params = [name, tel]
    let ret =[];
  

    connection.query(sql, params, (err, result) => {
        if (!err) {
             console.log("result :", result);
            ret=result[0];
                res.send(ret);
        } else {
            console.log(`query err: ${err}`);
        }
    })
    
})


//사용자 비밀번호 찾기
app.post('/pass', (req, res) => {
   
    let sql = "select password from `new_table` WHERE name=? AND email=?"
    
    let email= req.body.email;
    let name = req.body.name;
    let params = [name, email]
    let ret =[];
  

    connection.query(sql, params, (err, result) => {
        if (!err) {
            
            ret = result[0];
            console.log("result :", result);
            res.send(ret);
        } else {
            console.log(`query err: ${err}`);
        }
    })
});

// app.post('/decryptpassword', (req, res) => {
//     let password = req.body.password;
//     let iv = req.body.iv;
//     let param = {
//         password, iv
//     }
    
//     res.send(decrypt(param))
// })


//비밀번호 변경
app.post('/change_pw', (req, res) => {
    let sql1 = "select salt from `new_table` WHERE email=?"
    let sql2 = 'UPDATE new_table SET password=? WHERE password=? and email=?';
   
    
    let email = req.body.email;
    let password = req.body.password;
    let changePass = req.body.changePass;
    let salt = crypto.randomBytes(128).toString('base64');
    let hashedChangePass = crypto.createHash("sha512").update(changePass + salt).digest("hex");

    let params = [hashedChangePass, password, email]
   
    
       connection.query(sql2, params, (err, result) => {
        if (err) { throw err; }
        else {

            res.send('User updated in database with password: ' + req.body.changePass);

        }
        
        
    })

   
})


//게시판

app.get('/boardlist', (req, res) => {
    const sql = 'SELECT idx, title, content, writer, write_date FROM board order by idx desc'
    connection.query(sql, (err, data) => {
        if (!err) {
            res.send(data);
            
        } else {
            res.send(err)
        }
    })
})

// app.get('/rownum', (req, res)=> {
//     const sql = 'SELECT @ROWNUM:=@ROWNUM+1 FROM board A, (SELECT @ROWNUM:=0) R';
//     connection.query(sql, (err, data) => {
//         if (!err) {
//             res.send(data);
            
//         } else {
//             res.send(err)
//         }
//     })
// })



//게시판 상세페이지
app.get('/postView', (req, res) => {
    const sql = 'SELECT idx, title, content, writer, write_date FROM `board` WHERE `idx` = ?';
    const idx = req.query.idx
    connection.query(sql, idx, (err, data) => {
        if (!err) {
            res.send(data);
            
        } else {

            res.send(err)
        }
    })
})

//게시판 작성
app.post('/boardinsert', (req, res) => {
    const sql = 'INSERT INTO board (title, content, writer, write_date) VALUES (?,?,?,?)';
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.body.writer;
    const write_date = req.body.write_date;
 
    params = [title, content, writer, write_date]
    
    connection.query(sql, params, (err, result) => {
        if (!err) {
           res.send(result)
        } else {
            res.send(err)
       }
    })
})



//게시판 수정
app.post('/boardupdate', (req, res) => { 
    const sql = 'UPDATE `board` SET `title` = ?, `content` = ?,`write_date`=? WHERE `idx` = ?';
    const title = req.body.title;
    const content = req.body.content;
    const write_date = req.body.write_date;
    const idx = req.body.idx;
    params = [title, content,write_date, idx]
    
    connection.query(sql, params, (err, data) => {
        if (!err) {
            console.log("write_date:", write_date)
           
           res.send(data)
        } else {
            res.send(err)
       }
    })
})



//게시판 삭제 
app.get('/boardDelete', (req, res) => {
    const sql = 'DELETE FROM `board` WHERE `idx` = ?';
    const idx = req.query.idx;

    connection.query(sql, idx, (err, data) => {
        if(!err) {
            res.send(data)
        } else {
            res.send(err)
        }
    })
})




//admin memberlist

app.get('/memberlist', (req, res) => {
    const sql = 'SELECT idx, email, password, name, age, gender, tel FROM new_table order by idx desc';
    const idx = req.query.idx;

    connection.query(sql,(err, data) => {
        if (!err) {
            res.send(data);
        } else {

            res.send(err)
        }
    })
})

//admin memberlist 상세페이지

app.get('/memberView', (req, res) => {
    const sql = 'SELECT idx, email, password, name, age, gender, tel FROM new_table WHERE `idx` = ?';
    const idx = req.query.idx;

    connection.query(sql, idx, (err, data) => {
        if (!err) {
            res.send(data);
            console.log(data);
            
        } else {

            res.send(err)
        }
    })
})

//멤버 삭제 
app.get('/memberDelete', (req, res) => {
    const sql = 'DELETE FROM `new_table` WHERE `idx` = ?';
    const idx = req.query.idx;

    connection.query(sql, idx, (err, data) => {
        if(!err) {
            res.send(data)
        } else {
            res.send(err)
        }
    })
})

//멤버정보수정

app.post('/memberupdate', (req, res) => { 
    const sql = 'UPDATE `new_table` SET `name` = ?, `age` = ?,`tel`=? WHERE `idx` = ?';
    const name = req.body.name;
    const age = req.body.age;
    const tel = req.body.tel;
    const idx = req.body.idx;
    params = [name, age, tel, idx]
    
    connection.query(sql, params, (err, data) => {
        if (!err) {
           res.send(data)
        } else {
            res.send(err)
       }
    })
})

 app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
 })

