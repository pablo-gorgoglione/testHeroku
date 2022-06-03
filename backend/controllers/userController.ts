import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

// @route POST /users/
// @acess Public

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, password: pw } = req.body;

  const inUse = await User.findOne({ username });
  if (inUse) {
    throw new Error('Username already in use.');
  }

  const salt = await bcrypt.genSalt(10);

  const hashPassword = await bcrypt.hash(pw, salt);

  const user = await User.create({
    username,
    password: hashPassword,
  });

  const { password, ...userWithoutPassword } = user.toJSON();

  res.status(201).json(userWithoutPassword);
  return;
});

// @route POST /users/login
// @acess Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    const userToSend = {
      id: user._id,
      username: user.username,
      token: generateToken(user.id),
    };
    res.status(200).json(userToSend);
    return;
  }
  res.status(401);
  throw new Error('Invalid username or password');
});

// @route GET /api/users/
// @acess Private
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await searchUser(req);
  res.json({ username: user.username, id: user.id });
  return;
});

// @desc Return an User or throws an error for invalid id
export const searchUser = async (req: Request) => {
  const userId = req.user ? req.user.id : '';
  if (!userId) {
    throw new Error('Missing or invalid token');
  }

  let user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }
  return user;
};
