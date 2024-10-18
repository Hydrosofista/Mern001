const config = require('./config');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// patrz config js "db:"
const mongoUrl = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`
mongoose
  .connect(mongoUrl, {})
  .then(() => {
    console.log(`MongoDB is conected on mongodb://${config.db.host}:${config.db.port}/${config.db.name} `)
  })
  .catch((err) => {
    throw err;
  })

//
const app = express();
app.use(express.json());
app.use(cors());



// Routes
const eventsRoutes = require('./app/routes/EventsRoutes')();
app.use('/events', eventsRoutes);

// Liveserver
app.listen(config.app.port, () => {
  console.log(`Server is running on http://localhost:${config.app.port}`);
});