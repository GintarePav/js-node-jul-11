const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const repairmanRoutes = require("./routes/repairmanRoutes");
const likesRoutes = require("./routes/likesRoutes");

app.use(express.json());
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/repairmen", repairmanRoutes);
app.use("/api/v1/likes", likesRoutes);

module.exports = app;
