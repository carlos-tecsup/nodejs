const express = require('express');
const router  = express.Router();
const {ensureAuthenticated} = require('../config/auth') 
const Course = require('../models/course');
//login page
router.get('/inicio', (req,res)=>{
    res.render('welcome');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})
router.get('/dashboard',ensureAuthenticated,async(req,res)=>{
      const course = await Course.find();

    res.render('dashboard',{
        user: req.user,
        course
    });
});


router.post('/add', async (req, res, next) => {
  const course = new Course(req.body);
  await course.save();
  res.redirect('/dashboard');
});

router.get('/get/:id', async (req, res, next) => {
  let { id } = req.params;
  const course = await Course.findById(id);
  course.status = !course.status;
  await course.save();
  res.redirect('/dashboard');
});


router.get('/edit/:id', async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  console.log(course)
  res.render('edit', { course });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Course.update({_id: id}, req.body);
  res.redirect('/dashboard');
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Course.remove({_id: id});
  res.redirect('/dashboard');
});


module.exports = router; 