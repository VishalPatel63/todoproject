const mongoose = require('mongoose');


require("dotenv").config();  // is statement se env enviroement ke inside define 
// kiya hoga vah sab process me load ho jayega 
const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() =>{console.log("DB connection is successfully");})
    .catch((error) => {
        console.log("recived error");
        console.log(error.message);
        // what this means ? 
        process.exit(1);
    })
} 
// process vale obejct me env ko feed krna hai to isake hme install karna padega
// install npm i dotenv

module.exports = dbConnect;