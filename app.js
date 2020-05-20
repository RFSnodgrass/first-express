var express = require('express');
var path = require('path');
const bodyParser = require("body-parser")

var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(express.urlencoded({ extended: false }));

let myStudents = [ { "studentId" : 1, "studentName" : "John Doe", "grades" : [{ "English" : "A" }], "email": "fake@fake.fake" },
{ "studentId" : 2, "studentName" : "Jane Doe", "grades" : [{ "English" : "C" }, { "Math" : "B" }], "email": "fake@fake.fake" } ]

let studentIDNum = 2 //magic number for studentID. Very bad, but too lazy to refactor.

function findStudent (studentId) {
    return myStudents.find(student => student.studentId === Number(studentId))    
}

function searchStudents (request) {
    
    if(request.query.search){
        return filteredStudents = myStudents.filter(student => student.studentName.includes(request.query.search))        
    }
    else{
        return myStudents
    }   
      
}

function findStudentGrades (studentId) {
    let foundStudent = myStudents.find(student => student.studentId === Number(studentId))
    if(foundStudent){
        return foundStudent.grades
    }
    else{
        return "No Grades Found"
    }    
}

function postStudentGrade (body, res ) {
    
    let foundStudent = myStudents.find(student => student.studentId === Number(body.studentId))
    let studentGrades = body.grades
    
    if(foundStudent){

        if(studentGrades){            
            foundStudent.grades.push(studentGrades)            
            return foundStudent
        }
        else {
            res.status(400)
            res.send('Student Grades Can Not Be Empty')
        }
    }
    else{
        res.status(400)
        res.send('Student ID Not Found')
    }

}

function postStudent (body, res ) {
    
    let addStudentName = body.studentName
    let addStudentEmail = body.email
    
    if(addStudentName && addStudentEmail){

        studentIDNum++
        myStudents.push({ "studentId" : studentIDNum, "studentName" : addStudentName, "grades" : [], "email": addStudentEmail })
        return myStudents
        
    }
    else{
        res.status(400)
        res.send('Student Name or email can not be empty')
    }

}

app.get('/student', (req, res) => res.json(searchStudents(req)));
app.get('/students/:studentId', (req, res) => res.json(findStudent(req.params.studentId)));
app.get('/grades/:studentId', (req, res) => res.json(findStudentGrades(req.params.studentId)));
app.post('/grade', (req, res) => res.json(postStudentGrade(req.body, res)));
app.post('/register', (req, res) => res.json(postStudent(req.body, res)));

module.exports = app;
