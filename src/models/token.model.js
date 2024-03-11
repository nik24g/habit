const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const tokenSchema = new schema({
    token_id: {
        type: String,
        default: uuidv4(),
    },
    token_user_id: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    }
},{ timestamps: true })

// End of the modal

module.exports = mongoose.model("token", tokenSchema);