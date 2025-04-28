const router = require('express').Router();
const User = require('../models/user');

router.get('/:userId/events', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('registeredEvents');
    res.json(user.registeredEvents);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
