const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const { schema } = require("./validation");
const { MongoClient } = require("mongodb");
const app = express();
// const data = require("./database.js");
const authentication =("./auth.js")

app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 5000;
dotenv.config({ path: "./config.env" });
MongoClient.connect("mongodb://127.0.0.1:27017/now", {
  useNewUrlParser: true,

});
// const productSchema = new mongoose.Schema({
//   productGeneralList: String,
//   productSingleList: String,
//   retrive: String,
// });

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String
})

const users = mongoose.model("users", userSchema)

app.post('/signup', async (req, res) => {
  // Validate the request body
  // const { error, value} = (req.body);
  const mentor = req.body;
  console.log(mentor)
  // if (error) {
  //   return res.status(400).send(error.details[0].message);
  // } else {

   const user = new users({
        username: mentor.username,
        email: mentor.email,
        password: mentor.password,
      });

  // Save the user to the database
    user.save();
    res.status(201).send(user);


  // Check if the user already exists
  // let user = await User.findOne({ email: req.body.email });
  // if (user) {
  //   return res.status(400).send('User already registered.');
  // }

  // Create a new user

  
});



// Parse JSON in the request body


// Login route
app.post('/login', async (req, res) => {
  // Validate the request body
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user exists
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Invalid email or password.');
  }

  // Validate the password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Invalid email or password.');
  }

  // Generate a JSON Web Token (JWT)
  const token = jwt.sign({ _id: user._id }, 'your-secret-key');
  res.send(token);
});

// const port = 3000; // Specify the port number you want to use

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
