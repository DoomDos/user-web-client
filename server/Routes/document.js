let express = require('express'),
router = express.Router(),
util = require('../Utilities/util'),
documentService = require('../Services/document');

/**Api to create document */
router.post('/create-document', (req, res) => {
documentService.createDocument(req.body, (data) => {
res.send(data);
});
});

// /**Api to update document */
router.put('/update-document', (req, res) => {
documentService.updateDocument(req.body, (data) => {
res.send(data);
});
});

// /**Api to delete the document */
router.delete('/delete-document', (req, res) => {
documentService.deleteDocument(req.query, (data) => {
res.send(data);
});
});

/**Api to get the list of document */
router.get('/get-document', (req, res) => {
documentService.getDocument(req.query, (data) => {
res.send(data);
});
});

// /**API to get the document by id... */
router.get('/get-document-by-id', (req, res) => {
documentService.getDocumentById(req.query, (data) => {
res.send(data);
});
});

module.exports = router;
