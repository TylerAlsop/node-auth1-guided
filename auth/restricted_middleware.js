const bcrypt = require("bcryptjs")

module.exports = (req, res, next) => {
    //Check that we remember the client logged in already
    console.log("Session", req.session)
    
    next()
}
