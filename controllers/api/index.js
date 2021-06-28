const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const postRoutes = require('./postRoutes.js');
const editRoutes = require('./editRoutes.js');
const commentRoutes = require('./commentRoutes.js');

router.use('/users', userRoutes);
router.use('/post', postRoutes);
router.use('/edit', editRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
