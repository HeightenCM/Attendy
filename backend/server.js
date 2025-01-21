const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("../backend/database");
const Event = require("./models/Event");
const User = require("./models/User");
const EventParticipant = require("./models/EventParticipant");
const userController = require("./controllers/userController");
const eventController = require("./controllers/eventController");
const participationController = require("./controllers/participationController");

const app = express();
app.use(bodyParser.json());
app.use(cors());

Event.belongsTo(User, { as: "organizedBy", foreignKey: "organizer" });

Event.belongsToMany(User, {
  through: EventParticipant,
  as: "participants",
  foreignKey: "eventId",
});

User.belongsToMany(Event, {
  through: EventParticipant,
  as: "eventsAttended",
  foreignKey: "userId",
});

//Sync db
sequelize.sync({ force: true }).then(() => {
  console.log("Db synced");
});

//APIs
//app.get('/api/user/test',userController.test)
app.post("/api/user/signup", userController.signup);
app.post("/api/user/login", userController.login);
app.get("/api/user/name", userController.getName);

app.post("/api/event/create", eventController.postEvent);
app.put("/api/event/update", eventController.updateEvent);
app.get("/api/event/getEvents", eventController.getEvents);
app.delete("/api/event/delete", eventController.deleteEvent);

app.post("/api/participation/sendCode", participationController.sendCode);
app.get(
  "/api/participation/attendanceList",
  participationController.getAttendanceList
);
app.patch(
  "/api/participation/generateCode",
  participationController.generateRandomCode
);

//Server start
app.listen(3000, () => console.log("Server running on port 3000"));
