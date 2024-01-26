const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const UserModel = mongoose.model('User', UserSchema)

class User {
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async registerUser(){
        this.isValid()
        if(this.errors.length > 0) return

        await this.userValid()
        if(this.errors.length > 0) return

        this.user = await UserModel.create(this.body)
    }

    async loginUser(){
        this.isValid()
        if(this.errors.length > 0) return

        this.user = await UserModel.findOne({ email: this.body.email })
        this.user = await UserModel.findOne({ password: this.body.password })

        if(!this.user){
            this.errors.push('Usuário ou Senha Incorretos')
            return
        }
    }

    isValid(){
        this.cleanUp()

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail Invalido.')

        if(this.body.password < 3 || this.body.password > 50){
            this.errors.push('A Senha Deve Conter Entre 3 a 50 Caracteres.') 
        } 
    }

    async userValid(){
        const userTrue = await UserModel.findOne({ email: this.body.email })
        if(userTrue) this.errors.push('Usuário Já Existe.')
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = User;