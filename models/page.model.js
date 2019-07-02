var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
},{
        collection: 'pages'
    }
);

module.exports = mongoose.model('Page', pageSchema);