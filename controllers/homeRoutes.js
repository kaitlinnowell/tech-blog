const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

//Check credentials with withAth
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
      // order: [['date_created', 'ASC']],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session?.logged_in,
      page_title: 'The Tech Blog'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comments/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['date_created', 'text' ]
        }
      ],
    });

    const post = postData.get({ plain: true });

    res.render('comments', {
      ...post,
      logged_in: req.session.logged_in,
      page_title: 'The Tech Blog'
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session?.logged_in) {
    res.redirect('/', {
      page_title: 'The Tech Blog'
    });
    return;
  }

  res.render('login', {
    page_title: 'The Tech Blog'
  });
});

router.get('/signup', (req, res) => {
  if (req.session?.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
