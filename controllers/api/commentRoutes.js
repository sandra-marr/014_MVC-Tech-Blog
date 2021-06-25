// const router = require('express').Router();
// const { Post, Comment, User} = require('../../models');
// const withAuth = require('../../utils/auth.js');

// router.get('/', async (req,res) => {
//   try{
//     const commentData = await Comment.findAll({include: [{model: User}, {model: Post}]});
//     res.status(200).json(commentData)
//   } catch(err) {
//     res.status(500).json(err);
//   }
// })


// router.get('/:id', async (req,res) => {
//   try{
//     const commentData = await Comment.findAll( req.params.id, {
//       where: {
//         post_id: req.params.id,
//       },
//       include: [
//         {model: User}, 
//         {model: Post}
//       ]
//     });
//     res.status(200).json(commentData)
//   } catch(err) {
//     res.status(500).json(err);
//   }
// })


// module.exports = router;
