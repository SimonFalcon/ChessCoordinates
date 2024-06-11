const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config()
const User = require('./models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asfasffndyjtukilvbncvhdghfhht'
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors({ origin: 'http://localhost:5173', methods: ["GET", "POST"], credentials: true }));


mongoose.connect(process.env.MONGO_URL);
 
app.use(express.json())

app.use(cookieParser());

app.get('/test', (req,res) =>{
    res.json('test ok');
});


app.post('/register', async (req,res)=> {
    const {name, email, password} = req.body;

    try {
    const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
} catch (e) {
    res.status(422).json(e)
}
});

app.post('/login', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  });

app.post('/logout', (req,res) => {
  res.cookie('token', '').json(true);
});


app.get('/profile', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id, correctAnswers, incorrectAnswers, performance} = await User.findById(userData.id);
        res.json({name,email,_id, correctAnswers, incorrectAnswers, performance});
      });
    } else {
      res.json(null);
    }
  });

  app.post('/record-correct-answer', (req, res) => {
    const { token } = req.cookies;
    const { coordinate } = req.body;

    if (!token) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        try {
            const user = await User.findById(userData.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            user.correctAnswers += 1;
            user.performance.set(coordinate, (user.performance.get(coordinate) || 0) + 1);
            await user.save();

            res.json({ message: "Correct answer recorded" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
});

app.post('/record-incorrect-answer', (req, res) => {
    const { token } = req.cookies;
    const { coordinate } = req.body;

    if (!token) {
        return res.status(401).json({ error: "User not authenticated" });
    }

    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) {
            return res.status(401).json({ error: "Invalid token" });
        }

        try {
            const user = await User.findById(userData.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            user.incorrectAnswers += 1;
            user.performance.set(coordinate, (user.performance.get(coordinate) || 0) - 1);
            await user.save();

            res.json({ message: "Incorrect answer recorded" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
});
app.listen(4000);