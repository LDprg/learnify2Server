const express = require('express');
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

const utils = require('./utils');

const { User } = require("./models/user.model");

const app = express();
app.use(express.json());
app.use(
	cookieSession({
	  name: "bezkoder-session",
	  secret: "kjsandjk", // should use as secret environment variable
	  httpOnly: true
	})
  );

app.get("/api/users", async (req, res) => {
	try {
		const allUsers = await User.find();
		return res.status(200).json(allUsers);
	} catch (error) {
		return res.status(500).json({ error: error });
	}
});

app.get('/api/users/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ error: error });
	}
});

app.post("/api/users", async (req, res) => {
	try {
		const newUser = new User({ ...req.body });
		const insertedUser = await newUser.save();
		return res.status(201).json(insertedUser);
	} catch (error) {
		return res.status(500).json({ error: error });
	}
});

app.put("/api/users/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await User.updateOne({ id }, req.body);
		const updatedUser = await User.findById(id);
		return res.status(200).json(updatedUser);
	} catch (error) {
		return res.status(500).json({ error: error });
	}
});

app.delete("/api/users/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const deletedUser = await User.findByIdAndDelete(id);
		return res.status(200).json(deletedUser);
	} catch (error) {
		return res.status(500).json({ error: error });
	}
});

const start = async () => {
	try {
		await mongoose.connect('mongodb://user:9TF5KKZSu9kDQbxj@localhost:27017/learnify', { useNewUrlParser: true, useUnifiedTopology: true });
		app.listen(8080, () => console.log(`App started on 8080!`));
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();