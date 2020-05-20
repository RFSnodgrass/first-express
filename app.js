var express = require('express');
var path = require('path');
const bodyParser = require("body-parser")

var app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(express.urlencoded({ extended: false }));

const myStudents = [ { "studentId" : 1, "studentName" : "John Doe", "grades" : [{ "English" : "A" }] },
{ "studentId" : 2, "studentName" : "Jane Doe", "grades" : [{ "English" : "C" }, { "Math" : "B" }] } ]

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

app.get('/student', (req, res) => res.json(searchStudents(req)));
app.get('/students/:studentId', (req, res) => res.json(findStudent(req.params.studentId)));
app.get('/grades/:studentId', (req, res) => res.json(findStudentGrades(req.params.studentId)));

module.exports = app;
