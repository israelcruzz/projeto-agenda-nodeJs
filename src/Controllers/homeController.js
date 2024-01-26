const Contact = require('../Model/contact')

exports.homeView = async (req, res) => {
    const contacts = await Contact.listenerContacts()
    res.render('index', { contacts })
}