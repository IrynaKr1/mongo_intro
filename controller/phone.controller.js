const createHttpError = require('http-errors');
const mongoose = require('mongoose');
const _ = require('lodash');
const { Phone } = require('../model');

module.exports.createPhone = async (req, res, next) => {
  const { body } = req;

  try {
    const createdPhone = await Phone.create(body);

    if (!createdPhone) {
      return next(createHttpError(400, 'Bad request'));
    }

    res.status(201).send({ data: createdPhone });
  } catch (error) {
    next(error);
  }
};
module.exports.getPhones = async (req, res, next) => {
  try {
    const findAllPhones = await Phone.find().sort({ _id: 1 });
    res.status(200).send({ data: findAllPhones });
  } catch (error) {
    next(error);
  }
};

module.exports.getPhoneById = async (req, res, next) => {
  const { phoneId } = req.params;
  try {
    const findPhoneById = await Phone.findById(phoneId);
    if (!findPhoneById) {
      return next(createHttpError(404, 'Phone not exist'));
    }

    const preparedPhone = _.omit(findPhoneById.toObject(), ['updatedAt']);

    res.status(200).send({ data: preparedPhone });
  } catch (error) {
    next(error);
  }
};

module.exports.updatePhoneById = async (req, res, next) => {
  const {
    params: { phoneId },
    body,
  } = req;

  try {
    const updatePhoneById = await Phone.findByIdAndUpdate(phoneId, body, {
      new: true,
      runValidators: true,
    });

    if (!updatePhoneById) {
      return next(createHttpError(404, 'Phone did not found'));
    }

    res.status(200).send({ data: updatePhoneById });
  } catch (error) {
    next(error);
  }
};

module.exports.deletePhoneById = async (req, res, next) => {
  const { phoneId } = req.params;

  try {
    const deletePhoneById = await Phone.findByIdAndDelete(phoneId);

    if (!deletePhoneById) {
      return next(createHttpError(404, 'Phone not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
