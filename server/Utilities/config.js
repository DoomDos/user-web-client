let environment = "dev";

let serverURLs = {
"dev": {
"NODE_SERVER": "http://localhost",
"NODE_SERVER_PORT": "3000",
"MONGO_DB": 'mongodb://localhost:27017/angular6-crud'
}
}

let config = {
"NODE_SERVER_PORT": {
"port": `${serverURLs[environment].NODE_SERVER_PORT}`
},
"NODE_SERVER_URL": {
"url": `${serverURLs[environment].NODE_SERVER}`
},
"DB_URL": {
"url": `${serverURLs[environment].MONGO_DB}`
},
};

module.exports = {
config: config
};
