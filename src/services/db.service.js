const { MongoClient, ObjectID } = require('mongodb');
const dbConfig = require('../configs/db.config');

async function get(query, limit) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const items = db.collection('users').find(query);

      if (limit > 0) {
        items = items.limit(limit);
      }
      resolve(await items.toArray());
      client.close();
    } catch (error) {
      reject(error)
    }

  });
}

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

async function remove(id) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const removed = await db.collection('users').deleteOne({ _id: ObjectID(id) });
      resolve(removed.deletedCount === 1);

      client.close();
    } catch (error) {
      reject(error)
    }
  });

}

async function loadData(data) {
  return new Promise(async (resolve, reject) => {
    const client = new MongoClient(dbConfig.url);
    try {
      await client.connect();
      const db = client.db(dbConfig.dbName);

      const results = await db.collection('users').insertMany(data);
      resolve(results);
      client.close();
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  loadData,
  get,
  getById,
  add,
  update,
  remove
}
