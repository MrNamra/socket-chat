const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type     : String,
        required : true
    },
    email: {
        type: String,
        required : true
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required : true
    },
    isOnline: {
        type: String,
        default: '0'
    }
},
{
    timestamp: true
}
)

module.exports = mongoose.model('User', UserSchema);