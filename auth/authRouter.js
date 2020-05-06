const bcrypt = require ("bcryptjs")

const router = require("express").Router();

const Users = require("../users/users-model");

router.post("/register", (req, res) => {
    const userInfo = req.body

    // the password will be hashed and rehashed 2^8 times.
    const ROUNDS = process.env.HASHING_ROUNDS  || 8
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS)

    userInfo.password = hash

    Users.add(userInfo)
        .then(user => {
            res.json(user);
        })
        .catch(err => res.send(err));
});

router.post("/login", (req, res) => {
    const {username, password} = req.body


    Users.findBy({ username })
        .then(([user]) => {
            console.log("User", user)
            if (user && bcrypt.compareSync(password, user.password)) {
                //remember this client

                
                res.status(200).json({hello: user.username})
            } else {
                res.status(401).json({
                    message: "Invalid Credentials"
                })
            }
        })
        .catch(error => {
            res.status(500).json({ errorMessge: "Error finding the user."})
    })
});

module.exports = router;
