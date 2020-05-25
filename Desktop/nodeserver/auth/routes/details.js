const router = require('express').Router();
const Detail = require('../models/Details');
const verify = require('./verifyToken');

router.get('/details',verify, async (req,res) => {  

    //verifying with matching email
    if(req.user.email != req.header('email')) return res.status(401).send('Access Denied');
    
    //searching entry with email
    const entry = await Detail.findOne({email: req.header('email')});
    if(!entry) return res.status(400).send('Details not exist');
    res.send(entry);
    // res.json({
    //     posts:{post: "this is my first post",
    //           description:"hello"}
    // });

});

router.post('/details',verify, async (req,res) => {
    let detail = new Detail({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        contact: req.body.contact,  
        hobby:req.body.hobby,
        sports: req.body.sports,
    });
    try{
        console.log(detail)
        const savedDetail = await detail.save();
        res.send("Details added");
   }catch(err){
        res.status(400).send(err);
   }
    // res.send(req.user);
    // res.json({
    //     posts:{post: "this is my first post",
    //           description:"hello"}
    // });

});

module.exports = router;