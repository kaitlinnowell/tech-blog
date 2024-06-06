const router = require('express').Router();
const { Comment } = require('../../models');


router.post('/add', async (req, res) => {
    try {
      // Add new user info to database
      const commentData = await Comment.create({
        ...req.body,
        user_id: req.session.user_id
    });
  
      if (!commentData) {
        return res.status(400).json({ message: 'Failed to create comment' });
      }
      res.status(200).json('Comment added!')
      
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });

module.exports = router