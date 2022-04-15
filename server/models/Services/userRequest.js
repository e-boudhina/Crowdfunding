const mongoose = requrie('mongoose')

var UserRequestSchema = new mongoose.Schema({

})

module.exports = mongoose.model('userRequest', UserRequestSchema, 'userRequest')
