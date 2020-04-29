let async = require('async'),
parseString = require('xml2js').parseString;

let util = require('../Utilities/util'),
documentDAO = require('../DAO/documentDAO');


/**API to create the document */
let createDocument = (data, callback) => {
async.auto({
document: (cb) => {
var dataToSet = {
"document_title":data.document_title?data.document_title:'',
"desc":data.desc,
"publisher":data.publisher
}
documentDAO.createDocument(dataToSet, (err, dbData) => {
console.log(err,'error',dbData);
if (err) {
cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
return;
}

cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED });
return;
});
}
//]
}, (err, response) => {
callback(response.document);
});
}

/**API to update the document */
let updateDocument = (data,callback) => {
async.auto({
documentUpdate :(cb) =>{
if (!data.id) {
cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
return;
}

var criteria = {
_id : data.id
}
var dataToSet={
"document_title": data.document_title?data.document_title:"",
"desc":data.desc?data.desc:"",
"publisher":data.publisher?data.publisher:""
}
console.log(criteria,'test',dataToSet);
                    documentDAO.updateDocument(criteria, dataToSet, (err, dbData)=>{
                        if(err){
cb(null,{"statusCode":util.statusCode.FOUR_ZERO_ONE,"statusMessage":util.statusMessage.SERVER_BUSY});
                        return;
                        }
                        else{
cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED,"result":dbData });
                        }
                    });
}
}, (err,response) => {
callback(response.documentUpdate);
});
}

// /**API to delete the subject */
let deleteDocument = (data,callback) => {
async.auto({
removeDocument :(cb) =>{
if (!data.id) {
cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
return;
}
var criteria = {
_id : data.id,
}
documentDAO.deleteDocument(criteria,(err,dbData) => {
if (err) {
console.log(err);
cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
return;
}
cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DELETE_DATA });
});
}
}, (err,response) => {
callback(response.removeDocument);
});
}

// /***API to get the document list */
let getDocument = (data, callback) => {
async.auto({
document: (cb) => {
documentDAO.getDocument({},{},{},(err, data) => {
if (err) {
cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
return;
}
cb(null, data);
return;
});
}
}, (err, response) => {
callback(response.document);
})
}

// /***API to get the document detail by id */
let getDocumentById = (data, callback) => {
async.auto({
document: (cb) => {
let criteria = {
"_id":data.id
}
documentDAO.getDocument(criteria,{},{},(err, data) => {
if (err) {
cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
return;
}
cb(null, data[0]);
return;
});
}
}, (err, response) => {
callback(response.document);
})
}

module.exports = {
createDocument : createDocument,
updateDocument : updateDocument,
deleteDocument : deleteDocument,
getDocument : getDocument,
getDocumentById : getDocumentById
};
