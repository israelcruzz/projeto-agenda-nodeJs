const express = require("express");
const route = express.Router();
const { homeView } = require('./src/Controllers/homeController')
const { index, register, login, logout } = require('./src/Controllers/loginController')
const { viewContact, registerContact, editContact, editFinish, deleteContact } = require('./src/Controllers/contactController')

route.get('/', homeView)

route.get('/login/index', index)
route.post('/login/register', register)
route.post('/login/login', login)
route.get('/login/logout', logout)

route.get('/cadastrar/contato', viewContact)
route.post('/cadastrar/contato', registerContact)

route.get('/contato/edit/:id', editContact)
route.post('/contato/edit/finish/:id', editFinish)
route.get('/contato/delete/:id', deleteContact)

module.exports = route;
