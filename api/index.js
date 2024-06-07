const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config()
const User = require('./models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'asfasffndyjtukilvbncvhdghfhht'

var cors = require('cors')

app.use(express.json());


app.use(cors({
    credeintials: true,
    origin: 'http://localhost:5173',
}));


mongoose.connect(process.env.MONGO_URL);
 


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
                res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'Lax' }).json ('pass ok')
            });
            
        } else {
            res.status(422).json ('pass not ok')
        }
    } else {
        res.json('not found');
    }
});

app.listen(4000);