const { MongoClient, ObjectID } = require('mongodb');
const dbConfig = require('../configs/db.config');

async function get() {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const items = db.collection('users').find({ "role": "user" });

      resolve(await items.toArray());
      client.close();
    } catch (error) {
      reject(error)
    }

  });
}

async function getUserDetails(email) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const items = db.collection('users').find({ email });

      resolve(await items.toArray());
      client.close();
    } catch (error) {
      reject(error)
    }

  });
}
async function updateStatus(data) {

  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const filter = { 'email': data.email, 'claimsDetails.ClaimNum': data.claimId };

      const updatedItem = await db.collection('users').findOneAndUpdate(filter, { $set: { 'claimsDetails.$.claimStatus': data.claimStatus } });

      resolve(updatedItem.value);

      client.close();
    } catch (error) {
      reject(error)
    }
  });
}

module.exports = {
  get,
  getUserDetails,
  updateStatus
}
