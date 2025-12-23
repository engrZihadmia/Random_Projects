let Router = require('express').Router()

let {
    getContactControllers,
    addContactController,
    deleteContactController
} = require("../controller/getContactController")


Router.get('/contacts', getContactControllers)
Router.post('/contacts', addContactController)
Router.get('/contacts/delete/:id', deleteContactController)


module.exports = Router;