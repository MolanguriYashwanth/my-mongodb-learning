
import jwt from "jsonwebtoken";
import config from "./config";
const loginMiddleWare = {};
loginMiddleWare.checkTokenForAuthentication = (token) => {
    var response ="hi";
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, config.serverConfig().secret, (err, decoded) => {
            if (err) {
                console.log('error',err);
                response = 'Token is not valid'
            } else {
                console.log("decoded message",decoded);
                response = decoded;
            }
        });
    } else {
        response = 'Auth token is not supplied'
    }
    return response;
}
module.exports = loginMiddleWare