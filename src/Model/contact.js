const mongoose = require('mongoose')
const validator = require('validator')

const ContactSchemma = mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    sobrenome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    }
})

const ContactModel = mongoose.model('Contact', ContactSchemma)

class Contact {
    constructor(body){
        this.body = body
        this.errors = []
        this.contact = null
    }

    static async listenerContacts(){
        const contacts = await ContactModel.find()
        return contacts
    }

    static async getContact(id){
        if(typeof id !== 'string') return
        const user = await ContactModel.findById(id)
        return user
    }

    static async deleteContact(id){
        if(typeof id !== 'string') return
        return await ContactModel.findByIdAndDelete(id)
    }

    async updateContact(id){
        this.isValid()
        if(this.errors.length > 0) return

        await ContactModel.findByIdAndUpdate(id, this.body, { new: true })
    }

    async registerContact(){
        this.isValid()
        if(this.errors.length > 0) return

        this.contact = await ContactModel.create(this.body)
    }

    isValid(){
        this.cleanUp()

        if(this.body.nome.length <= 0) this.errors.push('O Nome Deve Conter ao Menos 1 Caracter')
        if(this.body.telefone.length <= 0) this.errors.push('O Telefone é Invalido')
        if(!validator.isEmail(this.body.email)) this.errors.push('Email Invalido.')
    }

    async contactValid(){
        this.user = await ContactModel.findOne({ telefone: this.body.telefone })

        if(this.user) this.errors.push('Este Contato já foi Cadastrado.')
    }

    cleanUp(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }

        this.body = {
            nome: this.body.nome,
            sobrenome: this.body.sobrenome,
            email: this.body.email,
            telefone: this.body.telefone,
        }
    }
}

module.exports = Contact