import express from 'express';
const router = express.Router();

import userController from '../controllers/userController.js';
import commonController from '../controllers/commonController.js';
import libraryController from '../controllers/libraryController.js';

router.post("/users/create", userController.createUser);
router.get("/users/list", userController.getAllUsers);
router.get("/users/details/:id", userController.getUser);
router.delete("/users/delete/:id", userController.deleteUser);
router.patch("/users/update/:id", userController.updateUser);

router.post('/login', commonController.userLogin);
router.post('/books/create', commonController.createBooks)
router.get('/books/list', commonController.listBooks)

router.get('/library/form-data', libraryController.getFormData);
router.get('/library/stats', libraryController.getStats);

export default router;