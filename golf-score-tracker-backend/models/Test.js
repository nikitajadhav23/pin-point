const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    player: { type: String, required: true },
    name: { type: String, required: true },
    score: { type: String, default: "" },
    completed: { type: Boolean, default: false },
    dueDate: {type:Date},
    quantity: {type: Number, default: 1}
});

module.exports = mongoose.model('Test', testSchema);
