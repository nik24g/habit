const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const userSchema = new schema({
    user_id: {
        type: String,
        default: uuidv4(),
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_first_name: {
        type: String,
    },
    user_last_name: {
        type: String,
    },
    user_password: {
        type: String,
    },
    user_role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
},{ timestamps: true })

// End of the modal

module.exports = mongoose.model("user", userSchema);