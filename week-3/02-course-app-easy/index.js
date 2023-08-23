const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

function validateUser(username,password){
  const adminIndex = ADMINS.findIndex(existingAdmin => existingAdmin.username == username); 
  if(adminIndex==-1){
    return false ;
  }else{
    if(ADMINS[adminIndex].password == password){
      return true ;
    }else{
      return false ;
    }
  }
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin = req.body
  const existingAdmin = ADMINS.find(event=>event.username == admin.username)
  if(existingAdmin){
    res.status(403).json({message:"Admin already exists"}) ;
  }else{
    ADMINS.push(admin) ; 
    res.json({message:'Admin created succesfully'})
  }

});

app.post('/admin/login', (req, res) => {
  const adminUsername = req.headers.username
  const adminPassword = req.headers.password

  if(validateUser(adminUsername,adminPassword)){
    res.json({message:'Logged in succesfully'})
  }else{
    res.status(401).json("Invalid Credentials")
  }
});

let counter = 1 ;
app.post('/admin/courses', (req, res) => {
  // logic to create a course
  const adminUsername = req.headers.username
  const adminPassword = req.headers.password
  let courseDetails = req.body

  let auth = false ;
  if(validateUser(adminUsername,adminPassword)){
    courseDetails["id"] = counter
    counter += 1 ;
    COURSES.push(courseDetails) ;
    res.json({message : "Course Added Successfully",courseId : courseDetails["id"]})
  }else{
    res.status(401).json("Invalid Credentials")
  }



});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  const courseId = req.params.courseId ; 
  const updatedCourse = req.body
  const findIndex = COURSES.findIndex(course => course.id == courseId)
  if(findIndex == -1){
    res.status(401).json({message : "No such course exists"})
  }else{
    COURSES[findIndex] = {...COURSES[findIndex],...updatedCourse}
    res.json({message : 'Course updated successfully'})
  }
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  const adminUsername = req.headers.username
  const adminPassword = req.headers.password
  
  let auth = false ;
  if(validateUser(adminUsername,adminPassword)){
    res.json({courses : COURSES})
  }else{
    res.status(401).json("Invalid Credentials")
  }


});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
});

app.post('/users/login', (req, res) => {
  // logic to log in user
});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
