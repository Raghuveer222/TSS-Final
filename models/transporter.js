const mongoose = require('mongoose');

const transporterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

module.exports = mongoose.models.Transporter || mongoose.model('Transporter', transporterSchema);
