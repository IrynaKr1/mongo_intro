const createHttpError = require('http-errors');
const mongoose = require('mongoose');
const _ = require('lodash');
const { User, Post } = require('../model');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const createdUser = await User.create(body);

    if (!createdUser) {
      return next(createHttpError(400, 'Bad request'));
    }

    res.status(201).send({ data: createdUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  const { limit = 10, skip = 0 } = req.query;
  try {
    const allUsers = await User.find().sort({ id: 1 }).limit(limit).skip(skip);
    res.status(200).send({ data: allUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    console.log('req', req);
    const findUserById = await User.findById(userId);

    if (!findUserById) {
      return next(createHttpError(404, 'User not exist in DB'));
    }

    res.status(200).send({ data: findUserById });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;
  try {
    const updateUserById = await User.findByIdAndUpdate(userId, body, {
      new: true,
      runValidators: true,
    });

    if (!updateUserById) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(200).send({ data: updateUserById });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deleteUserById = await User.findByIdAndDelete(userId);

    if (!deleteUserById) {
      return next(createHttpError(404, 'User not found'));
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports.createUserPost = async (req, res, next) => {
  const {
    body,
    params: { userId },
  } = req;

  try {
    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    const newPost = { ...body, userId: new mongoose.Types.ObjectId(userId) };

    const createdPost = await Post.create(newPost);

    if (!createdPost) {
      return next(createHttpError(400, 'Bad request'));
    }

    const preparedPost = _.omit(createdPost.toObject(), ['updatedAt']);

    res.status(201).send({ data: preparedPost });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserPosts = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const foundPosts = await User.aggregate()
      .match({ _id: new mongoose.Types.ObjectId(userId) })
      .lookup({
        from: 'posts',
        localField: '_id',
        foreignField: 'userId',
        as: 'userPosts',
      })
      .project({ userPosts: 1, _id: 0 });

    if (!foundPosts.length) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(200).send({ data: foundPosts });
  } catch (error) {
    next(error);
  }
};
