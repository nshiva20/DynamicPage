const { MongoClient } = require('mongodb');
const dbConfig = require('../configs/db.config');

async function getById(email) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const item = await db.collection('users').findOne({ email });
      resolve(item);
      client.close();
    } catch (error) {
      reject(error)
    }
  });

}

async function add(item) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const addedItem = await db.collection('users').insertOne(item);

      resolve(addedItem);
      client.close();
    } catch (error) {
      reject(error)
    }
  });

}

async function updatePassword(email, newValue) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const filter = { 'email': email };
      const options = { returnDocument: 'after', upsert: true, multi: false };
      const updatedItem = await db.collection('users').findOneAndUpdate(filter, { $set: { 'password': newValue } }, options);

      resolve(updatedItem.value);

      client.close();
    } catch (error) {
      reject(error)
    }
  });
}

module.exports = {
  getById,
  add,
  updatePassword
}
