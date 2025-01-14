const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./database");
const User = require("./entity_models/User");
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Sync db
// sequelize.sync({force:true}).then(()=>{
//     console.log('Db synced')
// });

//APIs

//GET
app.get("/api/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching the users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST
app.post("/api/users", async (req, res, next) => {
  try {
    const { name, email, birthday } = req.body;
    if (!name || !email || !birthday) {
      return res
        .status(400)
        .json({ error: "All the attributes are required!" });
    }
    const newUser = await User.create({ name, email, birthday });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error while trying to create an user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Server start
app.listen(3000, () => console.log("Server running on port 3000"));
