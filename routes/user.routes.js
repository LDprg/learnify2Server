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

    app.get("/api/user/stat/:id", [authJwt.verifyToken], controller.getuserstat);
    app.get("/api/user/stat/:id/short", [authJwt.verifyToken], controller.getuserstatshort);
    app.put("/api/user/stat/:id/:card", [authJwt.verifyToken], controller.setuserstatcard);
    app.put("/api/user/stat/:id/:card/stared", [authJwt.verifyToken], controller.setuserstatcardstared);
};
