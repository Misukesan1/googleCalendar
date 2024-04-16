const userModel = require('../models/user.model'); 

module.exports.createNewUser = (req,res,) => {
    const params = req.body;
    console.log(req.headers);
    res.status(200).json(params);
}