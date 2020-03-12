const express = require("express");
const storage = require("node-persist");
const bodyParser = require("body-parser");
const bearerToken = require("express-bearer-token");
const cors = require("cors");

const port = 8000;
const TOKEN = "access_token";

const app = express();
storage.init();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(
  bearerToken({
    bodyKey: TOKEN,
    queryKey: TOKEN,
    headerKey: "Bearer",
    reqKey: "token",
    cookie: false
  })
);
//check if correct token is provided
app.use((req, res, next) => {
  console.log("token: ", req.token);
  if (req.token != TOKEN) {
    res.status(403).json({ err: "Missing or incorrect access token" });
    console.log("missing token");
    return;
  }
  next();
});

//get all todos
app.get("/", async (req, res) => {
  console.log("GET all todos..");
  const messages = await storage.values();
  res.send(messages);
});

//save one todo - make sure id is supplied
app.post("/", async (req, res) => {
  console.log(`Create todo id ${req.body.id}`);
  console.log(req.body);
  if (!req.body.id) res.status(400).json({ message: "Missing id" });
  else {
    const { id } = req.body;
    console.log("Storing todo id: ", id);
    await storage.setItem(id.toString(), req.body);
    res.status(200).json({ message: "todo saved" });
  }
});

//delete todo - make sure id is supplied
app.delete("/", async (req, res) => {
  console.log(`Delete todo: `, req.body);
  if (!req.body.id) res.status(400).json({ message: "Missing id" });
  else {
    const { id } = req.body;
    await storage.removeItem(id.toString());
    res.status(200).json({ message: "todo deleted" });
  }
});

//update todo - make sure id is supplied
app.patch("/", async (req, res) => {
  console.log(`Update todo id ${req.body.id}`);
  if (!req.body.id) res.status(400).json({ message: "Missing id" });
  else {
    const { id } = req.body;
    await storage.updateItem(id.toString(), req.body);
    res.status(200).json({ message: "todo updated" });
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
