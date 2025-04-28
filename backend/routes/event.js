const router = require('express').Router();
const Event = require('../models/event');
const User = require('../models/user');
const verifyToken = require('../midddleware/auth');


router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const eventDate = new Date(date);

    if (eventDate <= new Date()) {
      return res.status(400).json('Event date must be in the future');
    }

    const newEvent = new Event({
      title,
      description,
      date: eventDate,
      createdBy: req.user.id
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:eventId/register', verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    const user = await User.findById(req.user.id);

    if (event.attendees.includes(user._id)) {
      return res.status(400).json('Already registered for this event');
    }

    event.attendees.push(user._id);
    user.registeredEvents.push(event._id);

    await event.save();
    await user.save();

    res.json('Registration successful');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:eventId/cancel/:userId', async (req, res) => {
  try {
    const { eventId, userId } = req.params;
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    event.attendees.pull(userId);
    user.registeredEvents.pull(eventId);

    await event.save();
    await user.save();

    res.json('Registration cancelled');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
