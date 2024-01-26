const Contact = require('../Model/contact')

exports.viewContact = (req, res) => {
    res.render('contact', {
        contato: {}
    })
}

exports.registerContact = async (req, res) => {
    try {
       const newContact = new Contact(req.body)
       await newContact.registerContact() 

        if(newContact.errors.length > 0){
        console.log(newContact.errors)
            req.flash('errors', newContact.errors)
            req.session.save(() => res.redirect('back'))
        return
        }

        req.flash('success', 'Contato Criado Com Sucesso. 🎉')
        req.session.save(() => res.redirect(`/contato/edit/${newContact.contact._id}`))
        return
    } catch (error) {
        console.log(error);
        res.render('404')
    }
    
}

exports.editContact = async (req, res) => {
    try {
      if(!req.params.id) res.render('404')
      const user = await Contact.getContact(req.params.id)

      if(!user) res.render('404')

      res.render('contact', {
        contato: user
      })  
    } catch (error) {
        res.render('404')
        console.log(error);
    }
    
}

exports.editFinish =  async (req, res) => {
    try {
      const user = new Contact(req.body)
      await user.updateContact(req.params.id)  

      if(user.errors.length > 0){
        req.flash('errors', user.errors)
        req.save(() => res.redirect('back'))
        return
      }

      req.flash('success', 'Contato Atualizado com Sucesso. :)')
      req.session.save(() => res.redirect('back'))
      return
    } catch (error) {
      res.render('404')
      console.log(error);
    }
}

exports.deleteContact = async (req, res) => {
    try {
        if(!req.params.id) res.render('404')
        const contact = await Contact.deleteContact(req.params.id)
        
        if(!contact) res.render('404')

        req.flash('success', 'Contato Deletado com Sucesso. 😎')
        req.session.save(() => res.redirect('back'))
        return
    } catch (error) {
        res.render('404')
        console.log(error);
    }
}