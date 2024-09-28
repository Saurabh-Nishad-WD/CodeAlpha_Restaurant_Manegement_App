const express = require('express')
const app = express()
const dotenv = require('dotenv');
const auth = require('./routes/authRoute')
const user = require('./routes/userRoute')
const restaurant = require("./routes/restaurantRoute");
const category = require("./routes/categoryRoute");
const food = require("./routes/foodRoute");
const order = require('./routes/orderRoute')
const connectDB = require('./config/connectDB');


dotenv.config();
app.use(express.json());


const PORT = process.env.PORT || 3000
connectDB();

app.use('/',auth);
app.use('/user',user);
app.use('/restaurant',restaurant);
app.use('/category',category);
app.use('/food',food);
app.use('/order',order);




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})