const ResponseError = require('../utils/error');
const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.userCreate = async (ctx) => {
  await User.create(ctx.request.body)
    .then(() => {
      ctx.status = 201;
      ctx.response.body = {
        message: 'Accaunt has been created',
      };
    })
    .catch(() => {
      throw new ResponseError(400, 'Invalid user params');
    });
};

module.exports.getUsers = async (ctx) => {
  await User
    .find(
      {},
      'avatar nickname experience',
      {
        sort: { experience: -1 },
        skip: Number(ctx.query.skip),
        limit: Number(ctx.query.limit),
      },
    )
    .then((users) => {
      ctx.response.body = users;
    })
    .catch(() => {
      throw new ResponseError(404, 'Users with id not found');
    });
};

module.exports.getUser = async function getUser(ctx) {
  await User
    .findById(
      ctx.params.id,
      'avatar nickname experience',
    )
    .then((users) => {
      ctx.response.body = users;
    })
    .catch(() => {
      throw new ResponseError(404, 'User with id not found');
    });
};