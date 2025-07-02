import createHttpError from 'http-errors';
import { ContactsCollection } from '../db/models/contacts.js';

export const checkUser = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    next(createHttpError(401));
    return;
  }

  const { contactId } = req.params;
  if (!contactId) {
    return next(createHttpError(400, 'Missing contactId param'));
  }

  const contact = await ContactsCollection.findOne({
    _id: contactId,
    userId: user._id,
  });

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }
  next();
};
