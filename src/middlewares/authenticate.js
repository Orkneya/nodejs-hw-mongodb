import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';
export const authenticate = async (req, res, next) => {
  console.log('Authenticate middleware called');
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }
  // const [bearer, token] = authHeader.split(' ');
  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  // const parts = authHeader.split(' ');
  // if (parts.length !== 2 || parts[0] !== 'Bearer') {
  //   return next(createHttpError(401, 'Auth header should be of type Bearer'));
  // }
  // const token = decodeURIComponent(parts[1]);

  // console.log('Received token:', token);
  // console.log('Authorization header:', authHeader);
  // console.log('Parsed token:', token);

  const allSessions = await SessionCollection.find({});
  console.log('All sessions in DB:', allSessions);

  const session = await SessionCollection.findOne({
    accessToken: token,
  });
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }
  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }
  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    next(createHttpError(401));
    return;
  }
  req.user = user;
  next();
};
