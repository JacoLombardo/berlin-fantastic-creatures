import express from 'express';
import User from '../model/userModel.js';


const router = express.Router();

router.get('/all', (req, res) => {
  User.find({}, function(err, users) {
    if (err) {
      res.send(err);
    } else {
      res.send(users);
    }
  });
});
export default router;