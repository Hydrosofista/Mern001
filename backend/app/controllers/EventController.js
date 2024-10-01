const EventModel = require('../models/EventModel');

module.exports = {
  index: async (req, res, next) => { 
    try {
      const events = await EventModel.find({}); 
      return res.status(200).json(events); 
    } catch (err) {
      return res.status(500).json({
        message: 'Error while retrieving events',
        error: err
      });
    }
  },

  create: async (req, res, next) => { 
    try {
      const event = new EventModel({
        name: req.body.name,
        event: req.body.event,
        city: req.body.city
      });
      const savedEvent = await event.save(); 
      return res.status(201).json(savedEvent); 
    } catch (err) {
      return res.status(500).json({
        message: 'Error while creating Event',
        error: err
      });
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedEvent = await EventModel.findByIdAndDelete(id); 
      if (!deletedEvent) {
        return res.status(404).json({
          message: 'Event not found'
        });
      }
      return res.status(200).json({
        id: id,
        delete: true
      });
    } catch (err) {
      return res.status(500).json({
        message: 'Error while deleting Event',
        error: err
      });
    }
  }
};
