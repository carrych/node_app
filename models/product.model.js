var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    _id: mongoose.Schema.ObjectId,
    name: String,
    price: Number,
    color: {
        type: String,
        enum: ['White', 'Black', 'Red']
    },
    last_updated: Date
}, {
    collection: 'products1'
});

productSchema.pre('save', {query: true}, function (next) {
    this._id = mongoose.mongo.ObjectId();
    this.last_updated = new Date();
    next();
});

productSchema.post('save', function (err, doc, next) {
    if (err.name !== 'MongoError' || err.code != 11000) {
        return next(err);
    }

    var path = 'duplicate key';

    var validationError = new mongoose.Error.ValidationError();
    validationError.errors[path] = validationError.errors[path] || {};
    validationError.errors[path] = '{0} is expected to be unique.'.replace('{0}', path);
    validationError.errors[path].reason = err.message;
    validationError.errors[path].name = err.name;

    next(validationError);
});

module.exports = mongoose.model('Product', productSchema);