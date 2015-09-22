var mongoose = require('mongoose');

var bpModelSchema = new mongoose.Schema({
    name: {type: String, required: true}
});