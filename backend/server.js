const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const cookieParser = require('cookie-parser');

const loginroute = require("./api/Routes/users.js");
const authroute = require("./api/Routes/auth.js");
const autisamroute = require("./api/Routes/autisam.js");
const dislexiaroute = require("./api/Routes/dislexia.js")
const activityroute = require("./api/Routes/activity.js")
const chatRoute = require("./api/Routes/chat.js");
const { loginUser } = require("./api/models/loginuser.js");
const { Activity } = require("./api/models/activity.js");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors({
  origin: ['https://cognitive-omega.vercel.app',"http://localhost:3000","https://brainwaveprod.vercel.app"],
  credentials: true
}));

app.use(cookieParser());
const PORT = 5000;
app.use(bodyParser.json());
app.use(express.json())
const User = require("./api/models/user.js");

const authenticateRequest = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token || !process.env.JWT_PRIVATE_KEY) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const user = await loginUser.findById(decoded._id).select('_id email');
    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    req.auth = { ...decoded, email: user.email };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/loginusers", loginroute)
app.use("/api/auth", authroute)
app.use("/api/autisam", autisamroute)
app.use("/api/dislexia", dislexiaroute)
app.use("/api/activity", activityroute)
app.use("/api/chat", chatRoute);

app.post('/api/users', authenticateRequest, async (req, res) => {
  try {
    if (req.body.email.toLowerCase() !== req.auth.email?.toLowerCase()) {
      return res.status(403).json({ message: 'You can only create your own profile' });
    }
    const newUser = new User({ ...req.body, email: req.auth.email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/updateUser', authenticateRequest, async(req, res) => {
  const {id, fname, lname, email, dob, age, gender, adress, contact, education, city, state, pincode} = req.body
  try{
    const result = await User.updateOne({_id: id, email: req.auth.email},{
      $set: {
        fname: fname,
        lname: lname,
        email: email,
        dob: dob,
        age: age,
        gender: gender,
        adress: adress,
        contact: contact,
        education: education,
        city: city,
        state: state,
        pincode: pincode
      }
    })
    if (result.matchedCount === 0) {
      return res.status(404).json({status: "error", data: "Profile not found"});
    }
    return res.json({status: "ok", data: "Updated"})
  }
  catch(error) {
    return res.json({status: "error", data: error})
  }
})

// app.get("/getusers", async (req, res) => {
//   try {
//     const allUser = await User.find({})
//     res.send({allUser})
//   } catch (error) {
//     console.log(error)
//   }
// })
app.get("/user-details/:email", authenticateRequest, async (req, res) => {
  const email = req.params.email.toLowerCase();
  if (email !== req.auth.email?.toLowerCase()) {
    return res.status(403).json({ message: 'You can only view your own profile' });
  }
  try {
    const userDetails = await User.findOne({ email }).select('-__v');
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// app.get("/getemail", async (req, res) => {
// 	try {
// 	  const allEmail = await loginUser.find({})
// 	  res.send({allEmail})
// 	} catch (error) {
// 	  console.log(error)
// 	}
// })



app.get("/activityset/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const userDetails = await Activity.findOne({ email: email });
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
