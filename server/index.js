// const express  = require('express');
// const app = express();

// app.listen(3000,() =>{
//     console.log("App is running successfully at port number 3000");
// });

// //  npm i nodemon install kar lenge beacuse hame bar bar run nhi karna padega
// // nodemon se ek bar run kr denge usake bad koi change karenge to apane aap update hota rahega

//  npm run dev command for start

// _____________________________________________________________________________________



const express  = require('express');
const cors = require("cors");
const app = express();

// load config from env file
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true,
}));
require('dotenv').config();
const PORT = process.env.PORT || 3000;


// middleware to parse json request body
app.use(express.json());


// import route for Todo API

const todoRoutes = require("./routes/todos");

// mount the todo ASPI routes
app.use("/api/v1",todoRoutes);


// start server

app.listen(PORT,()=>{
    console.log(`Server started successfully st ${PORT}`);
})


// connection to the databse
const dbConnect = require("./config/database");
  dbConnect();

// default Route


app.get("/",(req,res)=>{
    res.send(`<h1>this is home page </h1>`);
})