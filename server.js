const express = require('express');
const { open } = require('sqlite');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3');


app.use(express.json());

const dbPath = path.join(__dirname, "random.db");
let db = null;

const initializeDBAndStartServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndStartServer();

app.get('/USER/', async (request, response) => {
  const getUserQuery = `SELECT * FROM USER;`;
  const userArray = await db.all(getUserQuery);
  console.log(userArray); // Log data to confirm it's fetched
  response.send(userArray);
});

app.post('/USER/', async (request, response) => {
  const userDetails = request.body;
  const { name, age } = userDetails;
  const addUserQuery = `
    INSERT INTO USER (name, age) 
    VALUES ('${name}', ${age});
  `;
  await db.run(addUserQuery);
  response.send("Added successfully");
});

app.get ('/api/services/',async(req,res)=>{
  const getServicesQuery=`
   SELECT 
   *
   FROM 
   services;
  `;
  const servicesList=await db.all(getServicesQuery)
  res.send(servicesList)
})