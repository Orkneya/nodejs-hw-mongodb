import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  contactType,
  isFavourite,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();
  if (contactType) {
    contactsQuery.where('contactType').equals(contactType);
  }
  if (typeof isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(isFavourite);
  }

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
    contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const updatedContact = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
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

export const deleteContact = async (contactId) => {
  return ContactsCollection.findOneAndDelete({ _id: contactId });
};
