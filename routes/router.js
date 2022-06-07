const Router = require('express');
const router = Router();
const db = require('../db');

router.get('/', function(req, res) {
  res.redirect('/list')
})

//страница с карточками студентов
router.get('/list', async function(req, res) {
  let students = await db.query('SELECT * FROM students')
  students = students.rows.sort((a, b) => { //сортировка по фамилии
    return (a.surname > b.surname) ? 1 :
      (a.surname === b.surname) ? 0 : -1
  })
  res.render('./layouts/list.hbs', {
    students: students,
    isList: true
  });
})

//страница для добавления данных о новом студенте
router.get('/create', function(req, res) {
  res.render('./layouts/create.hbs', {
    isCreate: true
  })
})

router.post('/create', async function (req, res) {
  let student = req.body
  await db.query("INSERT INTO students(name, surname, patronim, date, faculty, stud_group) VALUES($1,$2,$3,$4,$5,$6)",
  [student.name,student.surname,student.patronim,student.date,student.faculty,student.group]);
  res.redirect('/');
});

//действия с карточкой студента (удаление/редактирование)
router.post('/stud_act', async function(req, res) {
  if (req.body.act === 'delete') {
    await db.query('DELETE from students where stud_id=$1', [req.body.id])
    res.redirect('/')
  }
  else {
    res.redirect('/edit/' + req.body.id)
  }
})

//страница редактирования студента
router.get('/edit/:id', async function(req, res) {
  let student = await db.query('SELECT * FROM students where stud_id=$1', [req.params.id])
  res.render('./layouts/edit.hbs', {
    student: student.rows[0]
  })
})

router.post('/edit/:id', async function(req, res) {
  let student = req.body
  await db.query('UPDATE students SET name=$1, surname=$2, patronim=$3, date=$4, faculty=$5, stud_group=$6 WHERE stud_id=$7',
  [student.name,student.surname,student.patronim,student.date,student.faculty,student.group,req.params.id])
  res.redirect('/')
})

module.exports = router;
