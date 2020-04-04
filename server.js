const express = require('express');
const app = express();
var bodyParser=require('body-parser');
const port = 3000;
var opn= require('opn');
var routeSignUp = require('./Routes/SignUp');
var routeLogin=require('./Routes/Login');
var routeCompany=require('./Routes/Company');
var routeCompany2=require('./Routes/Employer');
var routeAddCompany=require('./Routes/AddCompany');
var routeAddDepartment=require('./Routes/AddNewDepartment');
var routeAddNewEmployer = require('./Routes/AddNewEmployer');

// Setting up the public directory
app.use(bodyParser.urlencoded({    //obligatoire 
    extended: true
 }));
app.use(bodyParser.json());

app.use(express.static('public'))



// API'S
app.use(routeSignUp);
app.use(routeLogin);
app.use(routeCompany);
app.use(routeCompany2);
app.use(routeAddCompany);
app.use(routeAddDepartment);
app.use(routeAddNewEmployer);

app.listen(port, () => {console.log(`listening on port ${port}!`);
//opn("http://localhost:3000/vue/login.html")
});