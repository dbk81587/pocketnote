const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('mysql://bc12b8f4c0f975:7936ad95@us-cdbr-iron-east-03.cleardb.net/heroku_131a3d4f014a8b6?reconnect=true', {
    dialect: 'mysql'
});

router.post('/create', (req,res) => {
    let username = req.session.user.username;
    const Memo = sequelize.define(username+'s', {
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
        return Memo.create({ title: req.body.title, memo: req.body.memo })
        }).then(() => {
            return Memo.findAll({ raw: true }).then(memo => {
                res.json(memo)
            })
        })
})

router.put('/edit', (req, res) => {
    let username = req.session.user.username;
    const Memo = sequelize.define(username+'s', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true
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
        return Memo.update({ title: req.body.title, memo: req.body.memo } , { where: {id: req.body.id } })
        .then(() => {
            return Memo.findAll({ raw: true }).then(memo => {
                res.json(memo)
            })
        })
    })
})

router.post('/delete', (req,res) => {
    let username = req.session.user.username;
    const Memo = sequelize.define(username+'s', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true
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
        return Memo.destroy({ where: {id: req.body.id} })
    })
    res.json(Memo)
})

module.exports = router;