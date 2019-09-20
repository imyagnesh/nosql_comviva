/* eslint-disable no-underscore-dangle */
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const handleError = error => {
  return {
    status: error.status || 'INVALID_REQUEST',
    error_message: error.message,
  };
};

exports.signUp = async function(req, res) {
  try {
    const user = await User.find({ email: req.body.email }).exec();

    if (user.length >= 1) {
      return res.status(404).send(handleError(new Error('Email Already Exist')));
    }

    const hash = await bcrypt.hash(req.body.password, 10);

    const userBody = User({
      email: req.body.email,
      password: hash,
    });

    const userRes = await userBody.save();

    return res.status(200).json({ result: userRes, status: 'OK' });
  } catch (err) {
    return res.status(404).send(handleError(err));
  }
};

exports.login = async function(req, res) {
  try {
    const user = await User.find({ email: req.body.email }).exec();

    if (user.length < 1) {
      return res.status(404).send(handleError(new Error('Auth Fail')));
    }

    await bcrypt.compare(req.body.password, user[0].password);

    const token = jwt.sign(
      {
        email: user[0].email,
        userId: user[0]._id,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '1h',
      },
    );

    return res.status(200).json({
      result: {
        token,
      },
      status: 'OK',
    });
  } catch (error) {
    return res.status(404).send(handleError(error));
  }
};

exports.delete = async function(req, res) {
  try {
    await User.deleteOne({ id: req.params.id });
    return res.status(200).json({
      status: 'OK',
    });
  } catch (error) {
    return res.status(404).send(handleError(error));
  }
};
