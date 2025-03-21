const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    children: [{
        id: { type: String, required: true },
        name: { type: String, required: true },
        url: { type: String, required: true }
    }]
});

module.exports = mongoose.model('Document', documentSchema);