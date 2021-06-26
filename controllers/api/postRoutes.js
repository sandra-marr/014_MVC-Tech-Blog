const router = require('express').Router();
const session = require('express-session');
const { Post, Comment, User} = require('../../models');
const withAuth = require('../../utils/auth');

//create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// add a comment to a post
router.post('/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_body: req.body.comment_body,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });

    console.log(newComment);

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// view a post by the post id and join with comment model and user model
router.get('/:id', withAuth, async (req, res) => {

  req.session.loggedIn = true;

  try {
    const postData = await Post.findByPk(req.params.id, { 
      include: [ 
        { 
          model: Comment,
          attributes: [
            'comment_body',
            'comment_date',
            'post_id',
          ]},
        {
          model: User,
          attributes: [
            'id',
            'user_name',
          ],
        },
      ],
    });

    const posts = postData.get({ plain: true });
    
    ////Try to create something similar to the product tags in hw 13 so that you can access the users who created the comments.

    res.render('post', { posts,
      logged_in: req.session.logged_in,
    });

    // res.render('comments', { comments });
   
  } catch (err) {
    res.status(500).json(err);
  };
});

// delete posts by post id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
    res.render('posts', { postData });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
