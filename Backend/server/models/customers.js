const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

let Schema = mongoose.Schema;
let CustomerSchema = new Schema({
    _id: {
        type: Number,
    },
    Address: {
        type: String
    },
    City: {
        type: String
    },
    Country: {
        type: String
    },
    District: {
        type: String
    },
    First_Name: {
        type: String
    },
    Last_Name: {
        type: String
    },
    Status: {
        type: Boolean,
        default: true
    }
}, { collection: 'customers' });
CustomerSchema.plugin(uniquevalidator, {});
({ collection: "customers" });
CustomerSchema.plugin(AutoIncrement, { _id: '_id' }, {});


module.exports = mongoose.model('customers', CustomerSchema);