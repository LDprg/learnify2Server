const { authJwt } = require("../middlewares");
const controller = require("../controllers/set.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/set", [authJwt.verifyToken], controller.setcreate);
    app.get("/api/set/search/:text/:max", [authJwt.verifyToken], controller.setsearch);
    app.get("/api/set/:id/info", controller.setinfo);
    app.get("/api/set/:id", controller.setall);
    app.put("/api/set/:id", [authJwt.verifyToken], controller.setchange);
    app.delete("/api/set/:id", [authJwt.verifyToken], controller.setdelete);
};
