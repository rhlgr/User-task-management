var express = require('express');
var router = express.Router();
const user = require('../model/userModel')
const task = require('../model/taskModel')
var excel = require('exceljs')
var emailValid = require('email-validator');




router.get('/', function (req, res, next) {
res.render('index')
});


router.get('/user', function (req, res, next) {
  user.find()
  .then((users) => {
    res.render('user', { user: users });
  }).catch((err) => {
    res.send(err)
  });
});


router.get('/task', function(req, res, next) {
  task.find()
  .then((tasks) => {
    user.find().then((users) => {
    res.render('task', { task: tasks , user : users });
  }).catch((err) => {
    console.log(err)
  }) ;
});
});


router.post('/task', function(req, res, next) {
 task.create({
  user:req.body.user,
  type:req.body.type,
  taskName:req.body.name
 })
 .then((task,user)=>{
    res.redirect("/task")
 }).catch((err)=>{
   console.log(err)
 })
});



router.get('/home', function (req, res, next) {
  user.find()
  .then((users) => {
    res.render('home', { user: users });
  }).catch((err) => {
    res.send(err)
  })
});


router.post('/create', function (req, res, next) {
  if (emailValid.validate(req.body.email)) {
    user.create(req.body)
    .then((createuser) => {
      res.redirect("/user")
    }).catch((err) => {
      res.send(err)
    })
  } else {
    res.send("invaild email address")
  }
});


router.get('/get', function (req, res, next) {
  user.find().then((user) => {
    const workbook = new excel.Workbook();
    const workbook2 = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Users');
    const worksheet2 = workbook2.addWorksheet('tasks');
    worksheet.columns = [
      { header: 'Sr.no', key: 's_no', width: 10 },
      { header: 'Name', key: 'name', width: 10 },
      { header: 'Email', key: 'email', width: 10 },
    ];
    worksheet2.columns = [
      { header: 'Sr.no', key: 's_no' },
      { header: 'Name', key: 'name' },
      { header: 'Task', key: 'type' },
    ];

    let count = 1;
    user.forEach((user) => {
      user.s_no = count;
      worksheet.addRow(user);
      count++;
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        workbook.xlsx.writeFile('users.xlsx').then((data) => {
          res.redirect("/")
        }).catch((err) => {
          console.log(err)
        })
      })
    })
    task.find().then((task) => {
      let count = 1;
      task.forEach((task) => {
        task.s_no = count;
        worksheet2.addRow(task);
        count++;
        worksheet2.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
          workbook2.xlsx.writeFile('task.xlsx').then((data) => {
            res.redirect("/")
          }).catch((err) => {
            console.log(err)
          })
        })
      })
    })

  })
});

module.exports = router;
