'use strict';

var Models = require('../Models/Document');

var updateDocument = function(criteria, dataToSet, options, callback) {
options.lean = true;
options.new = true;
Models.findOneAndUpdate(criteria, dataToSet, options, callback);
};

//Insert Student in DB
var createDocument = function(objToSave, callback) {
new Models(objToSave).save(callback)
};

//Delete Student in DB
var deleteDocument = function(criteria, callback) {
Models.findOneAndRemove(criteria, callback);
};

//Get Students from DB
var getDocument = function(criteria, projection, options, callback) {
options.lean = true;
Models.find(criteria, projection, options, callback);
};

module.exports = {
updateDocument: updateDocument,
createDocument: createDocument,
deleteDocument: deleteDocument,
getDocument: getDocument
}
