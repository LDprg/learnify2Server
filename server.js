const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./config/db.config");
const authConfig = require("./config/auth.config");

const app = express();

var corsOptions = {
	origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
	cookieSession({
		name: "learnify-session",
		secret: authConfig.cookieSecret, // should use as secret environment variable
		httpOnly: true
	})
);

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to the LearnifyServer api application." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/set.routes")(app);
require("./routes/user.routes")(app);

const start = async () => {
	try {
		console.log("Connecting to database...");
		const db = require("./models");
		await db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, { useNewUrlParser: true, useUnifiedTopology: true });
		app.listen(8080, () => console.log(`App started on 8080!`));
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};
start();