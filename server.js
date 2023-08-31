require("dotenv").config();
const path = require("path");
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

const hbs = require("hbs");

//template engine

app.set("view engine", "hbs");
app.set("views", "./template_engine_hbs/views/");
hbs.registerPartials("./template_engine_hbs/templates/");

//middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Welcome Travelers",
  });
});

app.get("/about", (req, res) => {
  res.status(200).render("about", {
    title: "About me",
  });
});

const customers = [
  { id: 1, name: "John", title: "Admin" },
  { id: 2, name: "Rachael", title: "Junior" },
  { id: 3, name: "James", title: "Mechanic" },
  { id: 4, name: "Samual", title: "Scientist" },
  { id: 5, name: "Sarah", title: "Scientist" },
];
// app.get("/customers", (req, res) => {
//   res.status(200).json(customers);
//   console.log(req.query.id);
// });

app.get("/customers", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.query.id));
  const customerName = customers.find((c) => c.name === req.query.name);
  res.status(200).json(customerName);
});

app.get("*", (req, res) => {
  res.status(404).send(`<h1>Page not found. <a href='/'>Home</a></h1>`);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
