import express from 'express';
import { createUser, loginUser, logoutUser, logoutAllSessions, getMyProfile, updateMyProfile, deleteMyAccount, deleteUserAccount } from '../controllers/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const publicRouter = express.Router();
const privateRouter = express.Router();

// Public routes
publicRouter.post('/users', createUser);
publicRouter.post('/users/login', loginUser);

// Private routes
privateRouter.post('/users/logout', authMiddleware, logoutUser);
privateRouter.post('/users/logoutAll', authMiddleware, logoutAllSessions);
privateRouter.get('/users/me', authMiddleware, getMyProfile);
privateRouter.patch('/users/me', authMiddleware, updateMyProfile);
privateRouter.delete('/users/me', authMiddleware, deleteMyAccount);
privateRouter.delete('/users/:id', authMiddleware, deleteUserAccount);

export { publicRouter, privateRouter };
