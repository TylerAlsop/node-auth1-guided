const bcrypt = require("bcryptjs")

module.exports = (req, res, next) => {
    //Check that we remember the client logged in already
    if (req.session && req.session.user) {
        next()
    } else {
        res.status(401).json({
            you: "shall not pass!"
        })
    } 
}
