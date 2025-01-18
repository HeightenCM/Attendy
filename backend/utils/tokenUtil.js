const jwt = require("jsonwebtoken");

const SECRET_KEY = "placeholder" //we should put a key in the environment variables on our computers
                                    //a secret should not be added on github
exports.generateJWT = async (email,role) => {
    const payload = {
        email: email,
        role: role
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    return token
}

exports.authenticateToken = async (req) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return false;

    const userData = await new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) reject(err);
            resolve(decoded);
        });
    });

    return userData;
}