const router = require('express').Router();
const { Post } = require('../../models');

router.post('/', async (req, res) => {
    try {
      // Add new user info to database
      const postData = await Post.create({
        ...req.body,
        user_id: req.session.user_id
    });
  
      if (!postData) {
        return res.status(400).json({ message: 'Failed to create comment' });
      }
      res.status(200).json('Post added!')
      
    } catch (err) {
      console.log(err)
      res.status(400).json(err);
    }
  });


module.exports = router