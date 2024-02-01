const express = require('express');
const sequelize = require('./config/db.config.js');
const bodyParser = require('body-parser');
const UserController = require('./controllers/UserController');
const UserValidation = require ('./validations/UserValidation');
const CompanyController = require('./controllers/CompanyController');
const CompanyValidation = require ('./validations/CompanyValidation');
const DepartmentController = require('./controllers/DepartmentController');
const DepartmentValidation = require ('./validations/DepartmentValidation');
const User = require('./models/User');
const pg = require('pg'); 

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

//User routes
app.get('/api/users/:user_id',UserValidation.show, UserController.show);
app.get('/api/users',UserValidation.paginated, UserController.paginated);
app.post('/api/users', UserValidation.create, UserController.create);
app.put('/api/users/:user_id', UserValidation.update, UserController.update);
app.delete('/api/users/:user_id',UserValidation.delete, UserController.delete);

//Company routes
app.get('/api/companies/:company_id', CompanyValidation.show, CompanyController.show);
app.get('/api/companies',CompanyValidation.paginated, CompanyController.paginated);
app.post('/api/companies', CompanyValidation.create, CompanyController.create);
app.put('/api/companies/:company_id', CompanyValidation.update, CompanyController.update);
app.delete('/api/companies/:company_id', CompanyValidation.delete,CompanyController.delete);

//Department routes
app.get('/api/companies/:company_id/departments/:department_id', DepartmentValidation.show, DepartmentController.show);
app.post('/api/companies/:company_id/departments', DepartmentValidation.create, DepartmentController.create);
app.put('/api/companies/:company_id/departments/:department_id', DepartmentValidation.update, DepartmentController.update);
app.delete('/api/companies/:company_id/departments/:department_id', DepartmentValidation.delete, DepartmentController.delete);

//Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/health', (req, res) => {
    res.send('I am healthier.');
});



