var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let Document = new Schema({
document_title: {
type: String,
trim: true,
default: ""
},
desc: {
type: String,
trim: true,
default: ""
},
publisher: {
type: String,
trim: true,
default: ""
},
created_on:{
type : Date,
default: Date.now
}
});

module.exports = mongoose.model('Document', Document);
