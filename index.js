const express = require("express");
const path = require("path");
const port = 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("assets"));
app.use(express.urlencoded());

// app.use(function (req, res, next) {
// 	console.log("middleware 1 is called");
// 	req.myName = "Shivang";
// 	next();
// });

// app.use(function (req, res, next) {
// 	console.log("middleware 2 is called");
// 	console.log("M2", req.myName);
// 	next();
// });

var contactList = [
	{
		name: "Shivang",
		phone: "9316831540",
	},
	{
		name: "Jay",
		phone: "9925565112",
	},
];

app.get("/", function (req, res) {
	Contact.find({})
		.then((contacts) => {
			return res.render("home", {
				title: "My Contact List",
				contact_list: contacts,
			});
		})
		.catch((err) => {
			console.log("Error:", err);
			return;
		});
});

app.post("/create-contact", function (req, res) {
	// contactList.push(req.body);

	// return res.redirect("/");

	Contact.create({
		name: req.body.name,
		phone: req.body.phone,
	})
		.then((newContact) => {
			console.log(newContact);
			return res.redirect("/");
		})
		.catch((err) => {
			console.log("Error:", err);
		});
});

app.get("/delete-contact", function (req, res) {
	let id = req.query.id;
	Contact.findByIdAndDelete(id)
		.then(() => {
			return res.redirect("/");
		})
		.catch((err) => {
			console.log("Error:", err);
			return;
		});
});

app.listen(port, function (err) {
	if (err) {
		console.log("Error:", err);
		return;
	}
	console.log("Server is up and running on port:", port);
});
