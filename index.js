const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes.js")
require('dotenv').config();

mongoose
	.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
	.then(() => {
		const app = express()
		app.use(express.json())
		app.use("/api", routes)

		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})