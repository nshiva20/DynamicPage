const { MongoClient, ObjectID } = require('mongodb');
const dbConfig = require('../configs/db.config');
const helper = require('../utils/helper.util');

async function get() {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const items = db.collection('users').find({ "role": "user" });
      console.log(JSON.stringify(items))
      resolve(await items.toArray());
      client.close();
    } catch (error) {
      reject(error)
    }

  });
}
async function getUser() {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const items = db.collection('users').find({});
      console.log(JSON.stringify(items))
      resolve(await items.toArray());
      client.close();
    } catch (error) {
      reject(error)
    }

  });
}
async function update(id, newItem) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const updatedItem = await db.collection('users').findOneAndReplace({ _id: ObjectID(id) }, newItem, { returnOriginal: false });
      resolve(updatedItem.value);

      client.close();
    } catch (error) {
      reject(error)
    }
  });
}

async function getUserDetails(email) {
  console.log(JSON.stringify(email) + " ****")
  
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);
      const items = db.collection('users').find({ email });
      console.log(JSON.stringify(items.toArray()))
      resolve(await items.toArray());
      client.close();
    } catch (error) {
      reject(error)
    }

  });
}

module.exports = {
  get,
  update,
  getUserDetails,
  getUser
}
