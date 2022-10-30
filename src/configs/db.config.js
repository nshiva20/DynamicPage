const env = process.env;
const fs = require('fs');
const db = {
     url : 'mongodb://localhost:27017',
	 dbName : 'health_care'
};

module.exports = db;
