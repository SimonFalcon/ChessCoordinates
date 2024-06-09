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

app.listen(4000);