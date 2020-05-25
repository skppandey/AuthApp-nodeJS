const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/',verify, (req,res) => {
    res.send(req.user);
    // res.json({
    //     posts:{post: "this is my first post",
    //           description:"hello"}
    // });

})

module.exports = router;