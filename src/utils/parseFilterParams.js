const parseString = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  if (['personal', 'home'].includes(type)) return type;
};
const parseBoolean = (value) => {
  if (['true', 'false'].includes(value)) return JSON.parse(value);
};
export const parseFilter = ({ contactType, isFavourite }) => {
  return {
    contactType: parseString(contactType),
    isFavourite: parseBoolean(isFavourite),
  };
};
