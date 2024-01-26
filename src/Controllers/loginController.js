const User = require('../Model/user')

exports.index = (req, res) => {
    res.render('login')
}

exports.register = async (req, res) => {
    try {
      const newUser = new User(req.body)
      await newUser.registerUser()

      if(newUser.errors.length > 0){
        req.flash('errors', newUser.errors)
        req.session.save(() => {
            return res.redirect('back')
        })
        return
      }

      req.flash('success', 'Usuario Cadastrado com Sucesso.')
      req.session.save(() => {
        return res.redirect('back')
      })
      
    } catch (error) {
        console.log(error);
    }
}

exports.login = async (req, res) => {
  try {
    const newUser = new User(req.body)
    await newUser.loginUser()

    if(newUser.errors.length > 0){
      req.flash('errors', newUser.errors)
      req.session.save(() => {
          return res.redirect('back')
      })
      return
    }

    req.flash('success', 'Você Logou com Sucesso.')
    req.session.user = newUser.user
    req.session.save(() => {
      return res.redirect('back')
    })
    
  } catch (error) {
      console.log(error);
  }
}

exports.logout = (req, res) => {
  req.session.destroy()
  res.redirect('/login/index')
}