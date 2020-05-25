const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validation');


router.post('/register', async (req,res) => {

    //validate
    // const {error} = Joi.validate(req.body, schema);
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send((error.details[0].message));

    //checking duplidate email
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('email already exist');

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //new user
        let user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        contact: req.body.contact,  
        password: hashPassword
    });
    try{
         const savedUser = await user.save();
         res.send({user: user._id, name: user.name});
    }catch(err){
         res.status(400).send(err);
    }
    
});

//login
router.post('/login', async (req,res) => {
    //validate
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send((error.details[0].message));

    //check email
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(401).send({error:'email/password is wrong'});

    //check password
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(401).send({error:'email/password is wrong'});

    //create and assign token
    const token = jwt.sign({_id : user._id, email : user.email, username: user.username}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({token:token, username:user.username,name:user.name});
}); 

module.exports = router;