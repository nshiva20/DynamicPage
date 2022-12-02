const { MongoClient } = require('mongodb');
const dbConfig = require('../configs/db.config');

async function update(email, claimsDetails) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {

      await client.connect();
      const db = client.db(dbConfig.dbName);

      const filter = { 'email': email };
      const options = { returnDocument: 'after', upsert: true };
      const updatedItem = await db.collection('users').findOneAndUpdate(filter, { $push: { 'claimsDetails': claimsDetails } }, options);

      resolve(updatedItem.value);
      client.close();
    } catch (error) {
      reject(error)
    }
  });

}

module.exports = {
  update
}
