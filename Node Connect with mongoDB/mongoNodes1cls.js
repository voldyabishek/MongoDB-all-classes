const {MongoClient} = require("mongodb")

//MongoDB URL and Database

const url = "mongodb://localhost:27017";
const dbName ="abishekData";
const client =new MongoClient(url);

//connect to mongoDB
async function connectToMongo(){
    try{
        await client.connect();
        console.log("MongoDB connected");
    }
    catch(err){
        console.error("Error connecting to mongoDB:",err)
    }
}     

//insert a new user info the "users " collections

async function insertUser(name,email){
    const db =client.db(dbName);
    const collection =db.collection('users')
   
    const newUser ={name,email};
    try{
        const insertResult =await collection.insertOne(newUser);
        console.log("user inserted:",insertResult);
    }
    catch(err){
        console.error("error inserting user:",err);
    }
}

//get all users from the "users" coloections

async function getAllUsers(){
    const db = client.db(dbName);
    const collection =db.collection('users')
    try{
        const users =await collection.find().toArray();
        console.log("users:",users)
    }
    catch(err){
        console.error('error retriving users:',err)
    }
}

//main function that connects to mongoDB and calls insert and get functions
  async function main(){
    
    await connectToMongo();//connect mongodb

    await insertUser("bheem","bheem@gmail.com");//insert new user

    await getAllUsers();//retrive all users

    await client.close();//close the connection
  }
  main();//run the main functions

