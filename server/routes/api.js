const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const mongoose = require('mongoose');
const db = "mongodb+srv://bouhsen-rafiq:bouhsen@cluster0-daqrv.mongodb.net/userdata?retryWrites=true&w=majority";
const User = require('../models/user');
const Contact = require('../models/contact');
mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}, err => {
  if (err) {
    console.log('Error' + err)
  } else {
    console.log('Connected to mongodb database')
  }
});

/*function verifyToken(req, res, next){
  if (!req.headers.authorization){return res.status(401).send('Unauthorized request');}
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null'){return res.status(401).send('Unauthorized request');}
  let payload = jwt.verify(token, 'secretKey')
  if (!payload){return res.status(401).send('Unauthorized request');}
  req.userId = payload.subject;
  next();
}*/

router.get('/', (req, res) => {
  res.send('hi there');
})

/**
 *@description register a new user
 */
router.post('/register', (req, res) => {
  let userData = req.body;
  let user = new User(userData);
  user.save((error, registeredUser) => {
      if (error) {
        console.log(error);
      } else {
        let payload = {subject: registeredUser._id};
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({token});    // to receive a token, try res.status(200).send({userData})
      }
    }
  )
})
/**
 * @description method to make sure that the user exit, then proceed to login
 * @function log in
 */
router.post('/login', (req, res) => {
  let userData = req.body;
  User.findOne({email: userData.email}, (error, user) => { // findOne based on email adress
    if (error) {  // test if this mail exist
      console.log('Error' + error)
    } else {
      if (!user) { // if no user exist with this email adress
        res.status(401).send('Invalid email');
      } else if (user.password !== userData.password) { // if the mail matches proceed and compare password
        res.status(401).send('Invalid password'); // if the password doesn't matches show Invalid password
      } else {
        let payload = {subject: user._id};
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({token}); // if the email and the passwords matches sends a token, or try res.status(200).send({user})
      }
    }
  });
})

/**
 * @description method to post the contact form
 */

router.post('/contact', (req, res) => {
  let contactData = req.body;
  let contact = new Contact(contactData);
  contact.save((error) => {
      if (error) {
        console.log(error);
      } else {
        res.status(200).send({contactData});
      }
    }
  )
})

module.exports = router;
