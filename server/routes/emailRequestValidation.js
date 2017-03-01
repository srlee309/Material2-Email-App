'use strict'

var Joi = require('joi')

module.exports = {
  options: { allowUnknown: { body: false } },
  body: {
    to: Joi.array().items(Joi.string().email()).required(),
    cc: Joi.array().items(Joi.string().email()).optional(),
    bcc: Joi.array().items(Joi.string().email()).optional(),
    subject: Joi.string().required(),
    text: Joi.string().required()
  }
}