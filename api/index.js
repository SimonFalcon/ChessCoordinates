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
    const {email,password} = req.body;
    const UserDoc = await User.findOne({email});
    if (UserDoc) {
        const passOk = bcrypt.compareSync(password, UserDoc.password)
        if (passOk){
            jwt.sign({email:UserDoc.email, id:UserDoc._id}, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'none' }).json (UserDoc);
            });
            
        } else {
            res.status(422).json ('pass not ok')
        }
    } else {
        res.json('not found');
    }
});

app.get('/profile', (req,res) =>{
    const {token} = req.cookies;
    if (token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id);

            res.json({name,email,_id});
        });
    }else{
    res.json(null);
    }
})

app.post('/correct-answer', async (req, res) => {
    try {
        const userId = req.body.userId; // Corrected from req.body._Id
        // Find the user by ID
        const user = await User.findById(userId); // Corrected from _id
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.correctAnswers++;
        await user.save();
        res.json(user); // Return updated user data if needed
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/incorrect-answer', async (req, res) => {
    try {
        const userId = req.body.userId; // Corrected from req.body._Id
        const user = await User.findById(userId); // Corrected from _id
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.incorrectAnswers++;
        await user.save();
        res.json(user); // Return updated user data if needed
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
app.listen(4000);