const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const mysql = require('mysql');
const Sequelize = require('sequelize');

const connection = mysql.createPool({
    connectionLimit : 10,
    host     : 'us-cdbr-iron-east-03.cleardb.net',
    user     : 'bc12b8f4c0f975',
    password : '7936ad95',
    database : 'heroku_131a3d4f014a8b6'
});


const sequelize = new Sequelize('mysql://bc12b8f4c0f975:7936ad95@us-cdbr-iron-east-03.cleardb.net/heroku_131a3d4f014a8b6?reconnect=true', {
    dialect: 'mysql'
});

router.post('/signup', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const users = {
        'username': username,
        'password': hash
    };
    connection.query('select * from users where username = ?',[username], (error,results,field) => {
        if (error) {
            console.log("error ocurred", error);
            res.send({
                "code" : 400,
                "failed": "error ocurred"
            })
        }
        let usernameRegex = /^[a-z0-9]+$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json ({
                error: "Invalid username",
                code: 1
            })
        } else if(results.length > 0) {
            return res.status(409).json({
                error: "Username already exists",
                code: 3
        })} else if(password.length === 0) {
            return res.status(400).json({
                error: "Password is too short",
                code: 2
            })
        } else {
            connection.query('insert into users set ?', users, (error,results,field) => {
                if (error) {
                    console.log("error ocurred", error);
                    res.send({
                        "code" : 400,
                        "failed": "error ocurred"
                    })
                }
                const Memo = sequelize.define(username, {
                    id: {
                      type: Sequelize.INTEGER,
                      primaryKey: true,
                      autoIncrement: true
                    },
                    title: {
                      type: Sequelize.STRING,
                      allowNull: true
                    },
                    memo: {
                      type: Sequelize.TEXT,
                      allowNull: true
                    }
                },{ timestamps: false });
                
                res.json(Memo);
                
            })
        }
    })
});


router.post('/login', (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    connection.query(`select * from users where username = ?`, [username], (error,results,field) => {
        if(typeof req.body.password !== "string") {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            });
        }
        if (error) {
            res.send({
                'code': 400,
                'failed': 'Error occurred'
            })
        } else {
            if(results.length > 0) {
                if(bcrypt.compareSync(password, results[0].password)) {
                    let sess = req.session;
                    sess.user = { username: results[0].username };
                    const Memo = sequelize.define(results[0].username+'s', {
                        id: {
                          type: Sequelize.INTEGER,
                          primaryKey: true,
                          autoIncrement: true
                        },
                        title: {
                          type: Sequelize.STRING,
                          allowNull: true
                        },
                        memo: {
                          type: Sequelize.TEXT,
                          allowNull: true
                        }
                        },{ timestamps: false });
                    Memo.sync().then(() => {
                        return Memo.findAll({ raw: true }).then(memo => {
                            res.json(memo)
                        })
                    })
                    
                } else {
                    res.status(401).json({
                        "code": 401,
                        "failed": "Username and password does not match"
                    });
                }
            } else {
                res.status(401).json({
                    'code': 401,
                    'failed': 'Username does not exists'
                })
            }
        }
    })
});

router.get('/getinfo', (req, res) => {
    if(typeof req.session.user === "undefined") {
        return res.status(401).json({
            error: 1
        });
    }
    const Memo = sequelize.define(req.session.user.username+'s', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: Sequelize.STRING,
          allowNull: true
        },
        memo: {
          type: Sequelize.TEXT,
          allowNull: true
        }
        },{ timestamps: false });
    Memo.sync().then(() => {
        return Memo.findAll({ raw: true }).then(memo => {
            res.json({ username: req.session.user.username, memo: memo})
        })
    })
});

router.post('/logout', (req,res) => {
    req.session.destroy(err => { if(err) throw err });
    return res.json({ sucess: true });
});

module.exports = router;