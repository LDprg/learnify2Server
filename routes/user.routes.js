const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get("/api/user", [authJwt.verifyToken], controller.getuser);
    app.get("/api/user/set", [authJwt.verifyToken], controller.getuserset);
};
