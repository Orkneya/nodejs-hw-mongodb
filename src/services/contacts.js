import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  contactType,
  isFavourite,
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const query = { userId };

  if (contactType) query.contactType = contactType;
  if (typeof isFavourite === 'boolean') query.isFavourite = isFavourite;

  const contactsQuery = ContactsCollection.find(query);

  const [contacts, contactsCount] = await Promise.all([
    contactsQuery
      .clone()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
    contactsQuery.clone().countDocuments(),
  ]);
  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await ContactsCollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (
  contactId,
  payload,
  userId,
  options = {},
) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      ...options,
    },
  );
  if (!updatedContact) return null;
  return {
    contact: updatedContact,
  };
};

export const deleteContact = async (contactId, userId) => {
  return ContactsCollection.findOneAndDelete({ _id: contactId, userId });
};
