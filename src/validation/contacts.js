import Joi from 'joi';
// import { isValidObjectId } from 'mongoose';

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.string().min(3).max(30).required(),
  email: Joi.string().min(3).max(30).allow(null),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(30).required(),
  // userId: Joi.string()
  //   .required()
  //   .custom((value, helper) => {
  //     if (value && !isValidObjectId(value)) {
  //       return helper.message('Parent id should be a valid mongo id');
  //     }
  //     return value;
  //   }),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.string().min(3).max(30),
  email: Joi.string().min(3).max(30).allow(null),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(30),
  // userId: Joi.string(),
});
