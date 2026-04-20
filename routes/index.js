const { Router } = require('express');
const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const phonesRouter = require('./phonesRouter')

const router = Router();

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/phones', phonesRouter);

module.exports = router;
