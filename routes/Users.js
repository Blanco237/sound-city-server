const express = require("express");
const router = express.Router();

const { Users } = require('../models');

router.post('/single', async (req, res) => {
    const { email } = req.body;
    const user = await Users.findOne({ where: { email }});
    if(user){
        res.json(user);
    }
    else {
        res.json({error: "No User Found"});
    }
})

router.post('/create', async (req, res) => {
    const { uid, email, displayName, photoURL } = req.body;
    const data = { uid, email, displayName, photoURL };
    try{
        await Users.create(data);
        res.json(data);
    }
    catch(e){
        res.status(400).json({error: e.message})
    }
})

module.exports = router;