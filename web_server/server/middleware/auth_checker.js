const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const config = require('../config/config.json');

module.exports = (req, res, next) => {
    console.log('[%] Auth_checker- Request: ');
    console.log(req.headers);

    if (!req.headers.authorization) {
        console.log('[!] ERROR: Authorization - Failed ');
        return res.status(401).end();
    }

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization.split(' ')[1];

    console.log('[%] Authchecker- Token: ' + token);

     // decode the token using a secret key-phrase
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) {
            console.log('[!] ERROR: Authorization - Failed ');
            return res.status(401).end();
        }

        const id = decoded.sub;

        // check if a user exists
        User.findById(id, (userErr, user) => {
            if ( userErr || !user) {
                console.log('[!] ERROR: Authorization - Failed ');
                return res.status(401).end();
            }

            return next();
        });
    });
};
