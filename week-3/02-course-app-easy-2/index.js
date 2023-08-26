const express = require('express');
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const secretKeyAdmin = "S3cr3t1"

const generateJwt = (user)=>{
  const payload = {user : user.username} ; 
  return jwt.sign(payload,secretKeyAdmin,{expiresIn : '1h'})
}

const authenticateJwt = (req,res,next)=>{
  const authHeader = req.headers.authorization
  if(authHeader){
    const token = authHeader.split(' ')[1] ; 
    jwt.verify(token,secretKeyAdmin,(err,user)=>{
      if (err){
        return res.sendStatus(403) ; 
      }
      console.log('Authenticated user:', user);
      req.user = user ; 
      next() ;
    }) ; 
  }else{
    res.sendStatus(401) ; 
  }
}


// Admin routes
app.post('/admin/signup', (req, res) => {
  const admin = req.body
  const existingAdmin = ADMINS.find((a) => a.username === admin.username)
  if (existingAdmin){
    res.status(403).json({message : 'Admin already exists'}) ;
  }else{
    ADMINS.push(admin) ;
    const token = generateJwt(admin) ;
    res.json({message : 'Admin created succesfully', token})
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const {username, password} = req.headers ; 
  const admin = ADMINS.find(a => a.username === username && a.password === password )

  if (admin) {
    const token = generateJwt(admin);
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Admin authentication failed' });
  }
});

app.post('/admin/courses', authenticateJwt, (req, res) => {
  // logic to create a course
  const course = req.body
  course.id = COURSES.length + 1
  COURSES.push(course)
  console.log(COURSES)
  res.json({message: 'Course created successfully', courseId : course.id })

});

app.put('/admin/courses/:courseId', authenticateJwt, (req, res) => {
  // logic to edit a course
  const courseId = parseInt(req.params.courseId)
  const courseIndex  = COURSES.findIndex(course => course.id === courseId)

  if (courseId > -1){
    const updatedCourse = {...COURSES[courseIndex], ...req.body}
    console.log(updatedCourse);
    console.log(COURSES)
    COURSES[courseIndex] = updatedCourse ; 
    res.json({message : 'Course updated successfully'}) ; 
  }else{
    res.status(404).json({message : 'Course not found'}) ; 
  }
});

app.get('/admin/courses', authenticateJwt, (req, res) => {
  // logic to get all courses
  res.json({courses : COURSES})

});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user = req.body ; 
  const existingUser = USERS.find(u => u.username === user.username) ;
  if (existingUser) {
    res.status(403).json({message : 'User already exists'})
  }else{
    USERS.push(user) ; 
    const token = generateJwt(user) ;
    res.json({message : 'User created successfully',token} ) ;
  }
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  const {username, password} = req.headers ;
  const user = USERS.find(u=> u.username == username && u.password === password) ;
  if(user){
    const token = generateJwt(user);
    res.json({message : 'Logged in successfully', token})

  }else{
    res.send(403).json({message : "User authentication failed"})
  }
});

app.get('/users/courses',authenticateJwt, (req, res) => {
  // logic to list all courses
  res.json({courses : COURSES})
});

app.post('/users/courses/:courseId', authenticateJwt, (req, res) => {
  // logic to purchase a course
  const courseId = parseInt(req.params.courseId) ; 
  const course = COURSES.find(c => c.id === courseId) 
  if(course){
    const user = USERS.find(u => u.username === req.user.user)
    console.log(req.user.user);
    if(user) { 
      if (!user.purshasedCourses){
        user.purshasedCourses = []
      }
      user.purshasedCourses.push(course)
      res.json({message : 'Course purchased successfully'})
    }else{
      res.status(403).json({message : 'User not found'})
    }
  }else{
    res.status(404).json({message : 'Course not found'}) ;
  }
});

app.get('/users/purchasedCourses', authenticateJwt ,(req, res) => {
  // logic to view purchased courses
  const user = USERS.find(u => u.username = req.user.user)
  if(user && user.purshasedCourses){
    res.json({purshasedCourses : user.purshasedCourses})
  }else{
    res.status(404).json({message : 'No courses purchased'})
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
