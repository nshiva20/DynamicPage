const {MongoClient, ObjectID} = require('mongodb');
const dbConfig = require('../configs/db.config');

async function add(item) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(dbConfig.url);
      try {
        await client.connect();
        const db = client.db(dbConfig.dbName);
  
        const addedItem = await db.collection('claims').insertOne(item);
  
        resolve(addedItem.ops[0]);
        client.close();
      } catch (error) {
        reject(error)
      }
    });
  
  }

  async function get(query, limit) {
    return new Promise(async (resolve, reject) => {
      const client = new MongoClient(dbConfig.url);
      try {
        await client.connect();
        const db = client.db(dbConfig.dbName);
  
        const items = db.collection('claims').find(query);
  
        if (limit > 0) {
          items = items.limit(limit);
        }
        resolve(await items.toArray());
        client.close();
      } catch (error) {
        reject(error)
      }
  
    });}

    async function update(email, claimsDetails) {
      return new Promise(async (resolve, reject) => {
        const client = new MongoClient(dbConfig.url);
        try {
    
          await client.connect();
          const db = client.db(dbConfig.dbName);      
         
          const filter = {'email':email};
          const options = { returnDocument:'after',upsert:true};
          const updatedItem = await db.collection('users').findOneAndUpdate(filter,{$push:{'claimsDetails':claimsDetails}},options);
          
          resolve(updatedItem.value);
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

  module.exports = {
    get,
    getById,
    add,
    update
  }
