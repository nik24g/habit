const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { v4: uuidv4 } = require('uuid');

const habitSchema = new schema({
    habit_id: {
        type: String,
        default: uuidv4(),
    },
    habit_title: {
        type: String,
        required: true
    },
    habit_description: {
        type: String,
    }
    
},{ timestamps: true })

// End of the modal

module.exports = mongoose.model("habit", habitSchema);